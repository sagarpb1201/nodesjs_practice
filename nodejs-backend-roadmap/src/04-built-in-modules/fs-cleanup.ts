import fs from 'node:fs/promises';
import path from 'node:path';

const runLogCleanup=async(pathToLogs:string):Promise<void>=>{
    try{
        const fileNames=await fs.readdir(pathToLogs)
        const deletionPromises=[];
        for (const fileName of fileNames) {
            const pathToFile=path.join(pathToLogs,fileName);
            const fileStats = await fs.stat(pathToFile);

            if(fileStats.isDirectory()){
                await runLogCleanup(pathToFile);

                const directoryContents = await fs.readdir(pathToFile);
                if (directoryContents.length === 0) {
                    console.log(`Deleting empty directory: ${fileName}`);
                    await fs.rm(pathToFile, { recursive: true });
                }
            } else if (fileStats.isFile()) {
                // const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
                if (Date.now() - fileStats.mtimeMs > 0) {
                    console.log(`Deleting old file: ${fileName}`);
                    deletionPromises.push(fs.rm(pathToFile));
                }
            }
        }

        console.log(`Attempting to delete ${deletionPromises.length} files in parallel...`);
        const results = await Promise.allSettled(deletionPromises);

        const statusCount={
            success:0,
            fail:0
        }
        results.forEach(result=>{
            if(result.status === "rejected"){
                statusCount.fail+=1;
                console.error('Failed to delete a file:', result.reason);
            }else{
                statusCount.success+=1;
            }
        })
        console.log(`Cleanup summary: ${statusCount.success} files succeeded, ${statusCount.fail} files failed.`);

    }catch(err){
        console.error(err);
        throw err;
    }
}

const pathToLogs=path.resolve(__dirname,'..','..','logs');
runLogCleanup(pathToLogs)