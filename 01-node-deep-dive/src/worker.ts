import {parentPort} from "worker_threads";

if(parentPort==null){
    throw new Error('Cannot call a worker directly')
}

let i = 0;
while (i < 10_000_000_000) {
  i++;
}

parentPort.postMessage('Your request is completed')