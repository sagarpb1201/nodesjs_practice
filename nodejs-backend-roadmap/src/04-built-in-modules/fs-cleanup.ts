import fs from 'node:fs/promises';
import path from 'node:path';

const runLogCleanup=async(pathToLogs:string):Promise<void>=>{
    try{
        const fileNames=await fs.readdir(pathToLogs)
        for (const fileName of fileNames) {
            const pathToFile=path.join(pathToLogs,fileName);
            const fileStats = await fs.stat(pathToFile);

            if(fileStats.isDirectory()){
                await runLogCleanup(pathToFile);

                const directoryContents = await fs.readdir(pathToFile);
                if (directoryContents.length === 0) {
                    console.log(`Deleting empty directory: ${fileName}`);
                    await fs.rm(pathToFile,{recursive:true});
                }
            } else if (fileStats.isFile()) {
                const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
                if (Date.now() - fileStats.mtimeMs > sevenDaysInMs) {
                    console.log(`Deleting old file: ${fileName}`);
                    await fs.rm(pathToFile);
                }
            }
        }
    }catch(err){
        console.error(err);
        throw err;
    }
}

const pathToLogs=path.resolve(__dirname,'..','..','logs');
runLogCleanup(pathToLogs)