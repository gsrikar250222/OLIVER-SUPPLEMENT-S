import { CATEGORIES, PRODUCTS, searchProducts } from '../src/data/products.js';

const COUPONS = {
  'VAULT10': { code: 'VAULT10', type: 'percent', value: 10, minOrder: 0, desc: '10% Off Sitewide' },
  'WELCOME20': { code: 'WELCOME20', type: 'percent', value: 20, minOrder: 1499, desc: '20% Off Orders Over ₹1,499' },
  'REP50': { code: 'REP50', type: 'flat', value: 50, minOrder: 999, desc: '₹50 Flat Off' },
  'FREESHIP': { code: 'FREESHIP', type: 'free_shipping', value: 0, minOrder: 0, desc: 'Free Express Shipping' }
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const host = req.headers.host || 'localhost';
  const url = new URL(req.url, `https://${host}`);
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // 1. Categories
  if (pathname.includes('/categories')) {
    return res.status(200).json({ success: true, categories: CATEGORIES });
  }

  // 2. Single Product
  if (pathname.includes('/products/')) {
    const id = pathname.split('/products/')[1];
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) {
      return res.status(404).json({ success: false, message: `Product '${id}' not found` });
    }
    return res.status(200).json({ success: true, product });
  }

  // 3. Products List & Search
  if (pathname.includes('/products')) {
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
      list = searchProducts(search);
    }
    if (featured === 'true') {
      list = list.filter(p => p.badge === 'BESTSELLER' || p.badge === 'NEW DROP');
    }

    if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

    const limit = parseInt(searchParams.get('limit')) || list.length;
    return res.status(200).json({
      success: true,
      total: list.length,
      products: list.slice(0, limit)
    });
  }

  // 4. Coupons Validate
  if (pathname.includes('/coupons/validate') && req.method === 'POST') {
    const body = req.body || {};
    const code = (body.code || '').trim().toUpperCase();
    const subtotal = Number(body.subtotal) || 0;
    const coupon = COUPONS[code];

    if (!coupon || subtotal < coupon.minOrder) {
      return res.status(400).json({
        success: false,
        message: coupon ? `Requires minimum order of ₹${coupon.minOrder}` : `Invalid coupon '${code}'`
      });
    }

    const discountAmount = coupon.type === 'percent'
      ? Math.round((subtotal * coupon.value) / 100)
      : coupon.value;

    return res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        description: coupon.desc,
        discountAmount
      }
    });
  }

  // 5. Orders API
  if (pathname.includes('/orders') && req.method === 'POST') {
    const body = req.body || {};
    const orderId = 'ORD-' + Date.now().toString().slice(-6);
    return res.status(201).json({
      success: true,
      order: {
        orderId,
        items: body.items || [],
        customer: body.customer || {},
        total: body.total || 0,
        createdAt: new Date().toISOString()
      }
    });
  }

  return res.status(200).json({ success: true, message: 'REPVAULT Vercel API Service Ready' });
}

