const express = require('express')
const { Worker } = require('worker_threads')

const app = express();
const port = 8080;
const thread_count = 4;

app.get('/non-blocking', async (req, res) => {
    res.status(200).send('Non-Blocking')
})

function createWorker() {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./four-workers.js', {
            workerData: { thread_count: thread_count }
        })

        worker.on('message', (data) => {
            resolve(data);
        })

        worker.on('error', (data) => {
            reject(`Blocking page error ${data}`)
        })
    })
}


app.get('/blocking', async (req, res) => {
    const workerPromises = [];

    for (let i = 0; i < thread_count; i++) {
        workerPromises.push(createWorker())
    }

    const thread_result = await Promise.all(workerPromises);
    const total = thread_result[0] + thread_result[1] + thread_result[2] + thread_result[3]
    res.status(200).send(`Total : ${total}`)
})

app.listen(port, () => {
    console.log("Server started!");
})
