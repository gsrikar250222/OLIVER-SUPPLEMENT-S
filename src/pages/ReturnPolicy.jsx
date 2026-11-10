import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="policy-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <span className="current">Return & Refund Policy</span>
      </nav>

      <div className="policy-content-card">
        <span className="policy-tag"><RotateCcw size={14} /> SEAL INTEGRITY & ATHLETE SATISFACTION</span>
        <h1 className="policy-title">RETURN, REPLACEMENT & REFUND POLICY</h1>
        <p className="policy-updated">Last Updated: November 2026</p>

        <section className="policy-section">
          <h2>1. 14-Day Replacement Guarantee</h2>
          <p>
            We take immense pride in the 100% genuine quality of our sports nutrition catalog. If your order arrives with broken seals, manufacturing defects, missing accessories (such as shaker cups), or transit damage, you are entitled to a <strong>100% free immediate replacement or full refund within 14 days of delivery</strong>.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Eligibility Criteria for Returns</h2>
          <ul>
            <li>The container must be unopened with the original manufacturer induction seal or outer shrink sleeve intact (unless reporting a verified manufacturer quality defect).</li>
            <li>All original holographic brand importer stickers and scratch codes must be untampered.</li>
            <li>The original GST tax invoice and brand packaging must be presented.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Non-Returnable Scenarios</h2>
          <p>
            Due to strict health and safety standards governed by FSSAI regulations, sports supplements that have been unsealed, partially consumed, or stored in improper heat/moisture conditions cannot be returned for subjective reasons (such as personal flavor preference changes).
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Reverse Pickup & Inspection</h2>
          <p>
            Once you submit a replacement request with a photo/video via email (returns@oliversupplements.com) or WhatsApp (+91 98888 01234), we will dispatch our courier partner to collect the item from your doorstep at zero charge to you.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Refund Timelines</h2>
          <p>
            Refunds are initiated within 24 hours of package arrival at our facility. Prepaid orders (UPI, Card, NetBanking) will reflect back in your source account within 3 to 5 business days. Cash on Delivery (COD) refunds will be transferred via direct NEFT/IMPS bank transfer or instant UPI payment to your mobile number.
          </p>
        </section>
      </div>
    </div>
  );
}

