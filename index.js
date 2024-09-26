const express = require('express')
const { Worker } = require('worker_threads')

const app = express();
const port = 8080;

app.get('/non-blocking', async(req,res) => {
    res.status(200).send('Non-Blocking')
})



app.get('/blocking', async(req,res) => {
    const worker = new Worker('./worker.js')

    worker.on('message', (data) => {
        res.status(200).send(`Blocking page ${data}`)
    })
    
    worker.on('error', (data) => {
        res.status(404).send(`Blocking page error ${data}`)
    })

})

app.listen(port, () => {
    console.log("Server started!");
})
