import { readFileSync } from "fs";

try{
    const data=readFileSync('data.txt','utf8');
    console.log(data);
}catch(error){
    console.error("Failed to read File:",error)
}