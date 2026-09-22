const http = require('http');
const port = 3500;

const server = http.createServer((req, res) => {
    const url = req.url;
    const parts = url.split('/');

    if (parts[1] === 'products' && parts.length >= 3) {
        const productId = parts[2];
        res.end('Product ID is ' + productId);
    } else if (url === '/home' || url === '/') {
        res.end('home page');
    } else if (url === '/contact') {
        res.end('contact page');
    } else if (url === '/about') {
        res.end('about page');
    } else if (url === '/login' && req.method === 'GET') {
        res.end('login page');
    } else if (url === '/login' && req.method === 'POST') {
        res.end('login success');
    } else {
        res.statusCode = 404;
        res.end('page not found');
    }
});

server.listen(port, () => {
    console.log('server is running on port', port);
});
