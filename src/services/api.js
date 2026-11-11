import { CATEGORIES as FALLBACK_CATEGORIES, PRODUCTS as FALLBACK_PRODUCTS, BRANDS as FALLBACK_BRANDS, getProductById, searchProducts } from '../data/products.js';

const API_BASE = '/api';

export const api = {
  // 1. Dynamic Homepage Config
  async getHomepage() {
    try {
      const res = await fetch(`${API_BASE}/homepage`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.homepage) return data.homepage;
      }
    } catch (e) {
      console.warn('API /api/homepage fallback to local defaults:', e.message);
    }
    return null;
  },

  // 2. Dynamic Website Settings
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE}/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.settings) return data.settings;
      }
    } catch (e) {
      console.warn('API /api/settings fallback to local defaults:', e.message);
    }
    return null;
  },

  // 3. Dynamic Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.categories)) return data.categories;
      }
    } catch (e) {
      console.warn('API /api/categories fallback:', e.message);
    }
    return FALLBACK_CATEGORIES;
  },

  // 4. Dynamic Brands
  async getBrands() {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.brands)) return data.brands;
      }
    } catch (e) {
      console.warn('API /api/brands fallback:', e.message);
    }
    return FALLBACK_BRANDS;
  },

  // 5. Dynamic Products
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category && params.category !== 'all') query.set('category', params.category);
      if (params.brand && params.brand !== 'all') query.set('brand', params.brand);
      if (params.search) query.set('search', params.search);
      if (params.sort) query.set('sort', params.sort);
      if (params.limit) query.set('limit', params.limit);
      if (params.featured) query.set('featured', 'true');
      if (params.minPrice) query.set('minPrice', params.minPrice);
      if (params.maxPrice) query.set('maxPrice', params.maxPrice);

      const res = await fetch(`${API_BASE}/products?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.products)) return data.products;
      }
    } catch (e) {
      console.warn('API /api/products fallback:', e.message);
    }

    // Resilient local fallback
    let list = [...FALLBACK_PRODUCTS];
    if (params.category && params.category !== 'all') {
      list = list.filter(p => p.categorySlug === params.category || p.category === params.category);
    }
    if (params.brand && params.brand !== 'all') {
      list = list.filter(p => p.brand.toLowerCase() === params.brand.toLowerCase());
    }
    if (params.search) {
      list = searchProducts(params.search);
    }
    if (params.sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (params.sort === 'reviews' || params.sort === 'bestseller') {
      list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    if (params.limit) {
      list = list.slice(0, params.limit);
    }
    return list;
  },

  // 6. Single Product
  async getProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.product) return data.product;
      }
    } catch (e) {
      console.warn(`API /api/products/${id} fallback:`, e.message);
    }
    return getProductById(id) || null;
  },

  // 7. Validate Coupon
  async validateCoupon(code, subtotal = 0) {
    try {
      const res = await fetch(`${API_BASE}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      const clean = (code || '').trim().toUpperCase();
      if (clean === 'OLIVER10') {
        return {
          success: true,
          coupon: { code: 'OLIVER10', description: '10% Off Sitewide', discountAmount: Math.round(subtotal * 0.10) }
        };
      }
      return { success: false, message: `Invalid coupon '${code}'` };
    }
  },

  // 8. Create Order
  async createOrder(orderPayload) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (data.success && data.order) {
        try {
          const existing = JSON.parse(localStorage.getItem('oliver_orders') || '[]');
          existing.unshift(data.order);
          localStorage.setItem('oliver_orders', JSON.stringify(existing));
        } catch (e) {}
        return data.order;
      }
    } catch (e) {
      console.error('API /api/orders failed, using fallback generator:', e);
    }

    const orderId = `OLIVER-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Order Placed',
      customer: orderPayload.customer,
      shippingAddress: orderPayload.shippingAddress,
      paymentMethod: orderPayload.paymentMethod || 'UPI',
      items: orderPayload.items || [],
      pricing: {
        subtotal: orderPayload.subtotal,
        discount: orderPayload.discount,
        shipping: orderPayload.shipping,
        total: orderPayload.total
      }
    };
    return newOrder;
  },

  // 9. Get Order By ID (Real-time tracking)
  async getOrder(id) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.order) return data.order;
      }
    } catch (e) {}

    try {
      const existing = JSON.parse(localStorage.getItem('oliver_orders') || '[]');
      const found = existing.find(o => o.id === id);
      if (found) return found;
    } catch (e) {}

    return null;
  },

  // 10. Static Page Content
  async getPage(slug) {
    try {
      const res = await fetch(`${API_BASE}/pages/${slug}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.page) return data.page;
      }
    } catch (e) {}
    return null;
  },

  // 11. Contact Inquiry
  async submitContact(payload) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  // 12. Newsletter
  async subscribeNewsletter(email) {
    const res = await fetch(`${API_BASE}/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  }
};
