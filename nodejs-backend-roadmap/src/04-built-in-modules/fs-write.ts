import fs from 'fs/promises';
import path from 'node:path';

const writeToFile=async(filePath:string,data:string)=>{   
    try{
        const directoryPath=path.dirname(filePath);
        await fs.mkdir(directoryPath,{recursive:true});
        await fs.appendFile(filePath,data);
    }catch(error){
        console.error(error)
        throw error;
    }
}
const pathToLogs=path.resolve(__dirname,'..','..','logs','app.log');

writeToFile(pathToLogs,JSON.stringify({timestamp:new Date().toISOString(),message:'This is a long entry'}))