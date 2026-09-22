const fs = require('fs');
const path = require('path');

// Usage:
// node filesystem/file2.js <sourceDirectory> <extension> <newDirectory>
// Example:
// node filesystem/file2.js . .js copied 

const targetDirectory=process.argv[2];
const extension=proces.argv[3];
const newDirectory=process.argv[4];

if(!fs.existsSync(newDirectory)){
    fs.mkdirSync(newDirectory);
}

// get all files in the target directory
const files = fs.readdirSync(targetDirectory);
const filteredFiles = files.filter(file => path.extname(file) === extension);
console.log('Files:',files);
console.log('Filtered Files:', filteredFiles);