import fs from 'node:fs';
import path from 'node:path';

export {};

const pathToPackageJson = path.resolve(__dirname, '..', '..', 'package.json');

try {
  const fileContentsBuffer = fs.readFileSync(pathToPackageJson);

  const fileContentsString = fileContentsBuffer.toString('utf-8');

  console.log('File Contents:\n', fileContentsString);
} catch (error) {
  console.error('Error reading file:', error);
}