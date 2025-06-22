const http = require('http');
const fs = require('fs');
const path = require('path');


const PORT = 8080;

const server = http.createServer((req, res) => {
    let filepath = '';
    switch (req.url) {
        case '/':
            filepath = './files/index.html';
            break;
        case '/about':
            filepath = './files/about.html';
            break;
        case '/contact':
            filepath = './files/contactme.html'; // Make sure this file exists
            break;
        default:
            filepath = './files/404.html';
            break;
    }
    fs.readFile(path.resolve(__dirname, filepath), (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            return res.end('error');
           
        }
        res.writeHead(filepath === './files/404.html' ? 404 : 200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`server is on http://localhost:${PORT}`);
});