import path from 'node:path'

const result=path.join('users','sagar','files','document.pdf');
const result2=path.resolve('users','sagar','files','document.pdf')
const result3=path.resolve('/tmp','my-file.log')
console.log(result)
console.log(result2)
console.log(result3)

console.log('--- CWD vs __dirname ---');
console.log(`Current Working Directory (cwd): ${process.cwd()}`);
console.log(`Directory Name (__dirname):      ${__dirname}`);
console.log(`Reliable path to config.json:  ${path.join(__dirname, 'config.json')}`);
console.log(process.cwd())
console.log(__dirname)