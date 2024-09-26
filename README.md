# Worker Threads Example Project

This project demonstrates the use of Worker Threads in Node.js to handle blocking and non-blocking requests efficiently. It features two main routes: one for non-blocking operations and another for blocking operations that utilize multiple worker threads.

## Features
1. Non-Blocking Endpoint: Quickly responds to requests without blocking the event loop.
2. Blocking Endpoint: Utilizes multiple worker threads to perform heavy computations without blocking the main thread.
3. Thread Pooling: Configurable number of worker threads to balance load based on application requirements.

## Thread Creation Explanations
1. ### Creating a Single Thread with index.js  
   In this file, a single thread is created using the express and worker_threads modules. The application offers two main endpoints: non-blocking and blocking.  
   - Non-Blocking Endpoint:  
      - A GET ```/non-blocking``` request returns a basic response and does not block the main thread. This endpoint improves the performance of the server by responding quickly to incoming requests.
      
   - Blocking Endpoint:  
      - The GET ```/blocking``` request starts a worker thread named worker.js. This worker, after performing a certain computation, sends a message to the main thread. This method allows us to do heavy processing in the background without blocking the main thread.

2. ### Create Four Threads with index-four-workers.js
   In this file, parallel operations are performed by creating multiple worker threads. Here, a total of four worker threads are used. This is useful to improve performance in tasks that require high processing power.  
   - Non-Blocking Endpoint:
       - The GET ```/non-blocking``` request, just like the index.js file, returns a fast response and does not block the main thread.
       - 
   - Blocking Endpoint:
       - The GET ```/blocking``` request starts four worker threads through the createWorker function. After each worker performs a specified task, it passes its results to the main thread. Once these results are aggregated, the main thread returns the total result to the user.
   
