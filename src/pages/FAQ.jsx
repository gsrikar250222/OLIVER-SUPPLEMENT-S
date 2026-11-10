import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
  {
    q: "How do I verify that my supplement is 100% genuine and not counterfeit?",
    a: "Every product sold on Oliver Supplement Shop features an authentic holographic security sticker with a scratch-off area revealing a unique 16-digit verification code. You can verify this code directly on the official brand manufacturer website (e.g., authenticon.in for Optimum Nutrition, verify.muscletech.com for MuscleTech). Furthermore, your package includes an official GST tax invoice stating the manufacturer batch number matching the bottom of your tub."
  },
  {
    q: "Who are your authorized brand importers?",
    a: "We procure exclusively through the sole authorized Indian brand importers appointed by global brands: Glanbia Performance Nutrition (ON, BSN), Bright Commodities (Dymatize, Rule 1), Iovate Health Sciences (MuscleTech), and Nutrabolt (Cellucor). We never purchase from gray-market resellers or parallel import channels."
  },
  {
    q: "What is the difference between Whey Protein Concentrate and Whey Protein Isolate?",
    a: "Whey Protein Concentrate contains ~80% protein along with small amounts of naturally occurring milk fats, carbs, and lactose. Whey Protein Isolate undergoes additional cross-flow micro-filtration to strip away almost all fat and lactose, yielding 90%+ pure protein. If you are lactose sensitive or in a strict cutting/shredding phase, Whey Isolate is the superior choice."
  },
  {
    q: "Does Creatine Monohydrate require a loading phase?",
    a: "A loading phase (20g daily split into 4 doses for 5-7 days) saturates muscular phosphocreatine stores faster (within 1 week). However, you can also take 3g to 5g daily consistently without a loading phase, which will achieve complete muscle saturation within 3 to 4 weeks with zero digestive discomfort."
  },
  {
    q: "What are your delivery timelines and shipping charges?",
    a: "We offer FREE Express Shipping on all prepaid and Cash on Delivery (COD) orders over ₹999 across India. Orders placed before 3:00 PM are dispatched on the same day from our temperature-controlled warehouses. Metro deliveries take 24 to 48 hours; other tier-2/3 cities take 3 to 4 business days via BlueDart Air and Delhivery Express."
  },
  {
    q: "What should I do if the container seal is broken upon arrival?",
    a: "Do not accept the delivery or consume the product if the outer Oliver tamper-evident tape or inner induction bottle seal is broken. Notify us immediately on WhatsApp (+91 98888 01234) or email support@oliversupplements.com with a photo of the parcel. We will arrange a free reverse pickup and dispatch a brand-new replacement within 24 hours."
  },
  {
    q: "Can I take Pre-Workout and Whey Protein together?",
    a: "Pre-Workout should be consumed 20 to 30 minutes before your workout to optimize nitric oxide blood flow, energy, and muscular focus. Whey Protein is best consumed within 45 minutes post-workout or first thing in the morning to supply amino acids for muscle protein synthesis and recovery."
  },
  {
    q: "Are all products compliant with FSSAI standards?",
    a: "Yes. Every supplement listed in our shop is 100% compliant with the Food Safety and Standards Authority of India (FSSAI Lic. No. 10020021000892) regulations and tested for heavy metals, microbial safety, and absence of prohibited doping agents."
  }
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="faq-page-wrap">
      <div className="category-hero faq-hero">
        <div className="container category-hero-content">
          <nav className="breadcrumbs light">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <span className="current">Frequently Asked Questions</span>
          </nav>
          <span className="category-pre-badge">
            <HelpCircle size={14} /> KNOWLEDGE BASE &bull; ATHLETE INTELLIGENCE
          </span>
          <h1 className="category-title">FREQUENTLY ASKED QUESTIONS</h1>
          <p className="category-desc">
            Everything you need to know about our genuine supplement authenticity protocol, importer verification, dosage, and delivery.
          </p>
        </div>
      </div>

      <div className="container section-pad">
        <div className="faq-accordion-list">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-accordion-item ${openIdx === idx ? 'open' : ''}`}
            >
              <button 
                type="button" 
                className="faq-question-btn"
                onClick={() => toggleFaq(idx)}
              >
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-q-icon">
                  {openIdx === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              {openIdx === idx && (
                <div className="faq-answer-panel">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Callout */}
        <div className="faq-callout-card mt-60">
          <ShieldCheck size={40} className="shield-icon red" />
          <div className="callout-content">
            <h3>Still have questions about a specific batch or supplement?</h3>
            <p>Our sports nutritionist team is ready to verify your batch details or answer dosage queries.</p>
          </div>
          <Link to="/contact" className="btn-primary">
            CONTACT NUTRITIONIST DESK &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

