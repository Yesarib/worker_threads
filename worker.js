const { parentPort } = require('worker_threads')

let counter = 0;
for (let i = 0; i < 5_000_000_000; i++) {
    counter++;
}

parentPort.postMessage(counter)