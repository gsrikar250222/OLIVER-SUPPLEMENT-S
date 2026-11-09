import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CATEGORIES, PRODUCTS } from './src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Ensure orders file exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, '[]', 'utf8');
}

function readOrders() {
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveOrder(order) {
  const orders = readOrders();
  orders.unshift(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
  return order;
}

// Coupons Database
const COUPONS = {
  'VAULT10': { code: 'VAULT10', type: 'percent', value: 10, minOrder: 0, desc: '10% Off Sitewide' },
  'WELCOME20': { code: 'WELCOME20', type: 'percent', value: 20, minOrder: 1499, desc: '20% Off Orders Over ₹1,499' },
  'REP50': { code: 'REP50', type: 'flat', value: 50, minOrder: 999, desc: '₹50 Flat Off' },
  'FREESHIP': { code: 'FREESHIP', type: 'free_shipping', value: 0, minOrder: 0, desc: 'Free Express Shipping' }
};

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

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);
  const searchParams = parsedUrl.searchParams;

  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  // ==========================================
  // API ROUTES
  // ==========================================

  // 1. GET /api/categories
  if (pathname === '/api/categories' && req.method === 'GET') {
    return sendJson(res, 200, {
      success: true,
      categories: CATEGORIES
    });
  }

  // 2. GET /api/products
  if (pathname === '/api/products' && req.method === 'GET') {
    let list = [...PRODUCTS];

    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const featured = searchParams.get('featured');

    if (category && category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    if (gender && gender !== 'all') {
      list = list.filter(p => p.gender === gender || p.gender === 'unisex');
    }

    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (featured === 'true') {
      list = list.filter(p => p.badge === 'BESTSELLER' || p.badge === 'NEW DROP');
    }

    // Sorting
    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'reviews') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    const limit = parseInt(searchParams.get('limit')) || list.length;
    const page = parseInt(searchParams.get('page')) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return sendJson(res, 200, {
      success: true,
      total: list.length,
      page,
      limit,
      products: paginated
    });
  }

  // 3. GET /api/products/:id
  if (pathname.startsWith('/api/products/') && req.method === 'GET') {
    const id = pathname.replace('/api/products/', '');
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) {
      return sendJson(res, 404, { success: false, message: `Product '${id}' not found` });
    }
    return sendJson(res, 200, { success: true, product });
  }

  // 4. POST /api/coupons/validate
  if (pathname === '/api/coupons/validate' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const code = (body.code || '').trim().toUpperCase();
      const subtotal = Number(body.subtotal) || 0;

      const coupon = COUPONS[code];
      if (!coupon) {
        return sendJson(res, 400, {
          success: false,
          message: `Invalid coupon code '${code}'. Try VAULT10 or WELCOME20.`
        });
      }

      if (subtotal < coupon.minOrder) {
        return sendJson(res, 400, {
          success: false,
          message: `Coupon '${code}' requires a minimum order of ₹${coupon.minOrder}.`
        });
      }

      let discountAmount = 0;
      if (coupon.type === 'percent') {
        discountAmount = Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.type === 'flat') {
        discountAmount = coupon.value;
      }

      return sendJson(res, 200, {
        success: true,
        coupon: {
          code: coupon.code,
          type: coupon.type,
          value: coupon.value,
          description: coupon.desc,
          discountAmount
        }
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: 'Server error validating coupon' });
    }
  }

  // 5. POST /api/orders
  if (pathname === '/api/orders' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { items, customer, shippingAddress, paymentMethod, couponCode } = body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return sendJson(res, 400, { success: false, message: 'Cart items cannot be empty' });
      }

      if (!customer || !customer.email || !customer.name || !customer.phone) {
        return sendJson(res, 400, { success: false, message: 'Missing required customer contact information' });
      }

      if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
        return sendJson(res, 400, { success: false, message: 'Missing required shipping address details' });
      }

      // Compute pricing
      let subtotal = 0;
      items.forEach(item => {
        subtotal += (item.price || 0) * (item.quantity || 1);
      });

      let discount = 0;
      if (couponCode && COUPONS[couponCode.toUpperCase()]) {
        const c = COUPONS[couponCode.toUpperCase()];
        if (subtotal >= c.minOrder) {
          if (c.type === 'percent') discount = Math.round((subtotal * c.value) / 100);
          else if (c.type === 'flat') discount = c.value;
        }
      }

      // Free shipping over 1000
      const shipping = subtotal >= 1000 || couponCode === 'FREESHIP' ? 0 : 99;
      const gst = Math.round((subtotal - discount) * 0.05); // 5% GST on apparel
      const total = subtotal - discount + shipping + gst;

      const orderId = `RV-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const estDeliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const newOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'Order Placed',
        statusTimeline: [
          { status: 'Order Placed', date: new Date().toLocaleString('en-IN'), completed: true },
          { status: 'Quality Verification', date: 'Expected within 12 hours', completed: true },
          { status: 'Dispatched from Warehouse', date: 'Expected within 24 hours', completed: false },
          { status: 'Out for Delivery', date: 'Expected by ' + estDeliveryDate, completed: false },
          { status: 'Delivered', date: estDeliveryDate, completed: false }
        ],
        estimatedDelivery: estDeliveryDate,
        customer,
        shippingAddress,
        paymentMethod: paymentMethod || 'UPI',
        paymentStatus: paymentMethod === 'COD' ? 'Pending (Cash on Delivery)' : 'Paid (Verified)',
        items,
        pricing: {
          subtotal,
          discount,
          shipping,
          gst,
          total
        }
      };

      saveOrder(newOrder);

      return sendJson(res, 201, {
        success: true,
        message: 'Order created successfully',
        order: newOrder
      });
    } catch (err) {
      console.error('Order creation error:', err);
      return sendJson(res, 500, { success: false, message: 'Internal server error creating order' });
    }
  }

  // 6. GET /api/orders/:id
  if (pathname.startsWith('/api/orders/') && req.method === 'GET') {
    const id = pathname.replace('/api/orders/', '');
    const orders = readOrders();
    const order = orders.find(o => o.id === id);
    if (!order) {
      return sendJson(res, 404, { success: false, message: `Order '${id}' not found` });
    }
    return sendJson(res, 200, { success: true, order });
  }

  // 7. POST /api/auth/login
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { email, password } = body;
      if (!email || !password) {
        return sendJson(res, 400, { success: false, message: 'Email and password required' });
      }

      // Realistic mock user
      const user = {
        id: 'usr_' + Date.now().toString().slice(-6),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        token: 'rv_token_' + Buffer.from(email + ':' + Date.now()).toString('base64')
      };

      return sendJson(res, 200, {
        success: true,
        message: 'Login successful',
        user
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: 'Login error' });
    }
  }

  // 8. POST /api/auth/register
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    try {
      const body = await parseBody(req);
      const { name, email, password } = body;
      if (!email || !password || !name) {
        return sendJson(res, 400, { success: false, message: 'Name, email and password required' });
      }

      const user = {
        id: 'usr_' + Date.now().toString().slice(-6),
        name,
        email,
        token: 'rv_token_' + Buffer.from(email + ':' + Date.now()).toString('base64')
      };

      return sendJson(res, 201, {
        success: true,
        message: 'Registration successful',
        user
      });
    } catch (err) {
      return sendJson(res, 500, { success: false, message: 'Registration error' });
    }
  }

  // ==========================================
  // STATIC ASSET & SPA FALLBACK SERVING
  // ==========================================
  // Check if dist exists (production build) or fallback to root/public
  let baseDir = fs.existsSync(path.join(__dirname, 'dist')) ? path.join(__dirname, 'dist') : __dirname;
  let targetPath = path.join(baseDir, pathname === '/' ? 'index.html' : pathname);

  // If file doesn't exist in baseDir, check in public or assets
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

  // SPA Route Fallback (for React Router client-side routing)
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    if (!pathname.startsWith('/api/')) {
      const distIndex = path.join(__dirname, 'dist', 'index.html');
      const rootIndex = path.join(__dirname, 'index.html');
      targetPath = fs.existsSync(distIndex) ? distIndex : rootIndex;
    } else {
      return sendJson(res, 404, { success: false, message: 'API route not found' });
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

    // Range requests for video playback
    const range = req.headers.range;
    if (range && ext === '.mp4') {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(targetPath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      fileStream.pipe(res);
      return;
    }

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
  console.log(` REPVAULT REST API & E-COMMERCE SERVER LIVE`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(` API Products: http://localhost:${PORT}/api/products`);
  console.log(` API Categories: http://localhost:${PORT}/api/categories`);
  console.log(` API Coupons: http://localhost:${PORT}/api/coupons/validate`);
  console.log(` API Orders: http://localhost:${PORT}/api/orders`);
  console.log(`===================================================`);
});
