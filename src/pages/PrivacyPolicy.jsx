import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, Eye } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="policy-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <span className="current">Privacy Policy</span>
      </nav>

      <div className="policy-content-card">
        <span className="policy-tag"><Lock size={14} /> DATA SECURITY & PRIVACY PROTOCOL</span>
        <h1 className="policy-title">PRIVACY POLICY</h1>
        <p className="policy-updated">Last Updated: November 2026</p>

        <section className="policy-section">
          <h2>1. Data Collection & Athlete Information</h2>
          <p>
            OLIVER SUPPLEMENT SHOP collects customer contact details (name, email address, telephone number), shipping destinations, and order transaction records solely to process sports supplement purchases, generate GST tax invoices, and transmit courier tracking updates.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Zero Third-Party Monetization Guarantee</h2>
          <p>
            We do not sell, rent, or trade your personal health, fitness, or contact information to third-party telemarketers or advertisers. Your data is strictly encrypted using industry-standard 256-bit AES protocols.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Payment Security & Tokenization</h2>
          <p>
            We do not store your credit/debit card numbers, CVV codes, or UPI PINs on our servers. All financial transactions are processed securely through RBI-licensed payment gateways (Razorpay, Cashfree, Paytm) compliant with PCI-DSS Level 1 specifications.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Cookies & Nutrition Calculator State</h2>
          <p>
            We utilize functional cookies to remember your shopping cart items, wishlist favorites, and daily protein calculator values across browser sessions. You may modify your cookie preferences through your individual browser settings at any time.
          </p>
        </section>
      </div>
    </div>
  );
}

