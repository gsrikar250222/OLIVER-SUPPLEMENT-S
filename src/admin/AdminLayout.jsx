import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  Image as ImageIcon, 
  Menu, 
  FileText, 
  PhoneCall, 
  Package, 
  Layers, 
  Award, 
  Boxes, 
  ShoppingBag, 
  Users, 
  Star, 
  Tag, 
  Mail, 
  Send, 
  FolderOpen, 
  Palette, 
  Search as SearchIcon, 
  Truck, 
  CreditCard, 
  UserCheck, 
  Settings, 
  History, 
  LogOut, 
  ExternalLink, 
  Lock, 
  X, 
  Bell,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';
import { adminApi } from '../services/adminApi.js';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { adminUser, logout, showToast } = useAdmin();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwLoading, setPwLoading] = useState(false);
  const [pwError, setPwError] = useState(null);

  // Grouped Navigation Items matching 25 Modules
  const navSections = [
    {
      group: 'Core',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Activity Logs', path: '/admin/activity-logs', icon: History }
      ]
    },
    {
      group: 'Storefront & CMS',
      items: [
        { name: 'Homepage Manager', path: '/admin/homepage', icon: Home },
        { name: 'Hero & Banners', path: '/admin/hero-banners', icon: ImageIcon },
        { name: 'Pages & Policies', path: '/admin/pages', icon: FileText },
        { name: 'Footer & Contact', path: '/admin/footer', icon: PhoneCall }
      ]
    },
    {
      group: 'Catalog & Inventory',
      items: [
        { name: 'Products', path: '/admin/products', icon: Package },
        { name: 'Categories', path: '/admin/categories', icon: Layers },
        { name: 'Brands', path: '/admin/brands', icon: Award },
        { name: 'Inventory', path: '/admin/inventory', icon: Boxes }
      ]
    },
    {
      group: 'Sales & Fulfillment',
      items: [
        { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
        { name: 'Customers', path: '/admin/customers', icon: Users },
        { name: 'Reviews', path: '/admin/reviews', icon: Star }
      ]
    },
    {
      group: 'Marketing',
      items: [
        { name: 'Coupons & Offers', path: '/admin/coupons', icon: Tag },
        { name: 'Inquiries', path: '/admin/inquiries', icon: Mail },
        { name: 'Newsletter', path: '/admin/subscribers', icon: Send }
      ]
    },
    {
      group: 'Assets & Design',
      items: [
        { name: 'Media Library', path: '/admin/media', icon: FolderOpen },
        { name: 'Design Settings', path: '/admin/design', icon: Palette },
        { name: 'SEO Manager', path: '/admin/seo', icon: SearchIcon }
      ]
    },
    {
      group: 'System & Config',
      items: [
        { name: 'Shipping Settings', path: '/admin/shipping', icon: Truck },
        { name: 'Payment Settings', path: '/admin/payment', icon: CreditCard },
        { name: 'Admin Users & Roles', path: '/admin/users', icon: UserCheck },
        { name: 'General Settings', path: '/admin/settings', icon: Settings }
      ]
    }
  ];

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPwError(null);
    setPwLoading(true);
    try {
      await adminApi.changePassword(oldPassword, newPassword);
      showToast('Admin password updated successfully', 'success');
      setPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setPwError(err.message || 'Failed to update password');
    } finally {
      setPwLoading(false);
    }
  };

  const currentPath = location.pathname;
  let activeTitle = 'Dashboard';
  navSections.forEach(g => {
    g.items.forEach(it => {
      if (currentPath === it.path) activeTitle = it.name;
    });
  });

  return (
    <div className="admin-root-wrap">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-brand-link">
            <img src="/icons/logo.svg" alt="OLIVER" />
            <div className="admin-brand-text">
              <span className="admin-brand-title">OLIVER CONTROL</span>
              <span className="admin-brand-badge">{adminUser?.role || 'Admin'}</span>
            </div>
          </Link>
          <button 
            className="admin-icon-btn" 
            style={{ display: mobileSidebarOpen ? 'flex' : 'none' }}
            onClick={() => setMobileSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Nav Search */}
        <div className="admin-nav-search">
          <div className="admin-nav-search-wrap">
            <SearchIcon size={14} />
            <input 
              type="text"
              placeholder="Search 25 modules..."
              className="admin-nav-search-input"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Nav Items Grouped */}
        <nav className="admin-sidebar-nav">
          {navSections.map((group) => {
            const filteredItems = group.items.filter(it => 
              it.name.toLowerCase().includes(navSearch.toLowerCase())
            );
            if (filteredItems.length === 0) return null;

            return (
              <div key={group.group} className="admin-nav-group">
                <div className="admin-nav-group-title">{group.group}</div>
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`admin-nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => setMobileSidebarOpen(false)}
                    >
                      <Icon size={17} />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* User Pill & Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-pill">
            <div className="admin-user-avatar">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">{adminUser?.name || 'Administrator'}</span>
              <span className="admin-user-role">{adminUser?.role || 'Staff'}</span>
            </div>
          </div>
          <button 
            className="admin-logout-btn" 
            onClick={() => { logout(); navigate('/admin/login'); }}
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header Bar */}
        <header className="admin-top-bar">
          <div className="admin-top-left">
            <button 
              className="admin-mobile-menu-toggle" 
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open Navigation"
            >
              <Menu size={22} />
            </button>
            <div className="admin-page-breadcrumb">
              <span>Admin</span>
              <ChevronRight size={14} />
              <strong>{activeTitle}</strong>
            </div>
          </div>

          <div className="admin-top-right">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="admin-storefront-btn"
              title="Open Live Customer Storefront"
            >
              <span>View Storefront</span>
              <ExternalLink size={14} />
            </a>

            <button 
              className="admin-icon-btn" 
              onClick={() => setPasswordModalOpen(true)} 
              title="Change Password"
            >
              <Lock size={16} />
            </button>
          </div>
        </header>

        {/* Viewport for Active Component */}
        <main className="admin-content-viewport">
          {children}
        </main>
      </div>

      {/* Password Change Modal */}
      {passwordModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setPasswordModalOpen(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">Change Administrator Password</h3>
              <button className="admin-icon-btn" onClick={() => setPasswordModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handlePasswordChange}>
              <div className="admin-modal-body">
                {pwError && (
                  <div className="admin-login-alert error" style={{ marginBottom: '16px' }}>
                    {pwError}
                  </div>
                )}
                <div className="admin-form-group">
                  <label className="admin-form-label">Current Password</label>
                  <input
                    type="password"
                    required
                    className="admin-text-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">New Password (min. 8 characters)</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="admin-text-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-modal-footer">
                <button 
                  type="button" 
                  className="admin-secondary-btn" 
                  onClick={() => setPasswordModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="admin-primary-btn" 
                  disabled={pwLoading}
                >
                  {pwLoading ? 'Updating...' : 'Save New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
