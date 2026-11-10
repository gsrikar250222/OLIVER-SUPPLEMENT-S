import { CATEGORIES, PRODUCTS, getProductById, getProductsByCategory, searchProducts } from '../data/products.js';

export const api = {
  // Categories
  async getCategories() {
    return CATEGORIES;
  },

  // Products
  async getProducts(params = {}) {
    let list = [...PRODUCTS];
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
    } else if (params.sort === 'reviews') {
      list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    } else if (params.sort === 'bestseller') {
      list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    if (params.limit) {
      list = list.slice(0, params.limit);
    }
    return list;
  },

  // Single Product
  async getProduct(id) {
    return getProductById(id) || null;
  },

  // Validate Coupon
  async validateCoupon(code, subtotal = 0) {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'OLIVER10') {
      return {
        success: true,
        coupon: {
          code: 'OLIVER10',
          description: '10% Off Sports Nutrition',
          discountAmount: Math.round(subtotal * 0.10)
        }
      };
    }
    if (clean === 'FUEL20') {
      if (subtotal < 4999) {
        return { success: false, message: 'FUEL20 requires a minimum cart subtotal of ₹4,999' };
      }
      return {
        success: true,
        coupon: {
          code: 'FUEL20',
          description: '20% Off Orders over ₹4,999',
          discountAmount: Math.round(subtotal * 0.20)
        }
      };
    }
    if (clean === 'FIRSTORDER') {
      return {
        success: true,
        coupon: {
          code: 'FIRSTORDER',
          description: 'Flat ₹300 Off First Purchase',
          discountAmount: Math.min(300, subtotal)
        }
      };
    }
    return { success: false, message: `Invalid coupon '${code}'. Try OLIVER10 or FIRSTORDER.` };
  },

  // Create Order
  async createOrder(orderPayload) {
    const orderId = `OLIVER-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const estDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Order Confirmed & Verified',
      statusTimeline: [
        { status: 'Order Confirmed', date: new Date().toLocaleString('en-IN'), completed: true },
        { status: 'Importer Hologram & Batch Verification', date: 'In progress', completed: true },
        { status: 'Dispatched from Temperature Controlled Hub', date: 'Expected within 24 hours', completed: false },
        { status: 'Out for Delivery', date: 'Expected by ' + estDeliveryDate, completed: false },
        { status: 'Delivered with Seal Intact', date: estDeliveryDate, completed: false }
      ],
      estimatedDelivery: estDeliveryDate,
      customer: orderPayload.customer,
      shippingAddress: orderPayload.shippingAddress,
      paymentMethod: orderPayload.paymentMethod || 'UPI',
      paymentStatus: orderPayload.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (COD)' : 'Paid Online (Verified)',
      items: orderPayload.items || [],
      pricing: {
        subtotal: orderPayload.subtotal,
        discount: orderPayload.discount,
        shipping: orderPayload.shipping,
        total: orderPayload.total
      }
    };

    // Save to local storage orders history
    try {
      const existing = JSON.parse(localStorage.getItem('oliver_orders') || '[]');
      existing.unshift(newOrder);
      localStorage.setItem('oliver_orders', JSON.stringify(existing));
    } catch (e) {
      console.error('Error saving order to localStorage:', e);
    }

    return newOrder;
  },

  // Get Order By ID
  async getOrder(id) {
    try {
      const existing = JSON.parse(localStorage.getItem('oliver_orders') || '[]');
      const found = existing.find(o => o.id === id);
      if (found) return found;
    } catch (e) {}

    // Mock fallback if user visited directly
    const estDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    return {
      id: id || 'OLIVER-94281-5501',
      createdAt: new Date().toISOString(),
      status: 'In Transit',
      estimatedDelivery: estDeliveryDate,
      statusTimeline: [
        { status: 'Order Placed', date: 'Yesterday', completed: true },
        { status: 'Batch & Hologram Verified', date: 'Yesterday', completed: true },
        { status: 'Dispatched from Central Warehouse', date: 'Today, 8:30 AM', completed: true },
        { status: 'Out for Delivery', date: 'Tomorrow', completed: false },
        { status: 'Delivered', date: estDeliveryDate, completed: false }
      ],
      customer: { name: 'Rahul Sharma', email: 'rahul.athlete@gmail.com', phone: '+91 98765 43210' },
      shippingAddress: { address: 'Flat 402, Iron Heights, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050' },
      paymentMethod: 'UPI (Google Pay)',
      paymentStatus: 'Paid Online (Verified)',
      items: [
        {
          productId: 'p01',
          name: 'Gold Standard 100% Whey Protein',
          price: 3299,
          quantity: 1,
          weight: '2 kg (4.4 lbs)',
          size: '2 kg (4.4 lbs)',
          flavor: 'Double Rich Chocolate',
          image: '/assets/products/01_whey_protein_gold_standard.jpg'
        }
      ],
      pricing: { subtotal: 3299, discount: 330, shipping: 0, total: 2969 }
    };
  }
};
