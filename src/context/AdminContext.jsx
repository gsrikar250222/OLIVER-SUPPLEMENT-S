import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi.js';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('oliver_admin_user') || sessionStorage.getItem('oliver_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(prev => (prev?.id === prev?.id ? null : prev));
    }, 3500);
  };

  useEffect(() => {
    const token = localStorage.getItem('oliver_admin_token') || sessionStorage.getItem('oliver_admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    adminApi.getMe()
      .then(res => {
        if (res.success && res.user) {
          setAdminUser(res.user);
          localStorage.setItem('oliver_admin_user', JSON.stringify(res.user));
        }
      })
      .catch(() => {
        adminApi.logout();
        setAdminUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password, remember = true) => {
    const res = await adminApi.login(email, password);
    if (res.success && res.token) {
      const storage = remember ? localStorage : sessionStorage;
      storage.setItem('oliver_admin_token', res.token);
      storage.setItem('oliver_admin_user', JSON.stringify(res.user));
      setAdminUser(res.user);
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const logout = () => {
    adminApi.logout();
    setAdminUser(null);
    showToast('Logged out successfully', 'info');
  };

  const can = (permission) => {
    if (!adminUser) return false;
    if (adminUser.role === 'Super Admin') return true;

    const roleMap = {
      'Product Manager': ['products', 'categories', 'brands', 'inventory', 'media'],
      'Content Manager': ['homepage', 'hero', 'pages', 'footer', 'design', 'media', 'seo'],
      'Order Manager': ['orders', 'customers', 'coupons', 'shipping', 'inventory'],
      'Customer Support': ['orders', 'customers', 'reviews', 'inquiries']
    };

    const allowed = roleMap[adminUser.role] || [];
    return allowed.includes(permission);
  };

  return (
    <AdminContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        loading,
        login,
        logout,
        can,
        showToast,
        toastMessage
      }}
    >
      {children}
      {toastMessage && (
        <div className={`admin-global-toast ${toastMessage.type}`}>
          <span>{toastMessage.message}</span>
          <button onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
