import * as fs from "fs";
import * as path from 'path';

console.log(process.cwd())
const fileName=process.argv[2]??'data.txt';
console.log(path.extname(fileName))
const allowedFileTypes=['.txt']
if(!allowedFileTypes.includes(path.extname(fileName).toLowerCase())){
    console.log(`Only ${allowedFileTypes.join(', ')} file types allowed.`)
    process.exit(1);
}
const dataToInsert=process.argv.slice(3);
if(dataToInsert.length==0){
    console.log("Please provide the data to be inserted in the file")
    process.exit(1);
}
const outputDir=path.join(process.cwd(),'output_files');
const fullPath=path.join(outputDir,fileName)
try{
    fs.mkdirSync(outputDir,{recursive:true});
}catch(err){
    console.error(`Error: Could not create output directory at "${outputDir}".`);
    console.error(err);
    process.exit(1);
}
fs.writeFile(fullPath,dataToInsert.join(' '),(error)=>{
    if(error){
        console.error(error);
    }else{
        console.log("Data written successfully")
    }
});