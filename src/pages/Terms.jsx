import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function Terms() {
  return (
    <div className="policy-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <span className="current">Terms of Service</span>
      </nav>

      <div className="policy-content-card">
        <span className="policy-tag"><FileText size={14} /> LEGAL & REGULATORY FRAMEWORK</span>
        <h1 className="policy-title">TERMS AND CONDITIONS</h1>
        <p className="policy-updated">Last Updated: November 2026</p>

        <section className="policy-section">
          <h2>1. Introduction & Acceptance</h2>
          <p>
            Welcome to <strong>OLIVER SUPPLEMENT SHOP</strong>. By browsing, accessing, or placing an order through this website, you agree to be bound by these Terms and Conditions in compliance with the Information Technology Act, 2000 and consumer protection guidelines in India.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Product Catalog & Nutritional Accuracy</h2>
          <p>
            All supplement information, serving sizes, ingredients, and nutrition facts published on our website reflect authorized brand manufacturer specifications and FSSAI filings. Dietary supplements are intended to support athletic nutrition and are not intended to diagnose, treat, cure, or prevent any medical condition.
          </p>
        </section>

        <section className="policy-section">
          <h2>3. Authenticity & Importer Representation</h2>
          <p>
            OLIVER SUPPLEMENT SHOP warrants that all products displayed are 100% genuine, procured directly through appointed Indian importers with verifiable manufacturer scratch codes.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Pricing & INR Currency Representation</h2>
          <p>
            All prices are denominated in Indian Rupees (₹ INR) inclusive of all applicable Goods and Services Tax (GST). We reserve the right to revise promotional coupon offers and bundle discounts at our discretion.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Governing Law & Jurisdiction</h2>
          <p>
            These terms and any contracts formed through purchases on this website shall be governed by and construed in accordance with the laws of the Republic of India, subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
}

