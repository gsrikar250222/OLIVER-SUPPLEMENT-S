import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Flame, 
  ShieldCheck, 
  Truck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Sparkles, 
  TrendingUp, 
  HeartHandshake,
  ChevronRight,
  PackageCheck,
  Percent
} from 'lucide-react';
import { 
  PRODUCTS, 
  CATEGORIES, 
  BRANDS, 
  getFeaturedProducts, 
  getBestsellers, 
  getNewArrivals 
} from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home({ onOpenGuide }) {
  const navigate = useNavigate();
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  useEffect(() => {
    setBestsellers(getBestsellers(8));
    setNewArrivals(getNewArrivals(8));
  }, []);

  // Filter products for the interactive tab section
  const categoryTabProducts = activeCategoryTab === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.categorySlug === activeCategoryTab).slice(0, 8);

  // Curated Combo Deals
  const comboDeals = [
    {
      id: 'combo-lean-shred',
      name: 'Oliver Elite Lean Shred Stack',
      category: 'Combo Stack',
      originalPrice: 8498,
      price: 6499,
      discount: 24,
      image: '/assets/products/02_whey_isolate.jpg',
      badge: 'PRO STACK &bull; 24% OFF',
      items: ['Pure Whey Isolate 90% (2kg)', 'Micronized Creapure (250g)', 'Free Oliver Shaker Bottle (700ml)'],
      link: '/category/whey-isolate'
    },
    {
      id: 'combo-mass-anabolic',
      name: 'Titan Anabolic Bulk Gainer Stack',
      category: 'Combo Stack',
      originalPrice: 7998,
      price: 5899,
      discount: 26,
      image: '/assets/products/06_mass_gainer.jpg',
      badge: 'BULK BUILDER &bull; 26% OFF',
      items: ['Anabolic Mass Gainer Heavy (3kg)', 'Creatine Power Tub (200g)', 'All-Natural Peanut Butter (1kg)'],
      link: '/category/mass-gainers'
    },
    {
      id: 'combo-explosive-power',
      name: 'Savage Workout Ignition Bundle',
      category: 'Combo Stack',
      originalPrice: 6298,
      price: 4699,
      discount: 25,
      image: '/assets/products/14_c4_pre_workout.jpg',
      badge: 'HIGH STIM &bull; 25% OFF',
      items: ['C4 Original Pre-Workout (30 Servings)', 'BCAA 2:1:1 Amino Fuel (35 Servings)', 'Electrolyte Hydration Salts'],
      link: '/category/pre-workout'
    }
  ];

  // Athlete Testimonials
  const testimonials = [
    {
      name: 'Vikram Rajput',
      title: 'National Men’s Physique Competitor',
      rating: 5,
      comment: 'The authenticity of Oliver Supplement Shop is unmatched in India. Every single tub of Dymatize ISO-100 and Oliver Pro Whey checked out on the brand portal instantly with the scratch code. Delivery to Delhi took only 24 hours!',
      productUsed: 'ISO-100 Hydrolyzed Whey'
    },
    {
      name: 'Dr. Rohan Mehra',
      title: 'Sports Physician & Crossfit Coach',
      rating: 5,
      comment: 'As a medical professional, purity and zero doping contaminants are paramount for my athletes. Oliver’s clean lab-tested protein and heavy-metal verified fish oils give me 100% confidence. Absolutely best in class.',
      productUsed: 'Gold Standard 100% Whey'
    },
    {
      name: 'Simran Kaur',
      title: 'Powerlifter & Strength Athlete',
      rating: 5,
      comment: 'Finally a supplement shop that doesn’t sell counterfeit junk! Switched to Oliver Creatine and Whey 6 months ago. Added 15kg to my squat and zero digestion issues or bloating. Customer support is incredible.',
      productUsed: 'Oliver Micronized Creatine'
    }
  ];

  return (
    <div className="home-page-wrap">
      {/* ========================================================
          1. CINEMATIC HERO SECTION
          ======================================================== */}
      <section className="cinematic-hero-section">
        <div className="hero-atmosphere-glow"></div>
        <div className="hero-dark-vignette"></div>

        <div className="container hero-container">
          <div className="hero-content-col">
            <div className="hero-pre-badge">
              <span className="pulse-red-dot"></span>
              <span className="hero-pre-text">CERTIFIED 100% GENUINE SPORTS NUTRITION</span>
            </div>

            <h1 className="hero-headline">
              FUEL YOUR BODY.<br />
              <span className="hero-highlight">BUILD YOUR BEST.</span>
            </h1>

            <p className="hero-subtext">
              Premium Sports Nutrition. Genuine Supplements. Performance Without Compromise.
              Direct brand imports, lab-verified formulas, and zero counterfeit fillers.
            </p>

            <div className="hero-cta-group">
              <Link to="/shop" className="btn-primary hero-btn-main">
                SHOP NOW <ArrowRight size={18} />
              </Link>
              <Link to="/category/whey-protein" className="btn-secondary hero-btn-sub">
                EXPLORE SUPPLEMENTS
              </Link>
            </div>

            {/* Micro Trust Proof */}
            <div className="hero-trust-proof">
              <div className="proof-item">
                <span className="proof-number">65+</span>
                <span className="proof-label">Verified Formulas</span>
              </div>
              <div className="proof-divider"></div>
              <div className="proof-item">
                <span className="proof-number">100%</span>
                <span className="proof-label">Authentic Guarantee</span>
              </div>
              <div className="proof-divider"></div>
              <div className="proof-item">
                <span className="proof-number">4.9/5</span>
                <span className="proof-label">Athlete Rating</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Imagery: Muscular Athlete with Dramatic Atmospheric Lighting */}
          <div className="hero-visual-col">
            <div className="hero-image-wrapper">
              <img 
                src="/assets/hero/hero-athlete.png" 
                alt="Muscular athlete with dramatic red lighting — Oliver Supplement Shop" 
                className="hero-athlete-img"
              />
              <div className="hero-floating-stat-card">
                <div className="stat-card-badge">
                  <ShieldCheck size={16} /> FSSAI & LABDOOR TESTED
                </div>
                <div className="stat-card-title">Pure Whey & Micronized Creatine</div>
                <div className="stat-card-sub">Zero Spiking &bull; Authentic Importer Codes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. TRUST PILLARS SECTION
          ======================================================== */}
      <section className="trust-pillars-section">
        <div className="container">
          <div className="trust-pillars-grid">
            <div className="trust-card">
              <div className="trust-card-icon-wrap red">
                <ShieldCheck size={28} />
              </div>
              <div className="trust-card-text">
                <h3>100% GENUINE PRODUCTS</h3>
                <p>Sourced directly from authorized global brand importers with unique scratch-to-verify security codes.</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-card-icon-wrap red">
                <Truck size={28} />
              </div>
              <div className="trust-card-text">
                <h3>FAST ALL-INDIA DELIVERY</h3>
                <p>Express dispatch within 24 hours. Free insured delivery across 19,000+ PIN codes on orders over ₹999.</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-card-icon-wrap red">
                <PackageCheck size={28} />
              </div>
              <div className="trust-card-text">
                <h3>SECURE PAYMENTS & COD</h3>
                <p>256-bit SSL encrypted checkout. Pay effortlessly via UPI, Credit/Debit cards, NetBanking, or COD.</p>
              </div>
            </div>

            <div className="trust-card">
              <div className="trust-card-icon-wrap red">
                <Award size={28} />
              </div>
              <div className="trust-card-text">
                <h3>VERIFIED BRAND PARTNERS</h3>
                <p>Official stockists for Optimum Nutrition, MuscleTech, Dymatize, Myprotein, Cellucor, and Oliver Pro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SHOP BY SUPPLEMENT CATEGORY (RECTANGULAR CARDS)
          ======================================================== */}
      <section className="categories-showcase-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-pre-title">DISCOVER YOUR FUEL</span>
              <h2 className="section-title">SHOP BY CATEGORY</h2>
            </div>
            <Link to="/shop" className="section-header-link">
              View All Categories <ChevronRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {CATEGORIES.slice(0, 8).map((cat) => (
              <Link 
                key={cat.id} 
                to={`/category/${cat.slug}`} 
                className="category-card"
              >
                <div className="category-card-bg">
                  <img 
                    src={cat.banner} 
                    alt={cat.name} 
                    className="category-card-img" 
                    loading="lazy" 
                  />
                  <div className="category-card-overlay"></div>
                </div>
                <div className="category-card-info">
                  <span className="category-count">{cat.itemCount} Products</span>
                  <h3 className="category-name">{cat.name}</h3>
                  <p className="category-desc">{cat.description}</p>
                  <span className="category-link-cta">
                    SHOP {cat.name.toUpperCase()} &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. BEST SELLERS CAROUSEL / HORIZONTAL SECTION
          ======================================================== */}
      <section className="bestsellers-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-pre-title">ATHLETE REVIEWS &bull; VERIFIED PURCHASES</span>
              <h2 className="section-title">BEST SELLERS</h2>
            </div>
            <Link to="/shop?sort=bestseller" className="section-header-link">
              Explore Best Sellers <ChevronRight size={16} />
            </Link>
          </div>

          <div className="bestsellers-scroll-container">
            {bestsellers.map((product) => (
              <div key={product.id} className="bestseller-slide-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. FEATURED PROMOTIONAL SECTION: WHEY & CREATINE ESSENTIALS
          ======================================================== */}
      <section className="promo-spotlight-section">
        <div className="container">
          <div className="promo-spotlight-grid">
            {/* Banner 1: Whey Isolate Superiority */}
            <div className="promo-banner-card promo-banner-isolate">
              <div className="promo-banner-badge">HYDROLYZED & MICRO-FILTERED</div>
              <h3 className="promo-banner-title">
                100% PURE WHEY ISOLATE MATRIX
              </h3>
              <p className="promo-banner-sub">
                Less than 1g carbs and fats. 27g protein per scoop for ultra-fast post-workout muscle protein synthesis.
              </p>
              <div className="promo-banner-specs">
                <span className="spec-pill">27g Protein</span>
                <span className="spec-pill">6.2g BCAAs</span>
                <span className="spec-pill">Zero Bloat</span>
              </div>
              <Link to="/category/whey-isolate" className="btn-primary promo-banner-btn">
                SHOP WHEY ISOLATE &rarr;
              </Link>
            </div>

            {/* Banner 2: Creatine ATP Power */}
            <div className="promo-banner-card promo-banner-creatine">
              <div className="promo-banner-badge">CELLULAR ATP REGENERATION</div>
              <h3 className="promo-banner-title">
                MICRONIZED CREAPURE CREATINE
              </h3>
              <p className="promo-banner-sub">
                99.9% pure HPLC-tested creatine monohydrate. Shatter strength plateaus, increase muscle fullness and power output.
              </p>
              <div className="promo-banner-specs">
                <span className="spec-pill">100% Mesh 200</span>
                <span className="spec-pill">Zero Solvents</span>
                <span className="spec-pill">Creapure Certified</span>
              </div>
              <Link to="/category/creatine" className="btn-primary promo-banner-btn">
                SHOP CREATINE MONOHYDRATE &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. INTERACTIVE TABBED CATALOGUE
          ======================================================== */}
      <section className="tabbed-catalogue-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-pre-title">TARGET YOUR PHYSIQUE GOAL</span>
              <h2 className="section-title">TOP SPORTS SUPPLEMENTS</h2>
            </div>
            
            {/* Filter Pills */}
            <div className="category-filter-pills">
              <button 
                type="button" 
                className={`cat-pill ${activeCategoryTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('all')}
              >
                All Supplements
              </button>
              <button 
                type="button" 
                className={`cat-pill ${activeCategoryTab === 'whey-protein' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('whey-protein')}
              >
                Whey Protein
              </button>
              <button 
                type="button" 
                className={`cat-pill ${activeCategoryTab === 'creatine' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('creatine')}
              >
                Creatine
              </button>
              <button 
                type="button" 
                className={`cat-pill ${activeCategoryTab === 'pre-workout' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('pre-workout')}
              >
                Pre-Workout
              </button>
              <button 
                type="button" 
                className={`cat-pill ${activeCategoryTab === 'mass-gainers' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('mass-gainers')}
              >
                Mass Gainers
              </button>
              <button 
                type="button" 
                className={`cat-pill ${activeCategoryTab === 'vitamins-minerals' ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab('vitamins-minerals')}
              >
                Vitamins & Minerals
              </button>
            </div>
          </div>

          <div className="products-grid">
            {categoryTabProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="center-cta-wrap">
            <Link to="/shop" className="btn-secondary see-all-cta-btn">
              VIEW ALL 65 VERIFIED SUPPLEMENTS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. SHOP BY CERTIFIED BRAND
          ======================================================== */}
      <section className="shop-by-brand-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-pre-title">OFFICIAL AUTHORIZED DISTRIBUTORS</span>
            <h2 className="section-title">CERTIFIED GLOBAL BRANDS</h2>
            <p className="section-sub-desc">
              We exclusively stock direct from authorized Indian brand importers. 100% authentic, tamper-proof security guaranteed.
            </p>
          </div>

          <div className="brands-logo-grid">
            {[
              { name: 'OLIVER Pro Nutrition', file: 'oliver.svg', link: '/shop?brand=OLIVER+Pro+Nutrition' },
              { name: 'Optimum Nutrition', file: 'optimum-nutrition.svg', link: '/shop?brand=Optimum+Nutrition' },
              { name: 'MuscleTech', file: 'muscletech.svg', link: '/shop?brand=MuscleTech' },
              { name: 'Dymatize', file: 'dymatize.svg', link: '/shop?brand=Dymatize' },
              { name: 'Myprotein', file: 'myprotein.svg', link: '/shop?brand=Myprotein' },
              { name: 'Cellucor', file: 'cellucor.svg', link: '/shop?brand=Cellucor' },
              { name: 'MuscleBlaze', file: 'muscleblaze.svg', link: '/shop?brand=MuscleBlaze' },
              { name: 'GNC', file: 'gnc.svg', link: '/shop?brand=GNC' },
              { name: 'Universal Nutrition', file: 'universal.svg', link: '/shop?brand=Universal+Nutrition' },
              { name: 'Rule 1', file: 'rule1.svg', link: '/shop?brand=Rule+1' }
            ].map((b) => (
              <Link key={b.name} to={b.link} className="brand-logo-card">
                <img 
                  src={`/assets/brands/${b.file}`} 
                  alt={b.name} 
                  className="brand-card-logo-img"
                  loading="lazy" 
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          8. SUPPLEMENT COMBO DEALS
          ======================================================== */}
      <section className="combo-deals-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-pre-title">STACK & SAVE UP TO 26%</span>
              <h2 className="section-title">EXCLUSIVE SUPPLEMENT STACKS</h2>
            </div>
            <Link to="/shop?sort=discount" className="section-header-link">
              View All Combo Deals <ChevronRight size={16} />
            </Link>
          </div>

          <div className="combo-deals-grid">
            {comboDeals.map((combo) => (
              <div key={combo.id} className="combo-deal-card">
                <div className="combo-card-media">
                  <span className="combo-badge">{combo.badge}</span>
                  <img src={combo.image} alt={combo.name} className="combo-card-img" />
                </div>
                <div className="combo-card-body">
                  <h3 className="combo-card-title">{combo.name}</h3>
                  <div className="combo-items-list">
                    {combo.items.map((it, idx) => (
                      <div key={idx} className="combo-item-line">
                        <CheckCircle2 size={13} className="check-icon" /> <span>{it}</span>
                      </div>
                    ))}
                  </div>
                  <div className="combo-card-price-row">
                    <div className="combo-pricing">
                      <span className="combo-current-price">₹{combo.price.toLocaleString('en-IN')}</span>
                      <span className="combo-mrp">₹{combo.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="combo-discount-pill">{combo.discount}% OFF</span>
                    </div>
                    <Link to={combo.link} className="btn-primary combo-cta-btn">
                      VIEW STACK
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. NEW ARRIVALS
          ======================================================== */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-pre-title">JUST DROPPED IN THE SHOP</span>
              <h2 className="section-title">NEW ARRIVALS</h2>
            </div>
            <Link to="/shop?sort=newest" className="section-header-link">
              View All New Releases <ChevronRight size={16} />
            </Link>
          </div>

          <div className="products-grid">
            {newArrivals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. ATHLETE REVIEWS & CLINICAL TESTIMONIALS
          ======================================================== */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-pre-title">TESTED BY ELITE ATHLETES</span>
            <h2 className="section-title">WHAT ATHLETES SAY ABOUT OLIVER</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="#FFC107" stroke="#FFC107" />
                  ))}
                </div>
                <p className="testimonial-quote">"{t.comment}"</p>
                <div className="testimonial-author">
                  <strong className="author-name">{t.name}</strong>
                  <span className="author-title">{t.title}</span>
                  <span className="author-product-tag">&bull; Verified Purchase: {t.productUsed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          11. NUTRITION & DOSAGE CALCULATOR BANNER
          ======================================================== */}
      <section className="nutrition-calculator-banner-section">
        <div className="container">
          <div className="calculator-callout-card">
            <div className="callout-left">
              <div className="callout-badge">
                <Sparkles size={14} /> FREE ATHLETE TOOL
              </div>
              <h2>NOT SURE HOW MUCH PROTEIN YOU NEED?</h2>
              <p>
                Use our clinically calibrated Daily Protein Calculator and Optimal Supplement Timing Matrix to customize your macros according to your exact body weight and training goals.
              </p>
            </div>
            <div className="callout-right">
              {onOpenGuide && (
                <button 
                  type="button" 
                  className="btn-primary calc-trigger-btn"
                  onClick={onOpenGuide}
                >
                  LAUNCH PROTEIN CALCULATOR &rarr;
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
