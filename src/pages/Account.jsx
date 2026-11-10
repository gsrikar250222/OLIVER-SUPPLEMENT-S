import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Award, 
  LogOut, 
  Clock, 
  ArrowRight,
  Zap
} from 'lucide-react';

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  // Load orders from localStorage
  const savedOrders = JSON.parse(localStorage.getItem('oliver_orders') || '[]');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const athleteName = user?.name || 'Rahul Sharma';
  const athleteEmail = user?.email || 'rahul.athlete@gmail.com';

  return (
    <div className="account-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <span className="current">Athlete Profile</span>
      </nav>

      {/* Account Header Hero */}
      <div className="account-hero-card">
        <div className="athlete-avatar-wrap">
          <div className="athlete-avatar">
            <User size={36} />
          </div>
          <div>
            <div className="athlete-tier-badge">
              <Award size={13} /> OLIVER PRO ATHLETE &bull; TIER 1
            </div>
            <h1 className="athlete-name">{athleteName}</h1>
            <p className="athlete-email">{athleteEmail}</p>
          </div>
        </div>

        <button className="btn-secondary logout-btn" onClick={handleLogout}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Metric Tiles */}
      <div className="account-metrics-grid mt-25">
        <div className="acc-metric-card">
          <span className="acc-metric-val">{savedOrders.length}</span>
          <span className="acc-metric-label">Completed Orders</span>
        </div>
        <div className="acc-metric-card">
          <span className="acc-metric-val">{wishlistCount}</span>
          <span className="acc-metric-label">Wishlist Supplements</span>
        </div>
        <div className="acc-metric-card">
          <span className="acc-metric-val">10% OFF</span>
          <span className="acc-metric-label">Active Loyalty Coupon</span>
        </div>
        <div className="acc-metric-card highlight">
          <span className="acc-metric-val">100%</span>
          <span className="acc-metric-label">Authenticity Verified</span>
        </div>
      </div>

      {/* 2-Column Dashboard Sections */}
      <div className="account-sections-grid mt-30">
        {/* Recent Orders Card */}
        <div className="account-card">
          <div className="card-top-header">
            <h3><Package size={18} /> RECENT SUPPLEMENT ORDERS</h3>
            <Link to="/orders" className="card-link">View All ({savedOrders.length}) &rarr;</Link>
          </div>

          {savedOrders.length === 0 ? (
            <div className="empty-orders-note">
              <p>You have not placed any orders yet.</p>
              <Link to="/shop" className="btn-primary btn-sm mt-12">Explore Supplements</Link>
            </div>
          ) : (
            <div className="orders-mini-feed">
              {savedOrders.slice(0, 3).map((ord) => (
                <div key={ord.id} className="order-mini-row">
                  <div>
                    <span className="ord-id"><strong>{ord.id}</strong></span>
                    <span className="ord-date">{ord.createdAt ? new Date(ord.createdAt).toLocaleDateString('en-IN') : 'Recent'}</span>
                    <span className="ord-status-pill">{ord.status || 'Dispatched'}</span>
                  </div>
                  <div className="ord-right">
                    <span className="ord-total">₹{(ord.pricing?.total || ord.total || 3299).toLocaleString('en-IN')}</span>
                    <Link to={`/order-confirmation/${ord.id}`} className="track-link">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Saved Delivery Address Card */}
        <div className="account-card">
          <div className="card-top-header">
            <h3><MapPin size={18} /> PRIMARY DELIVERY ADDRESS</h3>
          </div>

          <div className="saved-address-content">
            <strong>{athleteName}</strong>
            <p>Flat 402, Olympic Heights, Sector 18, Bandra West</p>
            <p>Mumbai, Maharashtra - 400050</p>
            <p className="mt-10">Phone: +91 98765 43210</p>
            <span className="default-badge">DEFAULT ADDRESS</span>
          </div>

          <div className="account-quick-links mt-25">
            <h4>QUICK ATHLETE ACTIONS</h4>
            <div className="quick-action-pills">
              <Link to="/track-order" className="q-pill"><Clock size={14} /> Track Current Shipment</Link>
              <Link to="/wishlist" className="q-pill"><Heart size={14} /> Saved Wishlist</Link>
              <Link to="/faq" className="q-pill"><ShieldCheck size={14} /> Authenticity Check</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

