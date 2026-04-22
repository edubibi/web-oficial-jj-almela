const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const DIRECTORY = 'C:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\JJ_ALMELA_WEB';

http.createServer((req, res) => {
    let filePath = path.join(DIRECTORY, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
        case '.png': contentType = 'image/png'; break;
        case '.jpg': contentType = 'image/jpeg'; break;
        case '.mp3': contentType = 'audio/mpeg'; break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
