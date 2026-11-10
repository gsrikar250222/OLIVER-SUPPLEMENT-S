import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  Lock, 
  RotateCcw, 
  Mail, 
  PhoneCall, 
  MapPin, 
  Check, 
  ArrowRight,
  Award
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="site-footer">
      {/* Trust & Guarantee Banner */}
      <div className="footer-trust-strip">
        <div className="container">
          <div className="trust-strip-grid">
            <div className="trust-strip-item">
              <ShieldCheck className="trust-icon" size={26} />
              <div>
                <strong>100% GENUINE PRODUCTS</strong>
                <span>Direct brand importer codes & holographic seals</span>
              </div>
            </div>
            <div className="trust-strip-item">
              <Truck className="trust-icon" size={26} />
              <div>
                <strong>LIGHTNING EXPRESS DISPATCH</strong>
                <span>Free delivery across India on orders over ₹999</span>
              </div>
            </div>
            <div className="trust-strip-item">
              <Lock className="trust-icon" size={26} />
              <div>
                <strong>256-BIT SECURE PAYMENTS</strong>
                <span>UPI, RuPay, Cards, Net Banking & Cash on Delivery</span>
              </div>
            </div>
            <div className="trust-strip-item">
              <RotateCcw className="trust-icon" size={26} />
              <div>
                <strong>14-DAY EASY REPLACEMENT</strong>
                <span>Zero hassle seal-intact returns & prompt refunds</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main-content">
        <div className="footer-grid">
          {/* Brand Info & Mission */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-brand-logo">
              <img src="/icons/logo.svg" alt="OLIVER Supplement Shop" height="42" />
            </Link>
            <p className="footer-brand-desc">
              <strong>OLIVER SUPPLEMENT SHOP</strong> is India's definitive sports nutrition and protein destination. We empower athletes, bodybuilders, and fitness enthusiasts with 100% genuine, lab-verified supplements. No counterfeit powders. No compromised formulas. Performance without compromise.
            </p>
            <div className="footer-contact-details">
              <div className="contact-line">
                <MapPin size={15} /> <span>Oliver Sports Nutrition Tower, Mumbai &bull; Bengaluru &bull; Delhi</span>
              </div>
              <div className="contact-line">
                <PhoneCall size={15} /> <span>+91 98888 01234 (Mon-Sat, 9 AM - 8 PM IST)</span>
              </div>
              <div className="contact-line">
                <Mail size={15} /> <span>support@oliversupplements.com</span>
              </div>
            </div>
          </div>

          {/* Supplement Categories */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Sports Nutrition</h4>
            <ul className="footer-links">
              <li><Link to="/category/whey-protein" className="footer-link">Whey Protein Powders</Link></li>
              <li><Link to="/category/whey-isolate" className="footer-link">Whey Protein Isolate</Link></li>
              <li><Link to="/category/mass-gainers" className="footer-link">Mass Gainers</Link></li>
              <li><Link to="/category/creatine" className="footer-link">Creatine Monohydrate</Link></li>
              <li><Link to="/category/pre-workout" className="footer-link">High-Stim Pre-Workouts</Link></li>
              <li><Link to="/category/amino-acids" className="footer-link">BCAA & EAA Amino Acids</Link></li>
              <li><Link to="/category/plant-protein" className="footer-link">Organic Plant Protein</Link></li>
              <li><Link to="/category/protein-bars-snacks" className="footer-link">Protein Bars & Snacks</Link></li>
            </ul>
          </div>

          {/* Health & Brands */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Health & Brands</h4>
            <ul className="footer-links">
              <li><Link to="/category/vitamins-minerals" className="footer-link">Daily Multivitamins</Link></li>
              <li><Link to="/category/fish-oil-omega-3" className="footer-link">Omega-3 Fish Oil</Link></li>
              <li><Link to="/category/healthy-foods" className="footer-link">Peanut Butter & Oats</Link></li>
              <li><Link to="/brands" className="footer-link">All Certified Brands</Link></li>
              <li><Link to="/shop?brand=OLIVER+Pro+Nutrition" className="footer-link">Oliver Pro Series</Link></li>
              <li><Link to="/shop?brand=Optimum+Nutrition" className="footer-link">Optimum Nutrition (ON)</Link></li>
              <li><Link to="/shop?brand=MuscleTech" className="footer-link">MuscleTech</Link></li>
              <li><Link to="/shop?brand=Dymatize" className="footer-link">Dymatize</Link></li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="footer-nav-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li><Link to="/track-order" className="footer-link">Track Your Shipment</Link></li>
              <li><Link to="/account" className="footer-link">My Athlete Account</Link></li>
              <li><Link to="/orders" className="footer-link">Order History</Link></li>
              <li><Link to="/about" className="footer-link">About Oliver Story</Link></li>
              <li><Link to="/contact" className="footer-link">Contact & Support</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ & Authenticity</Link></li>
              <li><Link to="/shipping-policy" className="footer-link">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="footer-link">Returns & Refunds</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter-col">
            <h4 className="footer-heading">Athlete Newsletter</h4>
            <p className="newsletter-desc">
              Subscribe to get exclusive access to supplement flash sales, new formula drops, and clinical training guides.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address..." 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="btn-primary newsletter-btn" aria-label="Subscribe">
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>
            {subscribed && (
              <span className="newsletter-success">
                &check; Welcome to the Oliver Athlete Club! Check your inbox for your 10% coupon.
              </span>
            )}

            <div className="authenticity-stamp">
              <Award size={18} className="stamp-icon" />
              <span>FSSAI LIC NO. 10020021000892 &bull; 100% TESTED</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} <strong>OLIVER SUPPLEMENT SHOP</strong>. All rights reserved. Registered sports nutrition trademark.
          </div>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy</Link>
            <span>&bull;</span>
            <Link to="/terms">Terms</Link>
            <span>&bull;</span>
            <Link to="/shipping-policy">Shipping</Link>
            <span>&bull;</span>
            <Link to="/return-policy">Returns</Link>
            <span>&bull;</span>
            <Link to="/faq">Authenticity Protocol</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
