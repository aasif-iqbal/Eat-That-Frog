# What is Event Loop ?

The event loop is a mechanism that enables Node.js to perform non-blocking I/O operations by offloading tasks to the system kernel whenever possible. This allows Node.js to handle multiple operations concurrently without blocking the execution of other code.

## What is Blocking and Non-Blocking Code ?
Certainly! Here's a quick example to illustrate the difference:

### Blocking Code
In blocking code, operations are executed sequentially. Each operation waits for the previous one to complete.

```javascript
const fs = require('fs');

// Blocking code
const data = fs.readFileSync('/path/to/file.txt');
console.log(data.toString());
console.log('This line will wait until file is read.');
```

### Non-Blocking Code
In non-blocking code, operations do not wait for previous operations to complete. Instead, they continue to execute while the other operations finish in the background.

```javascript
const fs = require('fs');

// Non-blocking code
fs.readFile('/path/to/file.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
console.log('This line will execute without waiting for file reading to complete.');
```

In the blocking example, the program waits until the file is read before moving to the next line. In the non-blocking example, the program moves to the next line without waiting for the file read operation to complete.


## Does main thread contain call stack?
Yes, the main thread in Node.js contains the call stack. The call stack is a mechanism for tracking the execution context of your code. It keeps track of function calls and ensures that the correct functions are executed and returned in the proper order. When a function is called, it gets pushed onto the call stack, and when it completes, it gets popped off the stack.

Great question! The thread pool and libuv play crucial roles in Node.js, especially when dealing with I/O operations and CPU-bound tasks. Here's a detailed look at how they work:

### libuv

**libuv** is a multi-platform support library that provides asynchronous I/O and other useful features to build scalable network applications. It underpins Node.js's non-blocking I/O model and handles the event loop, asynchronous I/O operations, and more.

Key features of **libuv**:
- **Event Loop**: Manages events and callbacks.
- **I/O Polling**: Provides efficient mechanisms for polling I/O events.
- **File System Operations**: Handles asynchronous file system operations.
- **Thread Pool**: Provides a pool of worker threads for executing CPU-bound tasks.

### Thread Pool

Node.js uses a thread pool to handle tasks that are too heavy for its single-threaded event loop to handle efficiently, such as file system operations, DNS lookups, and cryptographic functions. 

**How it works**:
1. **Default Size**: The default thread pool size is 4, but it can be configured using the `UV_THREADPOOL_SIZE` environment variable.
2. **Asynchronous Tasks**: Tasks such as `fs.readFile()`, `crypto.pbkdf2()`, and DNS operations (`dns.lookup()`) are offloaded to the thread pool.
3. **Task Execution**: When one of these tasks is called, it gets assigned to an available thread from the pool, and the event loop can continue running other tasks.
4. **Callback Execution**: Once the thread pool task completes, the result is returned to the event loop via a callback function.

### Example with fs.readFile
When you call `fs.readFile`, the following happens:
1. The `fs.readFile` operation is offloaded to the thread pool.
2. An available thread in the pool handles the file reading.
3. Once the file is read, the thread executes the callback function provided.
4. The event loop picks up this callback and processes it, allowing the main thread to stay free for other tasks.

**Diagram**:
```plaintext
Event Loop:
   ├── User Code Execution
   ├── Task Scheduling (setTimeout, setImmediate)
   ├── Handling Async I/O
   └── Callbacks Execution

Thread Pool:
   ├── I/O Operations (fs, DNS, etc.)
   ├── Crypto Functions
   └── User Defined Task
```

### Benefits
- **Efficiency**: Offloading CPU-intensive tasks to the thread pool keeps the event loop free, maintaining high performance.
- **Concurrency**: Multiple tasks can be processed concurrently, enhancing overall application throughput.

### Example Code Execution
With your example, the `fs.readFile` operation is handled by the thread pool, ensuring the main thread remains non-blocking and can execute other parts of the code concurrently.

Understanding the roles of libuv and the thread pool helps in writing efficient, scalable Node.js applications that make the most of asynchronous I/O operations. If you want to dive even deeper or have specific scenarios in mind, let me know!


