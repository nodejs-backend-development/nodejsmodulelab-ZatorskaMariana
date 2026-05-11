const http = require('http');
const fs = require('fs');
const split2 = require('split2');
const through2 = require('through2');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {

        const results = [];
        let headers = [];

        fs.createReadStream('data.csv')
            .pipe(split2())
            .pipe(through2.obj(function (line, enc, callback) {

                if (!line) return callback();

                const values = line.split(',');

                if (headers.length === 0) {
                    headers = values;
                } else {
                    const obj = {};
                    headers.forEach((h, i) => {
                        obj[h] = values[i];
                    });
                    results.push(obj);
                }

                callback();
            }))
            .on('finish', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(results, null, 2));
            });
    }
});

server.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
