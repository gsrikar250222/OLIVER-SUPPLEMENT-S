import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/">
              <img src="/icons/logo.svg" alt="REPVAULT" height="34" />
            </Link>
            <p>
              Engineered performance apparel crafted for high-output athletes. Designed with zero compromises on fabric resilience, muscle support, and athletic movement.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '1px' }}>
              REPVAULT ATHLETICS INC.
            </div>
          </div>

          {/* Men's Links */}
          <div>
            <h4 className="footer-heading">Shop Men's</h4>
            <ul className="footer-links">
              <li><Link to="/category/oversized" className="footer-link">Oversized Streetwear</Link></li>
              <li><Link to="/category/compression" className="footer-link">Compression Tech</Link></li>
              <li><Link to="/category/t-shirts" className="footer-link">T-Shirts & Polos</Link></li>
              <li><Link to="/category/shorts" className="footer-link">Performance Shorts</Link></li>
              <li><Link to="/category/joggers" className="footer-link">Joggers & Tracks</Link></li>
              <li><Link to="/category/training" className="footer-link">Ironclad Training</Link></li>
            </ul>
          </div>

          {/* Women's Links */}
          <div>
            <h4 className="footer-heading">Shop Women's</h4>
            <ul className="footer-links">
              <li><Link to="/category/womens" className="footer-link">High-Rise Sculpt Leggings</Link></li>
              <li><Link to="/category/womens" className="footer-link">Seamless Sports Bras</Link></li>
              <li><Link to="/category/hoodies" className="footer-link">Aesthetic Crop Zip-Ups</Link></li>
              <li><Link to="/category/accessories" className="footer-link">Backpacks & Caps</Link></li>
              <li><Link to="/shop?sort=price-low" className="footer-link" style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>50% Off Flash Sale</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="footer-heading">Support & Help</h4>
            <ul className="footer-links">
              <li><Link to="/order-tracking" className="footer-link">Track Your Order</Link></li>
              <li><Link to="/returns" className="footer-link">7-Day Free Exchange</Link></li>
              <li><Link to="/shipping" className="footer-link">Shipping Policy</Link></li>
              <li><Link to="/contact" className="footer-link">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} REPVAULT Athletics Inc. All rights reserved. Precision-Engineered Performance Apparel.
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>100% Secure Checkout</span>
            <span>•</span>
            <span>UPI / NetBanking / Cards / COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
