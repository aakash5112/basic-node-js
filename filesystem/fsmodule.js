const fs = require('fs');
const path = require('path');

const targetDirectory = process.argv[2];
const extension = process.argv[3];
const newDirectory = process.argv[4];



if (!targetDirectory || !extension || !newDirectory) {
    console.log("Usage: node file2.js <sourceDirectory> <extension> <newDirectory>");
    process.exit(1);
}

if (!fs.existsSync(newDirectory)) {
    fs.mkdirSync(newDirectory, { recursive: true });
}



// Function to handle recursive copying
function processDirectory(currentSrc, currentDest) {
    const items = fs.readdirSync(currentSrc, { withFileTypes: true });
    console.log(items);

    items.forEach(item => {
        const srcPath = path.join(currentSrc, item.name);
        const destPath = path.join(currentDest, item.name);

        if (item.isDirectory()) {
            // If it's a folder, create it in the new directory and recurse inside
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath);
            }
            processDirectory(srcPath, destPath);
        } else if (item.isFile() && path.extname(item.name) === extension) {
            // If it's a file matching the extension, copy it
            copyFiles(srcPath, destPath, item.name);
        }
    });
}

function copyFiles(sourcePath, destinationPath, fileName) {
    fs.readFile(sourcePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }
        fs.writeFile(destinationPath, data, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('File copied successfully:', fileName);
        });
    });
}

// Start processing from the root target directory
processDirectory(targetDirectory, newDirectory);