const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3500;
const studentFile = path.join(__dirname, '..', 'backend', 'data', 'students.json');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }

    next();
});

app.get('/students', (req, res) => {
    const students = JSON.parse(fs.readFileSync(studentFile, 'utf8'));
    res.json(students);
});

app.post('/students', (req, res) => {
    const students = JSON.parse(fs.readFileSync(studentFile, 'utf8'));
    students.push(req.body);
    fs.writeFileSync(studentFile, JSON.stringify(students, null, 2));

    res.status(201).send('student saved');
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(port, () => {
    console.log(`Express server is running at http://localhost:${port}`);
});
