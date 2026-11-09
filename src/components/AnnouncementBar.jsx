import React from 'react';
import { Link } from 'react-router-dom';

export default function AnnouncementBar() {
  return (
    <aside className="announcement-bar">
      <div className="announcement-container">
        <div className="announcement-left">
          <span className="announcement-item">
            <span className="pulse-dot"></span>
            FREE EXPRESS SHIPPING ON ORDERS OVER ₹1,000
          </span>
          <span className="announcement-divider">|</span>
          <span className="announcement-item">COD AVAILABLE ALL-INDIA</span>
          <span className="announcement-divider">|</span>
          <span className="announcement-item highlight">USE CODE: VAULT10 FOR 10% OFF</span>
        </div>
        <div className="announcement-right">
          <Link to="/order-tracking" className="announcement-link">Track Order</Link>
          <span className="announcement-divider">|</span>
          <Link to="/contact" className="announcement-link">Help & Returns</Link>
        </div>
      </div>
    </aside>
  );
}

