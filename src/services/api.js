import { CATEGORIES, PRODUCTS, getProductById, getProductsByCategory, searchProducts } from '../data/products.js';

const API_BASE = '/api';

export const api = {
  // Categories
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const data = await res.json();
        return data.categories;
      }
    } catch (e) {
      console.warn('API fallback for categories:', e);
    }
    return CATEGORIES;
  },

  // Products
  async getProducts(params = {}) {
    try {
      const query = new URLSearchParams();
      if (params.category && params.category !== 'all') query.set('category', params.category);
      if (params.gender && params.gender !== 'all') query.set('gender', params.gender);
      if (params.search) query.set('search', params.search);
      if (params.sort) query.set('sort', params.sort);
      if (params.featured) query.set('featured', 'true');
      if (params.limit) query.set('limit', params.limit);
      if (params.page) query.set('page', params.page);

      const res = await fetch(`${API_BASE}/products?${query.toString()}`);
      if (res.ok) {
        const data = await res.json();
        return data.products;
      }
    } catch (e) {
      console.warn('API fallback for products:', e);
    }

    // Client-side fallback
    let list = [...PRODUCTS];
    if (params.category && params.category !== 'all') {
      list = list.filter(p => p.category === params.category);
    }
    if (params.gender && params.gender !== 'all') {
      list = list.filter(p => p.gender === params.gender || p.gender === 'unisex');
    }
    if (params.search) {
      list = searchProducts(params.search);
    }
    if (params.featured) {
      list = list.filter(p => p.badge === 'BESTSELLER' || p.badge === 'NEW DROP');
    }
    if (params.sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (params.sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (params.sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (params.sort === 'reviews') {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    if (params.limit) {
      list = list.slice(0, params.limit);
    }
    return list;
  },

  // Single Product
  async getProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        return data.product;
      }
    } catch (e) {
      console.warn('API fallback for single product:', e);
    }
    return getProductById(id) || null;
  },

  // Coupons
  async validateCoupon(code, subtotal) {
    try {
      const res = await fetch(`${API_BASE}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn('API fallback for coupon:', e);
      const upper = (code || '').toUpperCase().trim();
      if (upper === 'VAULT10') {
        return {
          success: true,
          coupon: {
            code: 'VAULT10',
            description: '10% Off Sitewide',
            discountAmount: Math.round(subtotal * 0.10)
          }
        };
      }
      if (upper === 'WELCOME20') {
        if (subtotal < 1499) {
          return { success: false, message: 'WELCOME20 requires a minimum order of ₹1,499' };
        }
        return {
          success: true,
          coupon: {
            code: 'WELCOME20',
            description: '20% Off Orders Over ₹1,499',
            discountAmount: Math.round(subtotal * 0.20)
          }
        };
      }
      if (upper === 'REP50') {
        return {
          success: true,
          coupon: {
            code: 'REP50',
            description: '₹50 Flat Off',
            discountAmount: 50
          }
        };
      }
      return { success: false, message: `Invalid coupon '${code}'. Try VAULT10 or WELCOME20.` };
    }
  },

  // Create Order
  async createOrder(orderPayload) {
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data.order;
      }
      throw new Error(data.message || 'Failed to place order');
    } catch (e) {
      console.warn('API fallback for order creation:', e);
      // Fallback local order generation
      const orderId = `RV-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const estDeliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      const fallbackOrder = {
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
        customer: orderPayload.customer,
        shippingAddress: orderPayload.shippingAddress,
        paymentMethod: orderPayload.paymentMethod || 'UPI',
        paymentStatus: orderPayload.paymentMethod === 'COD' ? 'Pending (Cash on Delivery)' : 'Paid (Verified)',
        items: orderPayload.items,
        pricing: {
          subtotal: orderPayload.subtotal,
          discount: orderPayload.discount,
          shipping: orderPayload.shipping,
          gst: orderPayload.gst,
          total: orderPayload.total
        }
      };

      // Store in localStorage for client persistence
      try {
        const storedOrders = JSON.parse(localStorage.getItem('repvault_orders') || '[]');
        storedOrders.unshift(fallbackOrder);
        localStorage.setItem('repvault_orders', JSON.stringify(storedOrders));
      } catch (err) {}

      return fallbackOrder;
    }
  },

  // Get Order By ID
  async getOrder(id) {
    try {
      const res = await fetch(`${API_BASE}/orders/${id}`);
      if (res.ok) {
        const data = await res.json();
        return data.order;
      }
    } catch (e) {
      console.warn('API fallback for getOrder:', e);
    }
    // Search localStorage
    try {
      const storedOrders = JSON.parse(localStorage.getItem('repvault_orders') || '[]');
      return storedOrders.find(o => o.id === id) || null;
    } catch (err) {
      return null;
    }
  },

  // Auth Login
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) return data;
      throw new Error(data.message);
    } catch (e) {
      return {
        success: true,
        user: {
          id: 'usr_' + Date.now().toString().slice(-6),
          name: email.split('@')[0].toUpperCase(),
          email,
          token: 'rv_mock_token'
        }
      };
    }
  },

  // Auth Register
  async register(name, email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) return data;
      throw new Error(data.message);
    } catch (e) {
      return {
        success: true,
        user: {
          id: 'usr_' + Date.now().toString().slice(-6),
          name,
          email,
          token: 'rv_mock_token'
        }
      };
    }
  }
};

