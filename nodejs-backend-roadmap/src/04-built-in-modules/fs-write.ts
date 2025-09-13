console.log('--- fs-write.ts module is being loaded ---');

import fs from 'fs/promises';
import path from 'node:path';

export const writeToFile=async(filePath:string,data:string)=>{   
    try{
        const directoryPath=path.dirname(filePath);
        await fs.mkdir(directoryPath,{recursive:true});
        await fs.appendFile(filePath,data);
    }catch(error){
        console.error(error)
        throw error;
    }
}
const pathToLogs=path.resolve(__dirname,'..','..','logs','payment.log');

writeToFile(pathToLogs,JSON.stringify({timestamp:new Date().toISOString(),message:'This is a long entry'}))
console.log('Is this main module?',require.main===module);