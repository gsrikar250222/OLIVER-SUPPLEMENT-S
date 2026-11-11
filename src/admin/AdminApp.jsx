import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext.jsx';
import AdminLayout from './AdminLayout.jsx';
import AdminLogin from './AdminLogin.jsx';

// Pages
import DashboardHome from './pages/DashboardHome.jsx';
import HomepageManager from './pages/HomepageManager.jsx';
import ProductsManager from './pages/ProductsManager.jsx';
import CategoriesManager from './pages/CategoriesManager.jsx';
import BrandsManager from './pages/BrandsManager.jsx';
import InventoryManager from './pages/InventoryManager.jsx';
import OrdersManager from './pages/OrdersManager.jsx';
import CustomersManager from './pages/CustomersManager.jsx';
import CouponsManager from './pages/CouponsManager.jsx';
import MediaManager from './pages/MediaManager.jsx';
import PagesManager from './pages/PagesManager.jsx';
import SettingsManager from './pages/SettingsManager.jsx';
import UsersManager from './pages/UsersManager.jsx';
import ActivityLogsManager from './pages/ActivityLogsManager.jsx';
import ReviewsManager from './pages/ReviewsManager.jsx';
import InquiriesManager from './pages/InquiriesManager.jsx';
import SubscribersManager from './pages/SubscribersManager.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAdmin();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090909', color: '#fff' }}>
        Authenticating Administrator...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function AdminApp() {
  const { isAuthenticated } = useAdmin();

  return (
    <Routes>
      <Route 
        path="/admin/login" 
        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} 
      />
      <Route 
        path="login" 
        element={isAuthenticated ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin />} 
      />

      <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
      <Route path="/admin/homepage" element={<ProtectedRoute><HomepageManager /></ProtectedRoute>} />
      <Route path="/admin/hero-banners" element={<ProtectedRoute><HomepageManager /></ProtectedRoute>} />
      <Route path="/admin/products" element={<ProtectedRoute><ProductsManager /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute><CategoriesManager /></ProtectedRoute>} />
      <Route path="/admin/brands" element={<ProtectedRoute><BrandsManager /></ProtectedRoute>} />
      <Route path="/admin/inventory" element={<ProtectedRoute><InventoryManager /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute><OrdersManager /></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute><CustomersManager /></ProtectedRoute>} />
      <Route path="/admin/coupons" element={<ProtectedRoute><CouponsManager /></ProtectedRoute>} />
      <Route path="/admin/media" element={<ProtectedRoute><MediaManager /></ProtectedRoute>} />
      <Route path="/admin/pages" element={<ProtectedRoute><PagesManager /></ProtectedRoute>} />
      <Route path="/admin/footer" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
      <Route path="/admin/shipping" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
      <Route path="/admin/payment" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
      <Route path="/admin/design" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
      <Route path="/admin/seo" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute><SettingsManager /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><UsersManager /></ProtectedRoute>} />
      <Route path="/admin/activity-logs" element={<ProtectedRoute><ActivityLogsManager /></ProtectedRoute>} />
      <Route path="/admin/reviews" element={<ProtectedRoute><ReviewsManager /></ProtectedRoute>} />
      <Route path="/admin/inquiries" element={<ProtectedRoute><InquiriesManager /></ProtectedRoute>} />
      <Route path="/admin/subscribers" element={<ProtectedRoute><SubscribersManager /></ProtectedRoute>} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}
