const API_BASE = '/api/admin';

function getAuthHeader() {
  const token = localStorage.getItem('oliver_admin_token') || sessionStorage.getItem('oliver_admin_token') || '';
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...(options.headers || {})
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    localStorage.removeItem('oliver_admin_token');
    localStorage.removeItem('oliver_admin_user');
    sessionStorage.removeItem('oliver_admin_token');
    sessionStorage.removeItem('oliver_admin_user');
    if (!window.location.pathname.includes('/admin/login')) {
      window.location.href = '/admin/login?session_expired=1';
    }
  }

  if (!res.ok) {
    throw new Error(data.message || `API error ${res.status}`);
  }

  return data;
}

export const adminApi = {
  // Auth
  async login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async getMe() {
    return request('/auth/me');
  },

  async changePassword(oldPassword, newPassword) {
    return request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword })
    });
  },

  logout() {
    localStorage.removeItem('oliver_admin_token');
    localStorage.removeItem('oliver_admin_user');
    sessionStorage.removeItem('oliver_admin_token');
    sessionStorage.removeItem('oliver_admin_user');
  },

  // Dashboard Stats
  async getDashboardStats() {
    return request('/dashboard/stats');
  },

  // Activity Logs
  async getActivityLogs() {
    return request('/activity-logs');
  },

  // Admin Users
  async getUsers() {
    return request('/users');
  },
  async createUser(data) {
    return request('/users', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateUser(id, data) {
    return request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async deleteUser(id) {
    return request(`/users/${id}`, { method: 'DELETE' });
  },

  // Homepage Manager
  async getHomepageConfig() {
    return request('/homepage');
  },
  async updateHomepageConfig(config) {
    return request('/homepage', { method: 'PUT', body: JSON.stringify(config) });
  },

  // Website Settings
  async getSettings() {
    return request('/settings');
  },
  async updateSettings(settings) {
    return request('/settings', { method: 'PUT', body: JSON.stringify(settings) });
  },

  // Products
  async getProducts() {
    return request('/products');
  },
  async createProduct(productData) {
    return request('/products', { method: 'POST', body: JSON.stringify(productData) });
  },
  async updateProduct(id, productData) {
    return request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) });
  },
  async deleteProduct(id) {
    return request(`/products/${id}`, { method: 'DELETE' });
  },

  // Categories
  async getCategories() {
    return request('/categories');
  },
  async createCategory(catData) {
    return request('/categories', { method: 'POST', body: JSON.stringify(catData) });
  },
  async updateCategory(id, catData) {
    return request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(catData) });
  },
  async deleteCategory(id) {
    return request(`/categories/${id}`, { method: 'DELETE' });
  },

  // Brands
  async getBrands() {
    return request('/brands');
  },
  async createBrand(brandData) {
    return request('/brands', { method: 'POST', body: JSON.stringify(brandData) });
  },
  async updateBrand(id, brandData) {
    return request(`/brands/${id}`, { method: 'PUT', body: JSON.stringify(brandData) });
  },
  async deleteBrand(id) {
    return request(`/brands/${id}`, { method: 'DELETE' });
  },

  // Inventory
  async getInventory() {
    return request('/inventory');
  },
  async adjustStock(productId, newStock, reason) {
    return request('/inventory/adjust', {
      method: 'POST',
      body: JSON.stringify({ productId, newStock, reason })
    });
  },

  // Orders
  async getOrders() {
    return request('/orders');
  },
  async updateOrderStatus(id, status) {
    return request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  },
  async updateOrderTracking(id, trackingData) {
    return request(`/orders/${id}/tracking`, {
      method: 'PUT',
      body: JSON.stringify(trackingData)
    });
  },
  async addOrderNote(id, note) {
    return request(`/orders/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note })
    });
  },

  // Customers
  async getCustomers() {
    return request('/customers');
  },
  async updateCustomer(id, data) {
    return request(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },

  // Coupons
  async getCoupons() {
    return request('/coupons');
  },
  async createCoupon(data) {
    return request('/coupons', { method: 'POST', body: JSON.stringify(data) });
  },
  async updateCoupon(id, data) {
    return request(`/coupons/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  },
  async deleteCoupon(id) {
    return request(`/coupons/${id}`, { method: 'DELETE' });
  },

  // Media Library
  async getMedia() {
    return request('/media');
  },
  async uploadMedia(filename, base64Data, folder) {
    return request('/media/upload', {
      method: 'POST',
      body: JSON.stringify({ filename, base64Data, folder })
    });
  },
  async deleteMedia(id) {
    return request(`/media/${id}`, { method: 'DELETE' });
  },

  // Pages & CMS
  async getPages() {
    return request('/pages');
  },
  async updatePage(slug, pageData) {
    return request(`/pages/${slug}`, { method: 'PUT', body: JSON.stringify(pageData) });
  },

  // Reviews
  async getReviews() {
    return request('/reviews');
  },
  async updateReviewStatus(id, status) {
    return request(`/reviews/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
  },

  // Inquiries & Subscribers
  async getInquiries() {
    return request('/inquiries');
  },
  async getSubscribers() {
    return request('/subscribers');
  }
};
