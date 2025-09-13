import fs from 'node:fs/promises';
import path from 'node:path';

const runLogCleanup=async(pathToLogs:string):Promise<void>=>{
    try{
        const fileNames=await fs.readdir(pathToLogs)
        for (const fileName of fileNames) {
            const fileStats = await fs.stat(path.join(pathToLogs, fileName));
            console.log(fileStats);
            console.log(Date.now())
            const sevenDaysInMs=7*(24*60*60*1000);
            if(Date.now()-sevenDaysInMs>fileStats.mtimeMs){
                console.log("Deleting file as it's older than 7 days",fileName)
                await fs.rm(path.join(pathToLogs,fileName));
            }
        }
    }catch(err){
        console.error(err);
        throw err;
    }
}

const pathToLogs=path.resolve(__dirname,'..','..','logs');
runLogCleanup(pathToLogs)