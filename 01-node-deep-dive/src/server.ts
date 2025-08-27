import * as http from "http"

const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url=='/fast'){
        res.end("This is a fast response")
    }else if(url=="/slow"){
        let i = 0;
while (i < 5_000_0000000000) { // Using underscores for readability
  i++;
}
res.end("Executed slow response")
    }else if(url=="/"){
        res.end("Welcome to home page")
    }else if(url==undefined){
        res.end(new Error('Invalid url'))
    }else{
        res.statusCode=404;
        res.end('Route not found')
    }
})

server.listen(3000,()=>{console.log(`Server listening on port:3000`)});