import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleApiRequest } from './api/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const searchParams = parsedUrl.searchParams;

  // Handle all /api/* routes via unified router
  if (pathname.startsWith('/api/') || pathname === '/api') {
    const body = ['POST', 'PUT', 'PATCH'].includes(req.method) ? await parseBody(req) : {};
    const handled = await handleApiRequest(req, res, pathname, searchParams, body);
    if (handled || res.writableEnded) return;
  }

  // Legacy page redirects
  if (pathname === '/collections.html' || pathname === '/product.html') {
    res.writeHead(302, { 'Location': '/shop' });
    res.end();
    return;
  }
  if (pathname === '/loading.html' || pathname.toLowerCase().includes('3d') || pathname === '/legacy-index.html') {
    res.writeHead(302, { 'Location': '/' });
    res.end();
    return;
  }

  // ==========================================
  // STATIC ASSET & SPA FALLBACK SERVING
  // ==========================================
  let baseDir = fs.existsSync(path.join(__dirname, 'dist')) ? path.join(__dirname, 'dist') : __dirname;
  let targetPath = path.join(baseDir, pathname === '/' ? 'index.html' : pathname);

  if (!fs.existsSync(targetPath)) {
    const pubPath = path.join(__dirname, 'public', pathname);
    if (fs.existsSync(pubPath)) {
      targetPath = pubPath;
    } else {
      const rootAsset = path.join(__dirname, pathname);
      if (fs.existsSync(rootAsset)) {
        targetPath = rootAsset;
      }
    }
  }

  // SPA Route Fallback (for React Router client-side routing, including /admin/*)
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    if (!pathname.startsWith('/api/')) {
      const distIndex = path.join(__dirname, 'dist', 'index.html');
      const rootIndex = path.join(__dirname, 'index.html');
      targetPath = fs.existsSync(distIndex) ? distIndex : rootIndex;
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'API route not found' }));
      return;
    }
  }

  // Stream static file
  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${pathname}`);
      return;
    }

    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(targetPath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`===================================================`);
  console.log(` OLIVER SUPPLEMENT SHOP MASTER SERVER LIVE`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` Admin Control Center: http://localhost:${PORT}/admin/login`);
  console.log(` API Router: http://localhost:${PORT}/api/`);
  console.log(`===================================================`);
});
