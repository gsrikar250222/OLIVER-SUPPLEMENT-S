import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Zap, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <aside className="announcement-bar">
      <div className="announcement-container">
        <div className="announcement-items-row">
          <span className="announcement-pill-item">
            <Truck size={13} className="inline-icon" />
            Free Delivery on Orders Above ₹1,999
          </span>
          <span className="announcement-pill-item">
            <ShieldCheck size={13} className="inline-icon" />
            100% Genuine Products
          </span>
          <span className="announcement-pill-item">
            <Zap size={13} className="inline-icon" />
            Express Delivery Available
          </span>
          <a href="tel:+917708688023" className="announcement-pill-item hotline">
            <PhoneCall size={13} className="inline-icon" />
            Need Help? <strong>+91 7708688023</strong>
          </a>
        </div>
      </div>
    </aside>
  );
}
