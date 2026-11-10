import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Lock, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside className="announcement-bar">
      <div className="announcement-container">
        <div className="announcement-left">
          <span className="announcement-item highlight-seal">
            <ShieldCheck size={13} className="inline-icon pulse-red" />
            100% GENUINE SUPPLEMENTS &bull; DIRECT BRAND IMPORTERS
          </span>
          <span className="announcement-divider">|</span>
          <span className="announcement-item">
            <Truck size={13} className="inline-icon" />
            FREE EXPRESS SHIPPING OVER ₹999 &bull; ALL-INDIA DISPATCH
          </span>
          <span className="announcement-divider">|</span>
          <span className="announcement-item promo-code">
            CODE: <strong>OLIVER10</strong> FOR 10% OFF
          </span>
        </div>
        <div className="announcement-right">
          <Link to="/track-order" className="announcement-link">
            Track Order
          </Link>
          <span className="announcement-divider">|</span>
          <Link to="/faq" className="announcement-link">
            Authenticity Check
          </Link>
          <span className="announcement-divider">|</span>
          <Link to="/contact" className="announcement-link hotline">
            <PhoneCall size={12} className="inline-icon" /> Support: +91 98888 01234
          </Link>
        </div>
      </div>
    </aside>
  );
}
