const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if (query.name) {
        res.end(`Hello ${query.name}`);
    } else {
        res.end('You should provide name parameter');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
