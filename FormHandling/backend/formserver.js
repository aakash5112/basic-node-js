const http = require('http');
const fs = require('fs');
const path = require('path');


const port = 3500;
const dataFolder = path.join(__dirname, 'data');
const studentFile = path.join(dataFolder, 'students.json');

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
}

if (!fs.existsSync(studentFile)) {
    fs.writeFileSync(studentFile, '[]', 'utf8');
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url === '/students' && req.method === 'GET') {
        const students = JSON.parse(fs.readFileSync(studentFile, 'utf8'));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
        return;
    }

    if (req.url === '/students' && req.method === 'POST') {
        let body = '';

        req.on('data', function (dataValue) {
            body += dataValue;
        });

        req.on('end', function () {
            try {
                const student = JSON.parse(body);
                const students = JSON.parse(fs.readFileSync(studentFile, 'utf8'));
                students.push(student);
                fs.writeFileSync(studentFile, JSON.stringify(students, null, 2), 'utf8');

                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end('student saved');
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid JSON' }));
            }
        });

        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
});

server.listen(port, () => {
    console.log('Server is running at port ' + port);
});
