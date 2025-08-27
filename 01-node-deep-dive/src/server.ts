import * as http from "http"
import { Worker } from "worker_threads";

const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url==undefined){
        res.statusCode=400;
        return res.end('Invalid url')
    }
    if(url=='/fast'){
        res.end("This is a fast response")
    }else if(url=="/slow"){

        const thread=new Worker('./src/worker.ts');

        // A single, unified function to handle request completion.
        // This prevents race conditions and code duplication.
        const finishRequest = (statusCode: number, message: string) => {
            // This function will be called by the *first* event to fire.
            // The .once() listeners will automatically clean themselves up.
            res.statusCode = statusCode;
            res.end(message);
        };

        // The 'message' event is the happy path.
        thread.once('message', (msg: string) => {
            console.log("Received message from worker:", msg);
            finishRequest(200, `Executed slow response with message: ${msg}`);
        });

        // The 'error' event indicates a failure within the worker.
        thread.once('error', (err) => {
            console.error("Error on thread:", err);
            // 500 is more appropriate as this is a server-side failure.
            finishRequest(500, `Worker error: ${err.message}`);
        });

        // The 'exit' event fires when the worker terminates.
        // A non-zero exit code also indicates a failure.
        thread.once('exit', (code) => {
            // This will only run if 'message' or 'error' haven't already.
            if (code !== 0) {
                console.warn(`Worker stopped with non-zero exit code: ${code}`);
                finishRequest(500, `Worker stopped with exit code: ${code}`);
            }
        });
    }else if(url=="/"){
        res.end("Welcome to home page")
    }else{
        res.statusCode=404;
        res.end('Route not found')
    }
})

server.listen(3000,()=>{console.log(`Server listening on port:3000`)});