import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, hashPassword, verifyPassword } from './db.js';
import { 
  checkRateLimit, 
  recordFailedAttempt, 
  clearRateLimit, 
  createAdminToken, 
  verifyAdminToken, 
  hasPermission, 
  logAdminActivity 
} from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'assets', 'uploads');

// Ensure uploads folder exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Helpers
function jsonResponse(res, statusCode, data) {
  if (res.writableEnded) return true;
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.end(JSON.stringify(data));
  return true;
}

function parseAuthHeader(req) {
  const auth = req.headers['authorization'] || req.headers['Authorization'] || '';
  if (!auth.startsWith('Bearer ')) return null;
  const token = auth.slice(7).trim();
  return verifyAdminToken(token);
}

// Main Request Handler
export async function handleApiRequest(req, res, pathname, searchParams, body) {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.end();
    return true;
  }

  // --------------------------------------------------------------------------
  // 1. PUBLIC STOREFRONT APIS
  // --------------------------------------------------------------------------

  // GET /api/homepage
  if (pathname === '/api/homepage' && req.method === 'GET') {
    const config = db('homepage').findOne() || {};
    return jsonResponse(res, 200, { success: true, homepage: config });
  }

  // GET /api/settings
  if (pathname === '/api/settings' && req.method === 'GET') {
    const settings = db('settings').findOne() || {};
    return jsonResponse(res, 200, { success: true, settings });
  }

  // GET /api/categories
  if (pathname === '/api/categories' && req.method === 'GET') {
    const categories = db('categories').find();
    return jsonResponse(res, 200, { success: true, categories });
  }

  // GET /api/brands
  if (pathname === '/api/brands' && req.method === 'GET') {
    const brands = db('brands').find();
    return jsonResponse(res, 200, { success: true, brands });
  }

  // GET /api/products/:id
  if (pathname.startsWith('/api/products/') && req.method === 'GET') {
    const id = pathname.replace('/api/products/', '').trim();
    const product = db('products').findById(id) || db('products').findOne(p => p.slug === id);
    if (!product || product.status === 'unpublished') {
      return jsonResponse(res, 404, { success: false, message: `Product '${id}' not found` });
    }
    return jsonResponse(res, 200, { success: true, product });
  }

  // GET /api/products
  if (pathname === '/api/products' && req.method === 'GET') {
    let list = db('products').find(p => p.status !== 'unpublished');

    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const featured = searchParams.get('featured');
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 0;

    if (category && category !== 'all') {
      list = list.filter(p => p.categorySlug === category || p.category === category || p.categoryId === category);
    }

    if (brand && brand !== 'all') {
      list = list.filter(p => (p.brand || '').toLowerCase() === brand.toLowerCase());
    }

    if (minPrice > 0) {
      list = list.filter(p => p.price >= minPrice);
    }
    if (maxPrice > 0) {
      list = list.filter(p => p.price <= maxPrice);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      list = list.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
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
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'reviews' || sort === 'bestseller') {
      list.sort((a, b) => (b.reviews || b.reviewCount || 0) - (a.reviews || a.reviewCount || 0));
    }

    const limit = parseInt(searchParams.get('limit')) || list.length;
    const page = parseInt(searchParams.get('page')) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return jsonResponse(res, 200, {
      success: true,
      total: list.length,
      page,
      limit,
      products: paginated
    });
  }

  // POST /api/coupons/validate
  if (pathname === '/api/coupons/validate' && req.method === 'POST') {
    const code = (body.code || '').trim().toUpperCase();
    const subtotal = Number(body.subtotal) || 0;
    const coupon = db('coupons').findOne(c => c.code === code && c.status === 'active');

    if (!coupon) {
      return jsonResponse(res, 400, { success: false, message: `Invalid coupon '${code}'` });
    }

    if (subtotal < coupon.minOrder) {
      return jsonResponse(res, 400, { 
        success: false, 
        message: `Coupon '${code}' requires a minimum cart subtotal of ₹${coupon.minOrder.toLocaleString('en-IN')}` 
      });
    }

    let discountAmount = 0;
    if (coupon.type === 'percent') {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else if (coupon.type === 'flat') {
      discountAmount = coupon.value;
    } else if (coupon.type === 'free_shipping') {
      discountAmount = 99; // Standard shipping waiver
    }

    return jsonResponse(res, 200, {
      success: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        description: coupon.description,
        discountAmount
      }
    });
  }

  // POST /api/orders (Storefront checkout placement)
  if (pathname === '/api/orders' && req.method === 'POST') {
    const { items, customer, shippingAddress, paymentMethod, couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return jsonResponse(res, 400, { success: false, message: 'Cart items cannot be empty' });
    }
    if (!customer || !customer.email || !customer.name || !customer.phone) {
      return jsonResponse(res, 400, { success: false, message: 'Missing customer contact info' });
    }
    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      return jsonResponse(res, 400, { success: false, message: 'Missing shipping address details' });
    }

    // Compute pricing server-side
    let subtotal = 0;
    for (const item of items) {
      subtotal += (item.price || 0) * (item.quantity || 1);
    }

    // Validate Coupon
    let discount = 0;
    if (couponCode) {
      const coupon = db('coupons').findOne(c => c.code === couponCode.toUpperCase() && c.status === 'active');
      if (coupon && subtotal >= coupon.minOrder) {
        if (coupon.type === 'percent') {
          discount = Math.round((subtotal * coupon.value) / 100);
          if (coupon.maxDiscount && discount > coupon.maxDiscount) discount = coupon.maxDiscount;
        } else if (coupon.type === 'flat') {
          discount = coupon.value;
        }
        db('coupons').updateById(coupon.id, { usageCount: (coupon.usageCount || 0) + 1 });
      }
    }

    const settings = db('settings').findOne() || {};
    const freeShippingThreshold = settings.shipping?.freeShippingThreshold || 1999;
    const shipping = subtotal >= freeShippingThreshold || couponCode === 'FREESHIP' ? 0 : 99;
    const gst = Math.round((subtotal - discount) * 0.18);
    const total = subtotal - discount + shipping + gst;

    const orderId = `OLIVER-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const estDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
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
        { status: 'Batch Quality & Hologram Check', date: 'Expected within 12h', completed: true },
        { status: 'Dispatched from Hub', date: 'Expected within 24h', completed: false },
        { status: 'Out for Delivery', date: 'Expected by ' + estDeliveryDate, completed: false },
        { status: 'Delivered with Seal Intact', date: estDeliveryDate, completed: false }
      ],
      estimatedDelivery: estDeliveryDate,
      courier: 'Blue Dart Express',
      trackingId: `BLUEDART-${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingUrl: `https://www.bluedart.com/tracking`,
      customer,
      shippingAddress,
      paymentMethod: paymentMethod || 'UPI',
      paymentStatus: paymentMethod === 'COD' || paymentMethod === 'Cash on Delivery' ? 'Pending (COD)' : 'Paid Online (Verified)',
      items,
      pricing: { subtotal, discount, shipping, gst, total },
      notes: []
    };

    // Decrement stock in database
    for (const item of items) {
      if (item.productId || item.id) {
        const prod = db('products').findById(item.productId || item.id);
        if (prod && prod.stock !== undefined) {
          const newStock = Math.max(0, prod.stock - (item.quantity || 1));
          db('products').updateById(prod.id, { stock: newStock });
        }
      }
    }

    // Save Customer Profile & Order Record
    db('orders').insertOne(newOrder);

    const existingCust = db('customers').findOne(c => c.email.toLowerCase() === customer.email.toLowerCase());
    if (existingCust) {
      db('customers').updateById(existingCust.id, {
        totalSpent: (existingCust.totalSpent || 0) + total,
        totalOrders: (existingCust.totalOrders || 0) + 1,
        lastOrderDate: new Date().toISOString()
      });
    } else {
      db('customers').insertOne({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        totalSpent: total,
        totalOrders: 1,
        lastOrderDate: new Date().toISOString(),
        registeredAt: new Date().toISOString(),
        status: 'active'
      });
    }

    return jsonResponse(res, 201, { success: true, message: 'Order confirmed successfully', order: newOrder });
  }

  // GET /api/orders/:id (Customer Order Tracking)
  if (pathname.startsWith('/api/orders/') && req.method === 'GET') {
    const id = pathname.replace('/api/orders/', '').trim();
    const order = db('orders').findById(id) || db('orders').findOne(o => o.id.toLowerCase() === id.toLowerCase());
    if (!order) {
      return jsonResponse(res, 404, { success: false, message: `Order '${id}' not found` });
    }
    return jsonResponse(res, 200, { success: true, order });
  }

  // GET /api/pages/:slug
  if (pathname.startsWith('/api/pages/') && req.method === 'GET') {
    const slug = pathname.replace('/api/pages/', '').trim();
    const page = db('pages').findOne(p => p.slug === slug);
    if (!page) {
      return jsonResponse(res, 404, { success: false, message: `Page '${slug}' not found` });
    }
    return jsonResponse(res, 200, { success: true, page });
  }

  // POST /api/contact
  if (pathname === '/api/contact' && req.method === 'POST') {
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !message) {
      return jsonResponse(res, 400, { success: false, message: 'Name, email and message required' });
    }
    const inquiry = db('contact_inquiries').insertOne({
      name, email, phone: phone || '', subject: subject || 'General Inquiry', message, status: 'new'
    });
    return jsonResponse(res, 201, { success: true, message: 'Message received. Support will contact you shortly.', inquiry });
  }

  // POST /api/newsletter
  if (pathname === '/api/newsletter' && req.method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    if (!email || !email.includes('@')) {
      return jsonResponse(res, 400, { success: false, message: 'Valid email required' });
    }
    const existing = db('subscribers').findOne(s => s.email === email);
    if (!existing) {
      db('subscribers').insertOne({ email, subscribedAt: new Date().toISOString() });
    }
    return jsonResponse(res, 200, { success: true, message: 'Subscribed to VIP supplement drops & athlete discounts!' });
  }

  // --------------------------------------------------------------------------
  // 2. ADMIN AUTHENTICATION APIS
  // --------------------------------------------------------------------------

  // POST /api/admin/auth/login
  if (pathname === '/api/admin/auth/login' && req.method === 'POST') {
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!email || !password) {
      return jsonResponse(res, 400, { success: false, message: 'Email and password are required' });
    }

    // Rate Limiting check
    const rateCheck = checkRateLimit(email);
    if (!rateCheck.allowed) {
      return jsonResponse(res, 429, { success: false, message: rateCheck.message });
    }

    const admin = db('admin_users').findOne(u => u.email.toLowerCase() === email);
    if (!admin || !verifyPassword(password, admin.passwordHash)) {
      recordFailedAttempt(email);
      return jsonResponse(res, 401, { success: false, message: 'Invalid admin credentials' });
    }

    if (admin.status !== 'active') {
      return jsonResponse(res, 403, { success: false, message: 'Administrator account is deactivated' });
    }

    clearRateLimit(email);
    const token = createAdminToken(admin);

    db('admin_users').updateById(admin.id, { lastLogin: new Date().toISOString() });
    logAdminActivity(admin, 'Admin Login', 'auth', { email: admin.email, ip: req.socket?.remoteAddress });

    return jsonResponse(res, 200, {
      success: true,
      message: 'Admin authentication successful',
      token,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar
      }
    });
  }

  // Protected Admin Routes Guard
  if (pathname.startsWith('/api/admin/')) {
    const adminUser = parseAuthHeader(req);
    if (!adminUser) {
      return jsonResponse(res, 401, { success: false, message: 'Unauthorized. Admin session token missing or expired.' });
    }

    // GET /api/admin/auth/me
    if (pathname === '/api/admin/auth/me' && req.method === 'GET') {
      const userDoc = db('admin_users').findById(adminUser.userId);
      return jsonResponse(res, 200, {
        success: true,
        user: {
          id: adminUser.userId,
          name: userDoc?.name || adminUser.name,
          email: adminUser.email,
          role: userDoc?.role || adminUser.role,
          avatar: userDoc?.avatar || '/icons/logo.svg'
        }
      });
    }

    // POST /api/admin/auth/change-password
    if (pathname === '/api/admin/auth/change-password' && req.method === 'POST') {
      const { oldPassword, newPassword } = body;
      const userDoc = db('admin_users').findById(adminUser.userId);
      if (!userDoc || !verifyPassword(oldPassword, userDoc.passwordHash)) {
        return jsonResponse(res, 400, { success: false, message: 'Current password is incorrect' });
      }
      if (!newPassword || newPassword.length < 8) {
        return jsonResponse(res, 400, { success: false, message: 'New password must be at least 8 characters' });
      }
      const { hash } = hashPassword(newPassword);
      db('admin_users').updateById(userDoc.id, { passwordHash: hash });
      logAdminActivity(adminUser, 'Password Changed', 'admin_users', { userId: userDoc.id });
      return jsonResponse(res, 200, { success: true, message: 'Password updated successfully' });
    }

    // ------------------------------------------------------------------------
    // 3. ADMIN DASHBOARD ANALYTICS & STATS
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/dashboard/stats' && req.method === 'GET') {
      const orders = db('orders').find();
      const products = db('products').find();
      const customers = db('customers').find();

      let totalSales = 0;
      let todaySales = 0;
      const todayStr = new Date().toISOString().slice(0, 10);

      orders.forEach(o => {
        const orderTotal = o.pricing?.total || o.total || 0;
        totalSales += orderTotal;
        if (o.createdAt && o.createdAt.startsWith(todayStr)) {
          todaySales += orderTotal;
        }
      });

      const lowStockProducts = products.filter(p => (p.stock || 0) <= (p.lowStockThreshold || 10));
      const outOfStockProducts = products.filter(p => (p.stock || 0) === 0);

      // 14-day sales trend
      const salesTrend = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const dayKey = d.toISOString().slice(0, 10);
        const dayLabel = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
        const dayOrders = orders.filter(o => o.createdAt && o.createdAt.startsWith(dayKey));
        const dayRev = dayOrders.reduce((acc, curr) => acc + (curr.pricing?.total || curr.total || 0), 0);
        salesTrend.push({ date: dayLabel, revenue: dayRev, count: dayOrders.length });
      }

      return jsonResponse(res, 200, {
        success: true,
        stats: {
          totalSales,
          todaySales,
          totalOrders: orders.length,
          pendingOrders: orders.filter(o => o.status === 'Order Placed' || o.status === 'Pending').length,
          deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
          totalProducts: products.length,
          lowStockCount: lowStockProducts.length,
          outOfStockCount: outOfStockProducts.length,
          totalCustomers: customers.length,
          salesTrend
        }
      });
    }

    // GET /api/admin/activity-logs
    if (pathname === '/api/admin/activity-logs' && req.method === 'GET') {
      const logs = db('activity_logs').find().slice(0, 100);
      return jsonResponse(res, 200, { success: true, logs });
    }

    // ------------------------------------------------------------------------
    // 4. ADMIN USERS & ROLES
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/users' && req.method === 'GET') {
      if (!hasPermission(adminUser.role, '*')) {
        return jsonResponse(res, 403, { success: false, message: 'Super Admin privilege required' });
      }
      const users = db('admin_users').find().map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        lastLogin: u.lastLogin,
        createdAt: u.createdAt
      }));
      return jsonResponse(res, 200, { success: true, users });
    }

    if (pathname === '/api/admin/users' && req.method === 'POST') {
      if (!hasPermission(adminUser.role, '*')) {
        return jsonResponse(res, 403, { success: false, message: 'Super Admin privilege required' });
      }
      const { name, email, password, role } = body;
      if (!name || !email || !password) {
        return jsonResponse(res, 400, { success: false, message: 'Name, email and password required' });
      }
      const existing = db('admin_users').findOne(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return jsonResponse(res, 400, { success: false, message: 'Admin with this email already exists' });
      }
      const { hash } = hashPassword(password);
      const newUser = db('admin_users').insertOne({
        name,
        email: email.toLowerCase(),
        passwordHash: hash,
        role: role || 'Product Manager',
        status: 'active',
        createdAt: new Date().toISOString()
      });
      logAdminActivity(adminUser, 'Created Admin User', 'admin_users', { newAdmin: email, role });
      return jsonResponse(res, 201, { success: true, user: { id: newUser.id, name, email, role } });
    }

    if (pathname.startsWith('/api/admin/users/') && req.method === 'PUT') {
      if (!hasPermission(adminUser.role, '*')) {
        return jsonResponse(res, 403, { success: false, message: 'Super Admin privilege required' });
      }
      const id = pathname.replace('/api/admin/users/', '').trim();
      const updates = { ...body };
      delete updates.passwordHash;
      if (body.password) {
        updates.passwordHash = hashPassword(body.password).hash;
        delete updates.password;
      }
      const updated = db('admin_users').updateById(id, updates);
      logAdminActivity(adminUser, 'Updated Admin User', 'admin_users', { userId: id });
      return jsonResponse(res, 200, { success: true, user: updated });
    }

    if (pathname.startsWith('/api/admin/users/') && req.method === 'DELETE') {
      if (!hasPermission(adminUser.role, '*')) {
        return jsonResponse(res, 403, { success: false, message: 'Super Admin privilege required' });
      }
      const id = pathname.replace('/api/admin/users/', '').trim();
      if (id === adminUser.userId) {
        return jsonResponse(res, 400, { success: false, message: 'Cannot delete your own administrator account' });
      }
      db('admin_users').deleteById(id);
      logAdminActivity(adminUser, 'Deleted Admin User', 'admin_users', { userId: id });
      return jsonResponse(res, 200, { success: true, message: 'User deleted' });
    }

    // ------------------------------------------------------------------------
    // 5. MASTER HOMEPAGE MANAGER
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/homepage' && req.method === 'GET') {
      const config = db('homepage').findOne() || {};
      return jsonResponse(res, 200, { success: true, homepage: config });
    }

    if (pathname === '/api/admin/homepage' && req.method === 'PUT') {
      if (!hasPermission(adminUser.role, 'homepage')) {
        return jsonResponse(res, 403, { success: false, message: 'Permission denied for Homepage Content' });
      }
      const current = db('homepage').findOne();
      let updated;
      if (current) {
        updated = db('homepage').updateById(current.id, body);
      } else {
        updated = db('homepage').insertOne(body);
      }
      logAdminActivity(adminUser, 'Updated Homepage Configuration', 'homepage', { version: updated.version || 1 });
      return jsonResponse(res, 200, { success: true, message: 'Homepage updated successfully', homepage: updated });
    }

    // ------------------------------------------------------------------------
    // 6. WEBSITE SETTINGS
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/settings' && req.method === 'GET') {
      const settings = db('settings').findOne() || {};
      return jsonResponse(res, 200, { success: true, settings });
    }

    if (pathname === '/api/admin/settings' && req.method === 'PUT') {
      if (!hasPermission(adminUser.role, 'settings')) {
        return jsonResponse(res, 403, { success: false, message: 'Permission denied for Settings' });
      }
      const current = db('settings').findOne();
      let updated;
      if (current) {
        updated = db('settings').updateById(current.id, body);
      } else {
        updated = db('settings').insertOne(body);
      }
      logAdminActivity(adminUser, 'Updated Website Settings', 'settings');
      return jsonResponse(res, 200, { success: true, message: 'Settings saved', settings: updated });
    }

    // ------------------------------------------------------------------------
    // 7. PRODUCT MANAGEMENT
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/products' && req.method === 'GET') {
      const products = db('products').find();
      return jsonResponse(res, 200, { success: true, products });
    }

    if (pathname === '/api/admin/products' && req.method === 'POST') {
      if (!hasPermission(adminUser.role, 'products')) {
        return jsonResponse(res, 403, { success: false, message: 'Permission denied for Products' });
      }
      const product = db('products').insertOne(body);
      logAdminActivity(adminUser, 'Created Product', 'products', { id: product.id, name: product.name });
      return jsonResponse(res, 201, { success: true, product });
    }

    if (pathname.startsWith('/api/admin/products/') && req.method === 'PUT') {
      if (!hasPermission(adminUser.role, 'products')) {
        return jsonResponse(res, 403, { success: false, message: 'Permission denied for Products' });
      }
      const id = pathname.replace('/api/admin/products/', '').trim();
      const updated = db('products').updateById(id, body);
      logAdminActivity(adminUser, 'Updated Product', 'products', { id, name: body.name });
      return jsonResponse(res, 200, { success: true, product: updated });
    }

    if (pathname.startsWith('/api/admin/products/') && req.method === 'DELETE') {
      if (!hasPermission(adminUser.role, 'products')) {
        return jsonResponse(res, 403, { success: false, message: 'Permission denied for Products' });
      }
      const id = pathname.replace('/api/admin/products/', '').trim();
      db('products').deleteById(id);
      logAdminActivity(adminUser, 'Deleted Product', 'products', { id });
      return jsonResponse(res, 200, { success: true, message: 'Product deleted' });
    }

    // ------------------------------------------------------------------------
    // 8. CATEGORY & BRAND MANAGEMENT
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/categories' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, categories: db('categories').find() });
    }

    if (pathname === '/api/admin/categories' && req.method === 'POST') {
      const cat = db('categories').insertOne(body);
      logAdminActivity(adminUser, 'Created Category', 'categories', { name: cat.name });
      return jsonResponse(res, 201, { success: true, category: cat });
    }

    if (pathname.startsWith('/api/admin/categories/') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/categories/', '').trim();
      const updated = db('categories').updateById(id, body);
      logAdminActivity(adminUser, 'Updated Category', 'categories', { id, name: body.name });
      return jsonResponse(res, 200, { success: true, category: updated });
    }

    if (pathname.startsWith('/api/admin/categories/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/admin/categories/', '').trim();
      const cat = db('categories').findById(id) || db('categories').findOne(c => c.slug === id);
      if (cat) {
        // Safe check: verify if products exist
        const hasProducts = db('products').findOne(p => p.categorySlug === cat.slug || p.category === cat.id);
        if (hasProducts) {
          return jsonResponse(res, 400, {
            success: false,
            message: `Cannot delete category '${cat.name}'. Products are currently assigned to it. Reassign products first.`
          });
        }
        db('categories').deleteById(cat.id);
        logAdminActivity(adminUser, 'Deleted Category', 'categories', { id: cat.id, name: cat.name });
      }
      return jsonResponse(res, 200, { success: true, message: 'Category deleted' });
    }

    if (pathname === '/api/admin/brands' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, brands: db('brands').find() });
    }

    if (pathname === '/api/admin/brands' && req.method === 'POST') {
      const brand = db('brands').insertOne(body);
      logAdminActivity(adminUser, 'Created Brand', 'brands', { name: brand.name });
      return jsonResponse(res, 201, { success: true, brand });
    }

    if (pathname.startsWith('/api/admin/brands/') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/brands/', '').trim();
      const updated = db('brands').updateById(id, body);
      logAdminActivity(adminUser, 'Updated Brand', 'brands', { id });
      return jsonResponse(res, 200, { success: true, brand: updated });
    }

    if (pathname.startsWith('/api/admin/brands/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/admin/brands/', '').trim();
      db('brands').deleteById(id);
      logAdminActivity(adminUser, 'Deleted Brand', 'brands', { id });
      return jsonResponse(res, 200, { success: true, message: 'Brand deleted' });
    }

    // ------------------------------------------------------------------------
    // 9. INVENTORY MANAGEMENT
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/inventory' && req.method === 'GET') {
      const products = db('products').find();
      const inventory = products.map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku || `OLV-${p.id}`,
        brand: p.brand,
        category: p.categoryName || p.category,
        stock: p.stock || 0,
        lowStockThreshold: p.lowStockThreshold || 10,
        status: (p.stock || 0) === 0 ? 'Out of Stock' : (p.stock <= (p.lowStockThreshold || 10) ? 'Low Stock' : 'In Stock'),
        price: p.price
      }));
      return jsonResponse(res, 200, { success: true, inventory });
    }

    if (pathname === '/api/admin/inventory/adjust' && req.method === 'POST') {
      const { productId, newStock, reason } = body;
      const prod = db('products').findById(productId);
      if (!prod) return jsonResponse(res, 404, { success: false, message: 'Product not found' });
      const oldStock = prod.stock || 0;
      db('products').updateById(productId, { stock: Number(newStock) });
      db('inventory_logs').insertOne({
        productId,
        productName: prod.name,
        oldStock,
        newStock: Number(newStock),
        reason: reason || 'Manual Correction',
        adminName: adminUser.name,
        timestamp: new Date().toISOString()
      });
      logAdminActivity(adminUser, 'Adjusted Stock', 'inventory', { product: prod.name, oldStock, newStock, reason });
      return jsonResponse(res, 200, { success: true, message: 'Stock updated', currentStock: newStock });
    }

    // ------------------------------------------------------------------------
    // 10. ORDER MANAGEMENT
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/orders' && req.method === 'GET') {
      const orders = db('orders').find();
      return jsonResponse(res, 200, { success: true, orders });
    }

    if (pathname.startsWith('/api/admin/orders/') && pathname.endsWith('/status') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/orders/', '').replace('/status', '').trim();
      const { status } = body;
      const order = db('orders').findById(id);
      if (!order) return jsonResponse(res, 404, { success: false, message: 'Order not found' });

      const timeline = order.statusTimeline || [];
      timeline.push({ status, date: new Date().toLocaleString('en-IN'), completed: true });

      const updated = db('orders').updateById(id, {
        status,
        statusTimeline: timeline
      });
      logAdminActivity(adminUser, 'Updated Order Status', 'orders', { orderId: id, status });
      return jsonResponse(res, 200, { success: true, order: updated });
    }

    if (pathname.startsWith('/api/admin/orders/') && pathname.endsWith('/tracking') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/orders/', '').replace('/tracking', '').trim();
      const { courier, trackingId, trackingUrl } = body;
      const updated = db('orders').updateById(id, { courier, trackingId, trackingUrl });
      logAdminActivity(adminUser, 'Updated Order Tracking', 'orders', { orderId: id, trackingId });
      return jsonResponse(res, 200, { success: true, order: updated });
    }

    if (pathname.startsWith('/api/admin/orders/') && pathname.endsWith('/notes') && req.method === 'POST') {
      const id = pathname.replace('/api/admin/orders/', '').replace('/notes', '').trim();
      const { note } = body;
      const order = db('orders').findById(id);
      const notes = order?.notes || [];
      notes.push({ text: note, author: adminUser.name, date: new Date().toLocaleString('en-IN') });
      const updated = db('orders').updateById(id, { notes });
      return jsonResponse(res, 200, { success: true, order: updated });
    }

    // ------------------------------------------------------------------------
    // 11. CUSTOMER MANAGEMENT
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/customers' && req.method === 'GET') {
      const customers = db('customers').find();
      return jsonResponse(res, 200, { success: true, customers });
    }

    if (pathname.startsWith('/api/admin/customers/') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/customers/', '').trim();
      const updated = db('customers').updateById(id, body);
      logAdminActivity(adminUser, 'Updated Customer', 'customers', { id });
      return jsonResponse(res, 200, { success: true, customer: updated });
    }

    // ------------------------------------------------------------------------
    // 12. COUPONS & OFFERS
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/coupons' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, coupons: db('coupons').find() });
    }

    if (pathname === '/api/admin/coupons' && req.method === 'POST') {
      const coupon = db('coupons').insertOne({ ...body, code: (body.code || '').toUpperCase().trim() });
      logAdminActivity(adminUser, 'Created Coupon', 'coupons', { code: coupon.code });
      return jsonResponse(res, 201, { success: true, coupon });
    }

    if (pathname.startsWith('/api/admin/coupons/') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/coupons/', '').trim();
      const updated = db('coupons').updateById(id, body);
      logAdminActivity(adminUser, 'Updated Coupon', 'coupons', { id });
      return jsonResponse(res, 200, { success: true, coupon: updated });
    }

    if (pathname.startsWith('/api/admin/coupons/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/admin/coupons/', '').trim();
      db('coupons').deleteById(id);
      logAdminActivity(adminUser, 'Deleted Coupon', 'coupons', { id });
      return jsonResponse(res, 200, { success: true, message: 'Coupon deleted' });
    }

    // ------------------------------------------------------------------------
    // 13. MEDIA LIBRARY & UPLOAD
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/media' && req.method === 'GET') {
      const media = db('media').find();
      return jsonResponse(res, 200, { success: true, media });
    }

    if (pathname === '/api/admin/media/upload' && req.method === 'POST') {
      const { filename, base64Data, folder } = body;
      if (!filename || !base64Data) {
        return jsonResponse(res, 400, { success: false, message: 'Filename and base64Data required' });
      }

      // Clean base64 header if present
      const rawBase64 = base64Data.includes(';base64,') ? base64Data.split(';base64,')[1] : base64Data;
      const buffer = Buffer.from(rawBase64, 'base64');

      const safeName = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const destPath = path.join(UPLOADS_DIR, safeName);
      fs.writeFileSync(destPath, buffer);

      const mediaDoc = db('media').insertOne({
        name: filename,
        filename: safeName,
        url: `/assets/uploads/${safeName}`,
        size: buffer.length,
        folder: folder || 'general',
        uploadedBy: adminUser.name,
        uploadedAt: new Date().toISOString()
      });

      logAdminActivity(adminUser, 'Uploaded Media', 'media', { filename: safeName, size: buffer.length });
      return jsonResponse(res, 201, { success: true, media: mediaDoc });
    }

    if (pathname.startsWith('/api/admin/media/') && req.method === 'DELETE') {
      const id = pathname.replace('/api/admin/media/', '').trim();
      const media = db('media').findById(id);
      if (media && media.filename) {
        const filePath = path.join(UPLOADS_DIR, media.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      db('media').deleteById(id);
      return jsonResponse(res, 200, { success: true, message: 'Media removed' });
    }

    // ------------------------------------------------------------------------
    // 14. PAGES & CMS
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/pages' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, pages: db('pages').find() });
    }

    if (pathname.startsWith('/api/admin/pages/') && req.method === 'PUT') {
      const slug = pathname.replace('/api/admin/pages/', '').trim();
      const existing = db('pages').findOne(p => p.slug === slug);
      let updated;
      if (existing) {
        updated = db('pages').updateById(existing.id, { ...body, lastUpdated: new Date().toISOString() });
      } else {
        updated = db('pages').insertOne({ ...body, slug, lastUpdated: new Date().toISOString() });
      }
      logAdminActivity(adminUser, 'Updated Page Content', 'pages', { slug });
      return jsonResponse(res, 200, { success: true, page: updated });
    }

    // ------------------------------------------------------------------------
    // 15. REVIEWS, INQUIRIES & SUBSCRIBERS
    // ------------------------------------------------------------------------
    if (pathname === '/api/admin/reviews' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, reviews: db('reviews').find() });
    }

    if (pathname.startsWith('/api/admin/reviews/') && pathname.endsWith('/status') && req.method === 'PUT') {
      const id = pathname.replace('/api/admin/reviews/', '').replace('/status', '').trim();
      const { status } = body;
      const updated = db('reviews').updateById(id, { status });
      return jsonResponse(res, 200, { success: true, review: updated });
    }

    if (pathname === '/api/admin/inquiries' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, inquiries: db('contact_inquiries').find() });
    }

    if (pathname === '/api/admin/subscribers' && req.method === 'GET') {
      return jsonResponse(res, 200, { success: true, subscribers: db('subscribers').find() });
    }

    return jsonResponse(res, 404, { success: false, message: `Admin route '${pathname}' not found` });
  }

  return false;
}
