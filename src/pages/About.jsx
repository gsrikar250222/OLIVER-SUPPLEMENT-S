import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Zap, Truck, CheckCircle2, HeartHandshake, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page-wrap">
      {/* Hero Banner */}
      <div className="category-hero about-hero">
        <div className="container category-hero-content">
          <nav className="breadcrumbs light">
            <Link to="/">Home</Link>
            <span>&gt;</span>
            <span className="current">About Oliver</span>
          </nav>
          <span className="category-pre-badge">
            <Award size={14} /> THE OLIVER SPORTS NUTRITION STORY
          </span>
          <h1 className="category-title">FUEL YOUR BODY. BUILD YOUR BEST.</h1>
          <p className="category-desc">
            OLIVER SUPPLEMENT SHOP was founded with one non-negotiable objective: eradicate counterfeit and spiked supplements in the Indian fitness industry, delivering 100% pure, certified sports nutrition to every athlete.
          </p>
        </div>
      </div>

      <div className="container section-pad">
        {/* The Problem & Our Mission */}
        <div className="about-story-grid">
          <div className="about-story-text">
            <span className="section-pre-title">THE COUNTERFEIT CRISIS &bull; OUR STAND</span>
            <h2 className="about-heading">WHY WE BUILT OLIVER SUPPLEMENT SHOP</h2>
            <p>
              In India, up to 1 in 3 supplements in unorganized retail markets are adulterated, expired, or outright counterfeit. Spiked nitrogen levels, cheap maltodextrin fillers, and unauthorized parallel imports rob athletes of their health and hard-earned gains.
            </p>
            <p>
              <strong>At OLIVER SUPPLEMENT SHOP, we refused to accept this reality.</strong> We built an uncompromising direct-from-importer supply chain. We partner exclusively with official Indian brand importers (Glanbia, Bright Commodities, Iovate, Nutrabolt) to guarantee that every scoop of whey, creatine, and amino acids is 100% genuine, fresh, and lab-tested.
            </p>

            <div className="about-commitments-list mt-25">
              <div className="commit-item">
                <CheckCircle2 size={18} className="check-red" />
                <div>
                  <strong>Direct Authorized Importer Contracts</strong>
                  <p>Zero middle-tier distributors or gray-market parallel importers.</p>
                </div>
              </div>
              <div className="commit-item">
                <CheckCircle2 size={18} className="check-red" />
                <div>
                  <strong>Mandatory Scratch & Verify Codes</strong>
                  <p>Every tub features authentic holographic seals verifiable on official brand sites.</p>
                </div>
              </div>
              <div className="commit-item">
                <CheckCircle2 size={18} className="check-red" />
                <div>
                  <strong>Temperature-Controlled Warehousing</strong>
                  <p>Protects delicate whey protein enzymes, live probiotics, and omega-3 softgels from heat degradation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-stats-card">
            <h3>BY THE NUMBERS</h3>
            <div className="stats-vertical-list mt-20">
              <div className="stat-row">
                <span className="stat-big">65+</span>
                <div>
                  <strong>Verified Formulations</strong>
                  <p>Whey isolates, creatine, pre-workouts, aminos, and vitamins.</p>
                </div>
              </div>
              <div className="stat-row">
                <span className="stat-big">100%</span>
                <div>
                  <strong>Genuine Authenticity Rate</strong>
                  <p>Zero counterfeit incident guarantee with instant full refund policy.</p>
                </div>
              </div>
              <div className="stat-row">
                <span className="stat-big">19,000+</span>
                <div>
                  <strong>PIN Codes Served</strong>
                  <p>Lightning express courier delivery to all Indian states.</p>
                </div>
              </div>
              <div className="stat-row">
                <span className="stat-big">50,000+</span>
                <div>
                  <strong>Athletes Fueled</strong>
                  <p>From competitive bodybuilders to daily fitness enthusiasts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="about-values-section mt-60">
          <div className="section-header center">
            <span className="section-pre-title">ATHLETE-FIRST ETHOS</span>
            <h2 className="section-title">THE OLIVER CORE PILLARS</h2>
          </div>

          <div className="about-pillars-grid mt-30">
            <div className="about-pillar-box">
              <ShieldCheck size={36} className="pillar-icon red" />
              <h3>Radical Transparency</h3>
              <p>Every product displays full nutritional panels, allergen warnings, exact scoop sizes, and batch numbers. Zero proprietary hidden blends.</p>
            </div>

            <div className="about-pillar-box">
              <Zap size={36} className="pillar-icon red" />
              <h3>High-Octane Performance</h3>
              <p>We stock only clinically dosed formulas that deliver tangible strength, muscle synthesis, and cardiovascular endurance results.</p>
            </div>

            <div className="about-pillar-box">
              <HeartHandshake size={36} className="pillar-icon red" />
              <h3>Athlete Guidance & Support</h3>
              <p>Our team consists of certified sports nutritionists ready to assist you in designing your perfect stack and daily macro targets.</p>
            </div>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="about-cta-bar mt-60">
          <div>
            <h2>READY TO TRANSFORM YOUR PHYSIQUE?</h2>
            <p>Explore our complete catalog of certified whey proteins, isolates, and sports supplements.</p>
          </div>
          <Link to="/shop" className="btn-primary">
            EXPLORE THE SHOP &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

