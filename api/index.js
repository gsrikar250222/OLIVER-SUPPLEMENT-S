import { handleApiRequest } from './router.js';

export default async function handler(req, res) {
  const host = req.headers.host || 'localhost';
  const url = new URL(req.url, `https://${host}`);
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      body = {};
    }
  }

  const handled = await handleApiRequest(req, res, pathname, searchParams, body);
  if (!handled) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: `API endpoint '${pathname}' not found` }));
  }
}
