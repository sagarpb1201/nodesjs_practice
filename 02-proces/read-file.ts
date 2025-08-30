import * as fs from 'fs'

fs.readFile('./data.txt','utf8',(error,data)=>{
    if(error){
        console.error(error)
    }else{
        console.log(data)
    }
})