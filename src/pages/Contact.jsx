import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Supplement Authenticity & Verification',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-page-wrap">
      {/* Header */}
      <div className="category-hero contact-hero">
        <div className="container category-hero-content">
          <nav className="breadcrumbs light">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <span className="current">Contact Us</span>
          </nav>
          <span className="category-pre-badge">
            <PhoneCall size={14} /> ATHLETE SUPPORT &bull; WE ARE HERE FOR YOU
          </span>
          <h1 className="category-title">GET IN TOUCH WITH OLIVER</h1>
          <p className="category-desc">
            Have questions about supplement authenticity, batch codes, stack recommendations, or order deliveries? Our certified sports nutritionists are available 6 days a week.
          </p>
        </div>
      </div>

      <div className="container section-pad">
        <div className="contact-main-grid">
          {/* Left: Contact Info Cards */}
          <div className="contact-info-col">
            <h2 className="contact-col-title">SUPPORT CHANNELS</h2>
            
            <div className="contact-card-item">
              <div className="contact-icon-bubble">
                <PhoneCall size={22} />
              </div>
              <div>
                <strong>Phone & WhatsApp Support</strong>
                <p className="contact-val">+91 98888 01234 / +91 98888 05678</p>
                <span className="contact-sub">Monday &ndash; Saturday, 9:00 AM &ndash; 8:00 PM IST</span>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-bubble">
                <Mail size={22} />
              </div>
              <div>
                <strong>Email Nutritionists</strong>
                <p className="contact-val">support@oliversupplements.com</p>
                <span className="contact-sub">Average response time: Under 2 hours</span>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-bubble">
                <MapPin size={22} />
              </div>
              <div>
                <strong>Headquarters & Central Dispatch Hub</strong>
                <p className="contact-val">Oliver Sports Nutrition Tower</p>
                <span className="contact-sub">Level 4, Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051</span>
              </div>
            </div>

            <div className="contact-card-item">
              <div className="contact-icon-bubble">
                <ShieldCheck size={22} />
              </div>
              <div>
                <strong>Authenticity Helpdesk</strong>
                <p className="contact-val">verify@oliversupplements.com</p>
                <span className="contact-sub">Send photos of security seals for instant confirmation</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Message Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-card-title">SEND US A MESSAGE</h3>
              <p className="form-card-sub">Fill out the form below and an athlete advisor will contact you promptly.</p>

              {submitted ? (
                <div className="contact-success-state">
                  <CheckCircle2 size={48} className="success-check-icon" />
                  <h4>MESSAGE TRANSMITTED SUCCESSFULLY</h4>
                  <p>Thank you for reaching out, {formData.name}. Our nutrition support desk has received your ticket and will respond within 2 business hours.</p>
                  <button className="btn-secondary mt-20" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form mt-20">
                  <div className="form-grid-2">
                    <div className="form-field">
                      <label>Your Name *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Vikram Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>Your Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="vikram@athlete.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-field">
                      <label>Mobile Number</label>
                      <input 
                        type="tel" 
                        placeholder="9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-field">
                      <label>Inquiry Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="contact-select"
                      >
                        <option value="Supplement Authenticity">Supplement Authenticity Verification</option>
                        <option value="Order Tracking">Order & Courier Dispatch Status</option>
                        <option value="Product Stack Advice">Product & Stack Recommendation</option>
                        <option value="Returns & Exchanges">Returns & Seal Replacement</option>
                        <option value="Wholesale & Gym Partnerships">Gym & Bulk Distribution Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Your Message / Inquiry Details *</label>
                    <textarea 
                      rows={5} 
                      required 
                      placeholder="Please describe your question or issue in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary contact-submit-btn">
                    <Send size={16} /> TRANSMIT MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

