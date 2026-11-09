import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Shield, Truck, RotateCcw, Clock } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      {/* Footer Top Value Props */}
      <div className="footer-props-bar">
        <div className="container footer-props-grid">
          <div className="prop-item">
            <Truck size={24} />
            <div>
              <h4>Free Express Shipping</h4>
              <p>On all orders above ₹1,000</p>
            </div>
          </div>
          <div className="prop-item">
            <RotateCcw size={24} />
            <div>
              <h4>7-Day Easy Returns</h4>
              <p>Hassle-free doorstep exchange</p>
            </div>
          </div>
          <div className="prop-item">
            <Shield size={24} />
            <div>
              <h4>100% Authentic Apparel</h4>
              <p>Heavyweight fabrics & premium finish</p>
            </div>
          </div>
          <div className="prop-item">
            <Clock size={24} />
            <div>
              <h4>Fast Dispatch</h4>
              <p>Shipped within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        {/* Col 1: Brand Info */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo-link">
            <img src="/icons/logo-white.svg" alt="REPVAULT" width="200" height="42" />
          </Link>
          <p className="footer-desc">
            Architectural precision meets athletic couture. REPVAULT creates heavyweight oversized gymwear, anatomical compression garments, and tactical performance apparel engineered for the relentless.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <span className="social-pill">IG</span>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <span className="social-pill">YT</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <span className="social-pill">X</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <span className="social-pill">FB</span>
            </a>
          </div>
        </div>

        {/* Col 2: Collections */}
        <div className="footer-col">
          <h4 className="footer-title">COLLECTIONS</h4>
          <ul className="footer-links">
            <li><Link to="/category/oversized">Oversized Streetwear</Link></li>
            <li><Link to="/category/compression">Compression Wear</Link></li>
            <li><Link to="/category/joggers">Joggers & Cargo Tracks</Link></li>
            <li><Link to="/category/t-shirts">Gym T-Shirts & Polos</Link></li>
            <li><Link to="/category/shorts">2-in-1 Training Shorts</Link></li>
            <li><Link to="/category/hoodies">Aesthetic Hoodies & Zip-Ups</Link></li>
            <li><Link to="/category/womens">Women's Activewear</Link></li>
            <li><Link to="/category/accessories">Tactical Backpacks & Caps</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Service */}
        <div className="footer-col">
          <h4 className="footer-title">CUSTOMER CARE</h4>
          <ul className="footer-links">
            <li><Link to="/order-tracking">Track Your Order</Link></li>
            <li><Link to="/returns">Returns & Exchanges</Link></li>
            <li><Link to="/shipping">Shipping Policy</Link></li>
            <li><Link to="/size-guide">Interactive Size Chart</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/faq">Frequently Asked Questions</Link></li>
            <li><Link to="/privacy">Privacy & Terms</Link></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-title">JOIN THE VAULT</h4>
          <p className="newsletter-desc">
            Subscribe to receive private drop alerts, backstage lookbooks, and 10% off your first purchase.
          </p>

          {subscribed ? (
            <div className="newsletter-success">
              <Check size={18} />
              <span>Welcome to the Vault! Check your inbox for code <strong>VAULT10</strong>.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit" aria-label="Subscribe to newsletter">
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          <div className="payment-badges-wrap">
            <span className="payment-badge">UPI</span>
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">RUPAY</span>
            <span className="payment-badge">COD</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} REPVAULT ATHLETIC DIVISION. ALL RIGHTS RESERVED.</p>
          <div className="footer-legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms">Terms of Service</Link>
            <span>•</span>
            <Link to="/shipping">Shipping Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

