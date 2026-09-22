const http = require('http');
const fs = require('fs');
const path = require('path');

const frontendPath = path.join(__dirname, 'index.html');
const dataPath = path.join(__dirname, 'data.json');

const products = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url);
    console.log(req.headers.host);
    console.log(req.url);
    if (url.pathname === '/products') {
        let result = [...products];

        const category = url.searchParams.get('category');
        const maxPrice = url.searchParams.get('maxPrice');

        if (category) {
            result = result.filter(item => item.category === category);
        }

        if (maxPrice) {
            result = result.filter(item => item.price <= Number(maxPrice));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
        return;
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
        fs.readFile(frontendPath, 'utf8', (err, html) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error loading frontend page');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        });
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
});

server.listen(3500, () => {
    console.log('Server running at http://localhost:3500');
});