## Does event loops check any synchoronus code ?

No, the event loop in Node.js primarily deals with asynchronous operations. The event loop itself doesn't "check" or manage synchronous code. Here's how it works in a bit more detail:

### Synchronous Code
- **Execution Flow**: Synchronous code is executed immediately and in sequence, directly by the main thread.
- **Blocking**: Each line of synchronous code must complete before the next line can run.

### Event Loop and Asynchronous Code
- **Asynchronous Operations**: The event loop handles asynchronous operations like I/O tasks, timers, and network requests.
- **Phases of the Event Loop**: The event loop has several phases, including:
  1. **Timers**: Executes callbacks scheduled by `setTimeout` and `setInterval`.
  2. **Pending Callbacks**: Executes I/O callbacks deferred to the next loop iteration.
  3. **Idle, Prepare**: Internal use.
  4. **Poll**: Retrieves new I/O events; executes I/O-related callbacks.
  5. **Check**: Executes callbacks scheduled by `setImmediate`.
  6. **Close Callbacks**: Executes close callbacks, such as `socket.on('close', ...)`.
- **Microtasks**: After each phase, the event loop checks the microtask queue, which contains resolved promises and process.nextTick callbacks.

### Synchronous Code in Context
- **Handled Directly**: Synchronous code runs directly as part of the main thread's execution and isn't managed by the event loop.
- **Execution Order**: The event loop only takes over after all synchronous code in the current execution context has run.

### Example
```javascript
console.log('start'); // Synchronous: executed immediately
setTimeout(() => { console.log('timer'); }, 0); // Asynchronous: added to the timer phase
Promise.resolve().then(() => console.log('promise')); // Microtask: executed after current code completes
console.log('end'); // Synchronous: executed immediately
```

**Output Order**:
1. `start`
2. `end`
3. `promise` (microtask queue)
4. `timer` (timer phase)

So, the event loop doesn't "check" synchronous code; it seamlessly transitions between executing synchronous code and handling asynchronous operations to maintain non-blocking behavior. If you need more clarification or examples, let me know!

## Is Thread Pool and Worker Thread is same or different?
Thread pools and worker threads in Node.js have different purposes and characteristics:

### Thread Pool
- **Purpose**: Used to handle heavy and blocking operations asynchronously.
- **Managed by**: libuv.
- **Default Size**: The default size is 4 threads, configurable via `UV_THREADPOOL_SIZE`.
- **Usage**: Handles I/O operations like file system operations, DNS lookups, and some cryptographic functions.
- **Behavior**: Tasks are queued up and run on available threads from the pool, allowing the main event loop to remain non-blocking.

### Worker Threads
- **Purpose**: Used to run JavaScript in parallel, useful for CPU-intensive tasks.
- **Managed by**: The `worker_threads` module.
- **Size**: You can create multiple worker threads as needed.
- **Usage**: Executes JavaScript code in separate threads, allowing for parallel execution of code that would otherwise block the event loop.
- **Behavior**: Each worker thread runs in its own process with its own event loop and memory space.

### Example
#### Thread Pool (using `fs` module)
```javascript
const fs = require('fs');
fs.readFile('/path/to/file.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});
```
- This file operation is offloaded to the thread pool to avoid blocking the main event loop.

#### Worker Threads
```javascript
const { Worker } = require('worker_threads');

const worker = new Worker(`
  const { parentPort } = require('worker_threads');
  parentPort.postMessage('Hello from the worker thread!');
`, { eval: true });

worker.on('message', (message) => {
  console.log(message);
});
```
- This creates a worker thread to run parallel JavaScript code.

### Summary
- **Thread Pool**: Manages and executes asynchronous I/O tasks without blocking the main event loop.
- **Worker Threads**: Allows parallel execution of JavaScript code, suitable for CPU-intensive tasks.

They serve different purposes but both aim to improve performance and scalability in Node.js applications.

[Internals of nodejs](https://bravochos.medium.com/the-internals-of-node-js-b57bab6dc90)