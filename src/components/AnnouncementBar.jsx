import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, Zap, PhoneCall } from 'lucide-react';

export default function AnnouncementBar() {
  const [activeIdx, setActiveIdx] = useState(0);

  const announcements = [
    { icon: <Truck size={13} className="inline-icon" />, text: "Free Delivery on Orders Above ₹1,999" },
    { icon: <ShieldCheck size={13} className="inline-icon" />, text: "100% Genuine Sports Nutrition • Importer Certified" },
    { icon: <Zap size={13} className="inline-icon" />, text: "Express Delivery Available • Dispatched in 24h" },
    { icon: <PhoneCall size={13} className="inline-icon" />, text: "Need Help? +91 7708688023", href: "tel:+917708688023" }
  ];

  // Rotate single announcement smoothly on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % announcements.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <aside className="announcement-bar">
      <div className="announcement-container">
        {/* Desktop View: Clean horizontal items */}
        <div className="announcement-items-row desktop-only-announcements">
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

        {/* Mobile View: Strictly single-row rotating message (no line wrapping, height 32px) */}
        <div className="announcement-mobile-rotating mobile-only-announcements">
          <div className="announcement-mobile-item fade-in" key={activeIdx}>
            {announcements[activeIdx].icon}
            {announcements[activeIdx].href ? (
              <a href={announcements[activeIdx].href} className="mobile-announcement-link">
                {announcements[activeIdx].text}
              </a>
            ) : (
              <span>{announcements[activeIdx].text}</span>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
