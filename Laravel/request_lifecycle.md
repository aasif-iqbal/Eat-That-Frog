# Laravel Request Life Cycle

The **Laravel Request Life Cycle** is the internal journey a request takes from the moment it hits your application to the final response sent back to the browser.

Here’s a **step-by-step breakdown** of what happens behind the scenes:

---

## 🌀 Laravel Request Life Cycle (Step-by-Step)

### 1. **Entry Point (`public/index.php`)**

* Every HTTP request to your app begins here.
* It loads the **autoload** files and **bootstrap** logic.

```php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
```

---

### 2. **Create Kernel Instance**

* Laravel creates an instance of `App\Http\Kernel`, which handles the HTTP request.

```php
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
```

---

### 3. **Send the Request Through Middleware**

* Kernel processes **global** and **route** middlewares (like auth, CSRF, logging).
* Middleware can modify the request or stop it.

```php
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);
```

---

### 4. **Routing (`routes/web.php` or `routes/api.php`)**

* The request is matched to a route using **RouteServiceProvider**.
* The route may call a **controller**, **closure**, or **invoke a method**.

---

### 5. **Controller / Route Action**

* If a controller is matched, the method is executed.
* This is where the business logic happens (DB queries, service calls, etc.).

---

### 6. **Response is Prepared**

* Whatever the controller returns (JSON, HTML, view) is converted to a **Response** object using `ResponseFactory`.

---

### 7. **Middleware (After Request)**

* After the controller runs, Laravel can run **"after" middleware**, e.g., logging, session flashing, etc.

---

### 8. **Send Response**

* The final `Response` object is returned to the browser.

```php
$response->send();
```

---

### 9. **Terminate Method**

* Once the response is sent, Laravel calls the `terminate()` method on middleware that needs post-response logic.

```php
$kernel->terminate($request, $response);
```

---

## 🗺️ Visual Summary

```
Browser Request
     ↓
public/index.php
     ↓
Bootstrap App
     ↓
HTTP Kernel (with Middleware)
     ↓
Router → Middleware (Route-Specific)
     ↓
Controller / Closure
     ↓
Response Created
     ↓
Middleware (After)
     ↓
Response Sent to Browser
     ↓
Terminate
```