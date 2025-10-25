<xaiArtifact artifact_id="2e7fd785-86ac-428c-8216-250bab440d06" artifact_version_id="3dd893ca-95a9-49ee-b9ac-38983fce4d20" title="Push Notification System LLD" contentType="text/markdown">

# Low-Level Design (LLD) for Push Notification System

This LLD builds on the high-level design of the push notification system, focusing on implementation details using Node.js for the backend services, AWS SQS as the message queue, and MongoDB as the database. The design emphasizes modularity, scalability, and reliability.

## Technology Stack
- **Backend**: Node.js (with Express.js for API, or Fastify for performance).
- **Message Queue**: AWS SQS (Standard Queue for high throughput).
- **Database**: MongoDB (for user data, preferences, and delivery logs).
- **Push Providers Libraries**:
  - `apn` or `node-apn` for Apple Push Notification Service (APNs).
  - `firebase-admin` for Firebase Cloud Messaging (FCM) on Android.
  - `web-push` for web push notifications.
- **Other Libraries**:
  - `aws-sdk` for SQS integration.
  - `mongoose` for MongoDB ODM.
  - `winston` or `pino` for logging.
  - `bull` or custom workers if needed, but we'll use SQS directly.
- **Deployment**: Assume AWS ECS or Lambda for Node.js services, with auto-scaling.

## Database Schemas (MongoDB)
We'll use Mongoose for schema definition. Collections:

### 1. Users Collection
Stores user profiles, device tokens, and preferences.

```javascript
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  devices: [{
    token: { type: String, required: true },
    platform: { type: String, enum: ['ios', 'android', 'web'], required: true },
    lastActive: { type: Date, default: Date.now }
  }],
  preferences: {
    notificationsEnabled: { type: Boolean, default: true },
    categories: [String] // e.g., ['promotions', 'alerts']
  },
  location: { type: String } // For targeting
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
```

- Indexes: On `userId` (unique), `devices.token`.

### 2. Notifications Collection
For logging sent notifications and delivery status.

```javascript
const notificationSchema = new mongoose.Schema({
  notificationId: { type: String, required: true, unique: true }, // UUID
  userId: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'alert', 'promo'
  payload: { type: Object, required: true }, // { title, body, data }
  status: { type: String, enum: ['queued', 'sent', 'delivered', 'failed'], default: 'queued' },
  error: { type: String },
  sentAt: { type: Date },
  deliveredAt: { type: Date }
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);
```

- Indexes: On `userId`, `status`, `createdAt` for querying logs.

### 3. OptOuts Collection (Optional)
For quick lookup of opted-out users.

```javascript
const optOutSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  categories: [String]
}, { timestamps: true });

const OptOut = mongoose.model('OptOut', optOutSchema);
```

## System Components and Node.js Modules

### 1. API Gateway / Notification Service (Node.js App)
- A single Node.js service handling API requests and queuing.
- Use Express.js for REST API.

**File Structure:**
```
notification-service/
├── src/
│   ├── controllers/
│   │   └── notificationController.js
│   ├── services/
│   │   ├── queueService.js
│   │   ├── userService.js
│   │   └── pushService.js
│   ├── models/
│   │   ├── user.js
│   │   └── notification.js
│   ├── routes/
│   │   └── notificationRoutes.js
│   ├── config/
│   │   └── db.js (MongoDB connection)
│   │   └── sqs.js (SQS client)
│   └── app.js
├── package.json
└── .env
```

**app.js (Entry Point):**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

connectDB(); // Connect to MongoDB

app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**config/db.js:**
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = { connectDB };
```

**config/sqs.js:**
```javascript
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
const queueUrl = process.env.SQS_QUEUE_URL;

module.exports = { sqs, queueUrl };
```

**controllers/notificationController.js:**
Handles sending notifications.

```javascript
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Notification = require('../models/notification');
const { sendToQueue } = require('../services/queueService');

const sendNotification = async (req, res) => {
  const { userIds, type, payload, targetCriteria } = req.body; // e.g., targetCriteria: { location: 'US' }

  try {
    let users;
    if (userIds) {
      users = await User.find({ userId: { $in: userIds } });
    } else if (targetCriteria) {
      users = await User.find(targetCriteria);
    } else {
      return res.status(400).json({ error: 'Provide userIds or targetCriteria' });
    }

    const notifications = [];
    for (const user of users) {
      if (!user.preferences.notificationsEnabled) continue;

      const notificationId = uuidv4();
      const notification = new Notification({
        notificationId,
        userId: user.userId,
        type,
        payload,
        status: 'queued'
      });
      await notification.save();

      // Enrich with user-specific data if needed
      const message = { notificationId, userId: user.userId, devices: user.devices, payload };
      await sendToQueue(message);
      notifications.push(notificationId);
    }

    res.status(200).json({ message: 'Notifications queued', notificationIds: notifications });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendNotification };
```

**routes/notificationRoutes.js:**
```javascript
const express = require('express');
const { sendNotification } = require('../controllers/notificationController');

const router = express.Router();
router.post('/send', sendNotification);

module.exports = router;
```

**services/queueService.js:**
```javascript
const { sqs, queueUrl } = require('../config/sqs');

const sendToQueue = async (message) => {
  const params = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl
  };

  try {
    await sqs.sendMessage(params).promise();
  } catch (err) {
    console.error('Error sending to SQS:', err);
    throw err;
  }
};

