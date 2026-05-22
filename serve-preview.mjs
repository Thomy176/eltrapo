import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

const server = createServer((req, res) => {
  let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
  if (!existsSync(filePath)) filePath = join(distDir, 'index.html');
  const ext = extname(filePath);
  const mime = mimeTypes[ext] || 'text/plain';
  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(4173, () => {
  console.log('DEPORT server running on http://localhost:4173');
});
