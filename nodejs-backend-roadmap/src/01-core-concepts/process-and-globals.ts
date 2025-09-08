import path from 'node:path'
console.log(process.version)
console.log(process.argv)
console.log(process.env.API_KEY)
console.log(process.env)

process.on('exit',(code)=>{
    console.log(code);
})

process.on('uncaughtException',(err,origin)=>{
    console.error(err)
    console.error("originnnnnn",origin)
    process.exit(1);
})

console.log('Current Working Directory:', process.cwd());
console.log('Directory Name of Current Module:', __dirname);

console.log(
  'Path to config.json using process.cwd():',
  path.join(process.cwd(), 'config.json')
);

console.log(
  'Path to config.json using __dirname:',
  path.join(__dirname, 'config.json')
);

throw new Error('This is a deliberate crash')