module.exports = { sendToQueue };
```

### 2. Worker Service (Node.js Consumer for SQS)
A separate Node.js process or cluster that polls SQS and sends pushes.

**File Structure:** Similar to notification-service, but focused on workers.

**worker.js (Entry Point):**
```javascript
const { sqs, queueUrl } = require('./config/sqs');
const { connectDB } = require('./config/db');
const Notification = require('./models/notification');
const { sendPush } = require('./services/pushService');

connectDB();

const pollQueue = async () => {
  const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 10, // Batch size
    WaitTimeSeconds: 20 // Long polling
  };

  while (true) {
    try {
      const data = await sqs.receiveMessage(params).promise();
      if (data.Messages) {
        for (const msg of data.Messages) {
          const body = JSON.parse(msg.Body);
          const { notificationId, userId, devices, payload } = body;

          try {
            await sendPush(devices, payload);
            await Notification.updateOne({ notificationId }, { status: 'sent', sentAt: new Date() });
          } catch (err) {
            await Notification.updateOne({ notificationId }, { status: 'failed', error: err.message });
          }

          // Delete message from queue
          await sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: msg.ReceiptHandle }).promise();
        }
      }
    } catch (err) {
      console.error('Error polling SQS:', err);
    }
  }
};

pollQueue();
```

**services/pushService.js:**
Handles platform-specific pushes.

```javascript
const apn = require('apn'); // Configure with certs
const admin = require('firebase-admin'); // Initialize with service account
const webpush = require('web-push'); // Set VAPID keys

// Initialize providers (in a config file or here)
const apnProvider = new apn.Provider({ /* options */ });
admin.initializeApp({ /* credentials */ });
webpush.setVapidDetails(/* details */);

const sendPush = async (devices, payload) => {
  for (const device of devices) {
    const { token, platform } = device;

    try {
      if (platform === 'ios') {
        const notification = new apn.Notification();
        notification.title = payload.title;
        notification.body = payload.body;
        await apnProvider.send(notification, token);
      } else if (platform === 'android') {
        const message = {
          notification: { title: payload.title, body: payload.body },
          token
        };
        await admin.messaging().send(message);
      } else if (platform === 'web') {
        await webpush.sendNotification(token, JSON.stringify(payload));
      }
    } catch (err) {
      console.error(`Push failed for ${platform}:`, err);
      throw err;
    }
  }
};

module.exports = { sendPush };
```

**services/userService.js:** (For opt-in/out updates)
```javascript
const User = require('../models/user');

const updatePreferences = async (userId, preferences) => {
  await User.updateOne({ userId }, { preferences });
};

module.exports = { updatePreferences };
```

## Data Flow (Sequence)
1. Client → POST /api/notifications/send → NotificationController → Validate → Query MongoDB (Users) → Create Notification in MongoDB → Send to SQS.
2. Worker polls SQS → Receive Message → Parse → Send via Push Providers → Update Notification status in MongoDB → Delete from SQS.
3. For failures: Use SQS redrive policy to a DLQ (Dead Letter Queue) after max retries (e.g., 5).

## Scalability and Reliability
- **Scaling Workers**: Run multiple worker instances; SQS handles distribution.
- **Error Handling**: Exponential backoff in workers for transient errors.
- **Monitoring**: Integrate AWS CloudWatch for SQS metrics; Use Mongoose hooks for auditing.
- **Security**: Use IAM roles for SQS access; Encrypt MongoDB data; Validate tokens.
- **Rate Limiting**: Use `express-rate-limit` in API.
- **Batching**: SQS supports batch send/receive for efficiency.

## Potential Improvements
- Implement idempotency with notificationId to avoid duplicates.
- Add caching with Redis for user preferences.
- Use AWS SNS for fanout if targeting large groups (alternative to SQS).
- Integrate analytics with MongoDB aggregations for delivery rates.

This LLD provides a solid foundation; adjust based on specific requirements like volume or additional features.

</xaiArtifact>