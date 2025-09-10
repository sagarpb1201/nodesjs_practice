import fs from 'node:fs/promises'
import path from 'node:path'

const pathToPackageJson=path.resolve(__dirname,'..','..','package.json')

const readFile=async(filePath:string):Promise<void>=>{
    try{
        const result=await fs.readFile(filePath,'utf-8')
        console.log(result)
    }catch(err){
        console.error(err);
        throw err;
    }
}

readFile(pathToPackageJson)