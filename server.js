const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;

    // Default to demo.html for root path
    if (pathname === '/') {
        pathname = '/demo.html';
    }

    const ext = path.extname(pathname);
    const mimeType = mimeTypes[ext] || 'text/plain';

    fs.readFile(path.join(__dirname, pathname), (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(data);
    });
});

server.listen(port, () => {
    console.log(`🚀 React Role Guard Demo running at http://localhost:${port}`);
    console.log(`📦 Testing the built package from ./dist/`);
    console.log(`🔄 Switch between users and toggle features to see role-based access control in action!`);
    console.log(`\n📋 Demo Features:`);
    console.log(`   👤 User switching (Admin/Editor/Viewer)`);
    console.log(`   🚩 Feature flag toggles`);
    console.log(`   🔒 Role-based access control`);
    console.log(`   🔑 Permission-based access control`);
    console.log(`   🎣 useCan hook demonstrations`);
});