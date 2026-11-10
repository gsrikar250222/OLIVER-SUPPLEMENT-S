import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <div className="policy-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <span className="current">Shipping Policy</span>
      </nav>

      <div className="policy-content-card">
        <span className="policy-tag"><Truck size={14} /> FULFILLMENT & LOGISTICS PROTOCOL</span>
        <h1 className="policy-title">SHIPPING & DISPATCH POLICY</h1>
        <p className="policy-updated">Last Updated: November 2026</p>

        <section className="policy-section">
          <h2>1. Dispatch Timelines & Operating Hubs</h2>
          <p>
            At OLIVER SUPPLEMENT SHOP, all orders are fulfilled from our certified temperature-controlled logistics centers located in Mumbai, Bengaluru, and NCR. Orders confirmed before 3:00 PM IST (Monday through Saturday) are packed and dispatched on the same business day.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Delivery Estimates by Region</h2>
          <ul>
            <li><strong>Tier 1 Metro Cities (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Pune, Kolkata):</strong> 24 to 48 Hours.</li>
            <li><strong>Tier 2 Cities & State Capitals:</strong> 2 to 3 Business Days.</li>
            <li><strong>Tier 3 & Regional Towns:</strong> 3 to 5 Business Days.</li>
            <li><strong>North-East & Remote Island Territories:</strong> 5 to 7 Business Days.</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. Shipping Charges & Free Threshold</h2>
          <p>
            We offer <strong>100% FREE INSURED EXPRESS SHIPPING</strong> on all orders with a cart subtotal of <strong>₹999 or higher</strong>. For orders below ₹999, a nominal flat express shipping charge of ₹99 is applied at checkout to cover air freight logistics.
          </p>
        </section>

        <section className="policy-section">
          <h2>4. Temperature & Humidity Preservation</h2>
          <p>
            Sports nutrition products (particularly whey protein isolate, live probiotics, and omega-3 softgels) are sensitive to extreme heat and moisture. Our parcels are packed using multi-layer insulated heavy-corrugate cartons with silica desiccant packs to ensure zero heat spoilage during transit.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Tamper-Evident Security Seals & Inspection</h2>
          <p>
            All parcels leave our facilities sealed with proprietary OLIVER SUPPLEMENT SHOP branded holographic tamper-evident tape. <strong>Athletes are advised to inspect the outer carton prior to sharing delivery OTP with the courier agent.</strong> If the package shows signs of tearing, water damage, or re-taping, decline delivery immediately and contact our support line.
          </p>
        </section>
      </div>
    </div>
  );
}

