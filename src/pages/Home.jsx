import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight, 
  ChevronLeft,
  PackageCheck, 
  Percent,
  Dumbbell,
  Layers,
  Heart
} from 'lucide-react';
import { 
  PRODUCTS, 
  CATEGORIES, 
  BRANDS, 
  getFeaturedProducts, 
  getBestsellers, 
  getNewArrivals 
} from '../data/products.js';
import { api } from '../services/api.js';
import ProductCard from '../components/ProductCard.jsx';

// GSAP & ScrollTrigger
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper & Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

gsap.registerPlugin(ScrollTrigger);

export default function Home({ onOpenGuide }) {
  const navigate = useNavigate();
  const [dynamicHome, setDynamicHome] = useState(null);
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [activePromoSlide, setActivePromoSlide] = useState(0);

  // Refs for GSAP
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const badgesRef = useRef(null);
  const ctaRef = useRef(null);
  const quickCatsRef = useRef(null);
  const bestSellersHeaderRef = useRef(null);

  useEffect(() => {
    // Dynamic Homepage & Products from Database
    api.getHomepage().then(cfg => {
      if (cfg) setDynamicHome(cfg);
    });

    api.getProducts({ sort: 'bestseller', limit: 10 }).then(prods => {
      if (prods && prods.length) setBestsellers(prods);
      else setBestsellers(getBestsellers(10));
    });

    api.getProducts({ sort: 'newest', limit: 8 }).then(prods => {
      if (prods && prods.length) setNewArrivals(prods);
      else setNewArrivals(getNewArrivals(8));
    });
  }, []);

  // Quick Category Bar Data (Matching the 10 tiles in mockup)
  const quickCategories = [
    { name: 'Whey Protein', slug: 'whey-protein', img: '/assets/category_icons/whey-protein.png' },
    { name: 'Creatine', slug: 'creatine', img: '/assets/category_icons/creatine.png' },
    { name: 'Pre-Workout', slug: 'pre-workout', img: '/assets/category_icons/pre-workout.png' },
    { name: 'Vitamin & Minerals', slug: 'vitamins-minerals', img: '/assets/category_icons/vitamins-minerals.png' },
    { name: 'Fish Oil & Omega-3', slug: 'fish-oil-omega-3', img: '/assets/category_icons/fish-oil.png' },
    { name: 'Protein Bars & Snacks', slug: 'protein-bars-snacks', img: '/assets/category_icons/protein-bars.png' },
    { name: 'Mass Gainers', slug: 'mass-gainers', img: '/assets/category_icons/mass-gainers.png' },
    { name: 'Amino Acids', slug: 'amino-acids', img: '/assets/category_icons/amino-acids.png' },
    { name: 'Fitness Accessories', slug: 'gym-accessories', img: '/assets/category_icons/fitness-accessories.png' },
    { name: 'All Categories →', slug: 'all', img: '/assets/category_icons/all-categories.png' }
  ];

  // Curated 3 Cinematic Promo Slides (Requirement #5)
  const promoSlides = [
    {
      id: 1,
      tag: 'FLAGSHIP SPORTS NUTRITION',
      headline1: 'FUEL YOUR BODY.',
      headline2: 'BUILD YOUR BEST.',
      desc: 'Hydrolyzed 90%+ pure Whey Protein Isolate with rapid amino delivery for peak protein synthesis and lean shredded muscle.',
      specs: ['27g Pure Protein', '6.2g BCAAs', 'Zero Bloat'],
      ctaText: 'SHOP WHEY PROTEIN',
      ctaLink: '/category/whey-protein',
      prodImg: '/assets/hero/hero-whey-tub.png'
    },
    {
      id: 2,
      tag: 'CELLULAR ATP REGENERATION',
      headline1: 'STRENGTH STARTS',
      headline2: 'WITHIN YOUR CELLS.',
      desc: '100% Micronized Creapure® Monohydrate tested with HPLC chromatography. Explosive power, muscle fullness and zero fatigue.',
      specs: ['Mesh 200 Ultra-Fine', 'Creapure Certified', 'Zero Sugar'],
      ctaText: 'EXPLORE CREATINE',
      ctaLink: '/category/creatine',
      prodImg: '/assets/products/12_creatine_micronized.jpg'
    },
    {
      id: 3,
      tag: 'ELITE ATHLETIC SYSTEM',
      headline1: 'YOUR PERFORMANCE.',
      headline2: 'YOUR NEXT LEVEL.',
      desc: 'A complete sports nutrition stack designed for serious lifters. Pre-workouts, EAAs, multi-vitamins and triple-strength omega-3.',
      specs: ['Lab-Tested Purity', 'Direct Importers', '24h Dispatch'],
      ctaText: 'VIEW ALL SUPPLEMENTS',
      ctaLink: '/shop',
      prodImg: '/assets/products/14_c4_pre_workout.jpg'
    }
  ];

  // Filter products for the interactive tab section
  const categoryTabProducts = activeCategoryTab === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter(p => p.categorySlug === activeCategoryTab).slice(0, 8);

  // Athlete Testimonials
  const testimonials = [
    {
      name: 'Vikram Rajput',
      title: 'National Men’s Physique Competitor',
      rating: 5,
      comment: 'The authenticity of Oliver Supplement Shop is unmatched in India. Every single tub checked out on the brand portal instantly with the scratch code. Delivery to Delhi took only 24 hours!',
      productUsed: 'ISO-100 Hydrolyzed Whey'
    },
    {
      name: 'Dr. Rohan Mehra',
      title: 'Sports Physician & Crossfit Coach',
      rating: 5,
      comment: 'As a medical professional, purity and zero doping contaminants are paramount for my athletes. Oliver’s clean lab-tested protein and heavy-metal verified fish oils give me 100% confidence.',
      productUsed: 'Gold Standard 100% Whey'
    },
    {
      name: 'Simran Kaur',
      title: 'Powerlifter & Strength Athlete',
      rating: 5,
      comment: 'Switched to Oliver Creatine and Whey 6 months ago. Added 15kg to my squat with zero digestion issues or bloating. Customer support is incredible.',
      productUsed: 'Oliver Micronized Creatine'
    }
  ];

  // GSAP Cinematic Animations
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Slow, subtle background zoom for cinema feel
      if (heroBgRef.current) {
        gsap.fromTo(heroBgRef.current, 
          { scale: 1.05 },
          { scale: 1.0, duration: 2.4, ease: 'power2.out' }
        );
      }

      // 2. Headline & Content Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-tracking-tag', {
        y: 18,
        opacity: 0,
        duration: 0.5
      }, 0.2);

      if (headlineLine1Ref.current) {
        tl.from(headlineLine1Ref.current.querySelectorAll('.hero-word'), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75
        }, 0.35);
      }

      if (headlineLine2Ref.current) {
        tl.from(headlineLine2Ref.current.querySelectorAll('.hero-word'), {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.75
        }, 0.55);
      }

      if (badgesRef.current) {
        tl.from(badgesRef.current.querySelectorAll('.hero-quality-badge'), {
          y: 22,
          opacity: 0,
          scale: 0.94,
          stagger: 0.09,
          duration: 0.55,
          ease: 'back.out(1.5)'
        }, 0.75);
      }

      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          scale: 0.88,
          opacity: 0,
          duration: 0.55,
          ease: 'back.out(2)'
        }, 0.95);
      }

      // 3. ScrollTrigger for Quick Categories Bar
      if (quickCatsRef.current) {
        gsap.from(quickCatsRef.current.querySelectorAll('.quick-cat-card'), {
          scrollTrigger: {
            trigger: quickCatsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 30,
          opacity: 0,
          stagger: 0.04,
          duration: 0.65,
          ease: 'power2.out'
        });
      }

      // 4. ScrollTrigger for Best Sellers Section Header
      if (bestSellersHeaderRef.current) {
        gsap.from(bestSellersHeaderRef.current.querySelector('.section-title-line'), {
          scrollTrigger: {
            trigger: bestSellersHeaderRef.current,
            start: 'top 85%'
          },
          scaleY: 0,
          transformOrigin: 'bottom center',
          duration: 0.6,
          ease: 'power3.out'
        });

        gsap.from(bestSellersHeaderRef.current.querySelector('.mockup-section-heading'), {
          scrollTrigger: {
            trigger: bestSellersHeaderRef.current,
            start: 'top 85%'
          },
          x: -25,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        });
      }

      // 5. Section Reveals
      gsap.utils.toArray('.reveal-section').forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out'
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page-wrap" ref={heroRef}>
      {/* ========================================================
          1. FULL-WIDTH CINEMATIC BACKGROUND HERO (NO SEPARATE BOXES)
          ======================================================== */}
      <section className="fullwidth-cinematic-hero">
        {/* Full-width background image covering left-to-right (Dynamic Admin Controlled) */}
        <div 
          className="hero-cinematic-bg-layer" 
          ref={heroBgRef}
          style={{
            backgroundImage: `url('${dynamicHome?.hero?.desktopBgUrl || '/assets/hero/hero-cinematic-full-bg-4k.png'}')`
          }}
        ></div>

        {/* Multi-layered cinematic overlays */}
        <div 
          className="hero-overlay-dark-vignette"
          style={{
            backgroundColor: `rgba(9, 9, 9, ${(dynamicHome?.hero?.overlayDarkness ?? 0.70) * 0.4})`
          }}
        ></div>
        <div className="hero-overlay-edge-flares"></div>
        <div className="hero-overlay-center-glow"></div>

        {/* Central Foreground Content */}
        <div className="container hero-foreground-container">
          <div className="hero-center-content">
            <span className="hero-tracking-tag">
              {dynamicHome?.hero?.kicker || 'OLIVER SUPPLEMENT SHOP'}
            </span>
            
            <h1 className="hero-cinematic-headline">
              <span className="hero-headline-line line-1" ref={headlineLine1Ref}>
                {(dynamicHome?.hero?.headlineLine1 || 'FUEL YOUR BODY').split(' ').map((w, i) => (
                  <React.Fragment key={i}>
                    <span className="hero-word">{w}</span>{' '}
                  </React.Fragment>
                ))}
              </span>
              <span className="hero-headline-line line-2" ref={headlineLine2Ref}>
                {(dynamicHome?.hero?.headlineLine2 || 'BUILD YOUR BEST').split(' ').map((w, i) => (
                  <React.Fragment key={i}>
                    <span className="hero-word highlight-red">{w}</span>{' '}
                  </React.Fragment>
                ))}
              </span>
            </h1>

            {/* 3 Quality Badges (Quality | Strength | Performance - Exact Match to Brand Reference) */}
            <div className="hero-badges-row" ref={badgesRef}>
              {(dynamicHome?.hero?.badges || [
                { id: 'b1', name: 'QUALITY', title: '100% Certified Authentic Sports Nutrition' },
                { id: 'b2', name: 'STRENGTH', title: 'Explosive Strength & Muscle Hypertrophy' },
                { id: 'b3', name: 'PERFORMANCE', title: 'Peak Athletic Endurance & Clean Botanicals' }
              ]).map((b, idx) => (
                <div key={b.id || idx} className="hero-quality-badge">
                  <div className="badge-icon-box" title={b.title}>
                    {idx === 0 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 3h12v2H6V3zm-1 3h14a1 1 0 0 1 1 1v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a1 1 0 0 1 1-1zm8 2l-4 6h3l-1 4 4-6h-3l1-4z"/>
                      </svg>
                    )}
                    {idx === 1 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.5 11c-.3-1.6-1.5-2.8-3.1-3.1-.7-.1-1.4 0-2 .3l-1.8-1.8c-.8-.8-2-.9-2.9-.4L8.4 4.7C7.6 4.3 6.6 4.4 6 5l-2 2c-.6.6-.7 1.6-.3 2.4l1.3 2.3c-.5.9-.4 2.1.4 2.9l1.8 1.8c-.3.6-.4 1.3-.3 2 .3 1.6 1.5 2.8 3.1 3.1.4.1.7.1 1.1 0 1.2-.2 2.2-.9 2.7-2l1.6-3.2c.4-.8 1.2-1.3 2.1-1.3.4 0 .7.1 1.1.2.6.2 1.3.1 1.8-.3.6-.5.9-1.2.8-1.9z"/>
                      </svg>
                    )}
                    {idx >= 2 && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-10 7-1.4 3.5-.7 6.4 1 8.2-1.4-2.8-1.2-5.7.8-8.2 1.4-1.8 3.2-2.5 5.2-2z"/>
                      </svg>
                    )}
                  </div>
                  <span className="badge-name">{b.name}</span>
                </div>
              ))}
            </div>

            {/* Prominent Glowing Red CTA Button */}
            <div className="hero-cta-wrap" ref={ctaRef}>
              <Link to={dynamicHome?.hero?.ctaLink || '/shop'} className="hero-shop-pill-btn">
                <span>{dynamicHome?.hero?.ctaText || 'SHOP NOW'}</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. QUICK CATEGORIES BAR (10 GLOWING TILES)
          ======================================================== */}
      <section className="quick-categories-bar-section" ref={quickCatsRef}>
        <div className="container">
          <div className="quick-categories-scroll-row">
            {quickCategories.map((cat) => (
              <Link 
                key={cat.slug} 
                to={cat.slug === 'all' ? '/shop' : `/category/${cat.slug}`}
                className="quick-cat-card"
              >
                <div className="quick-cat-icon-frame">
                  <img src={cat.img} alt={cat.name} className="quick-cat-img" loading="lazy" />
                </div>
                <span className="quick-cat-title">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. BEST SELLERS SWIPER SLIDER
          ======================================================== */}
      <section className="bestsellers-swiper-section reveal-section" ref={bestSellersHeaderRef}>
        <div className="container">
          {/* Header with Red vertical bar */}
          <div className="mockup-section-header">
            <div className="header-text-group">
              <div className="title-with-bar">
                <span className="section-title-line"></span>
                <h2 className="mockup-section-heading">Best Sellers</h2>
              </div>
              <p className="mockup-section-sub">
                Top choice supplements trusted by fitness enthusiasts
              </p>
            </div>
            
            <div className="header-actions-group">
              <Link to="/shop?sort=bestseller" className="mockup-view-all-pill">
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Swiper Slider for Products */}
          <div className="bestsellers-slider-wrap">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: '.best-next-btn',
                prevEl: '.best-prev-btn'
              }}
              spaceBetween={14}
              slidesPerView={1.5}
              breakpoints={{
                320: { slidesPerView: 1.3, spaceBetween: 10 },
                480: { slidesPerView: 2.1, spaceBetween: 12 },
                768: { slidesPerView: 3.2, spaceBetween: 16 },
                1024: { slidesPerView: 4.5, spaceBetween: 18 },
                1280: { slidesPerView: 5.5, spaceBetween: 20 },
                1440: { slidesPerView: 6, spaceBetween: 20 }
              }}
              className="products-swiper"
            >
              {bestsellers.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Slider Navigation Controls */}
            <button className="slider-nav-arrow best-prev-btn" aria-label="Previous Products">
              <ChevronLeft size={20} />
            </button>
            <button className="slider-nav-arrow best-next-btn" aria-label="Next Products">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CINEMATIC 3-SLIDE PROMOTIONAL SHOWCASE
          ======================================================== */}
      <section className="cinematic-promo-slider-section reveal-section">
        <div className="container">
          <div className="promo-concept-slider-box">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: '.promo-slider-next',
                prevEl: '.promo-slider-prev'
              }}
              onSlideChange={(s) => setActivePromoSlide(s.realIndex)}
              className="promo-concept-swiper"
            >
              {promoSlides.map((slide) => (
                <SwiperSlide key={slide.id}>
                  <div className="promo-slide-inner">
                    <div className="promo-slide-content">
                      <span className="promo-slide-tag">{slide.tag}</span>
                      <h3 className="promo-slide-title">
                        {slide.headline1} <br />
                        <span className="highlight-red">{slide.headline2}</span>
                      </h3>
                      <p className="promo-slide-desc">{slide.desc}</p>
                      
                      <div className="promo-slide-specs">
                        {slide.specs.map((sp) => (
                          <span key={sp} className="spec-badge">
                            <CheckCircle2 size={13} className="spec-icon" /> {sp}
                          </span>
                        ))}
                      </div>

                      <div className="promo-slide-cta-row">
                        <Link to={slide.ctaLink} className="btn-primary promo-cta-btn">
                          {slide.ctaText} <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>

                    <div className="promo-slide-visual">
                      <img 
                        src={slide.prodImg} 
                        alt={slide.headline1} 
                        className="promo-visual-img"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Slider Navigation Arrows */}
            <button className="promo-slider-nav promo-slider-prev" aria-label="Previous slide">
              <ChevronLeft size={22} />
            </button>
            <button className="promo-slider-nav promo-slider-next" aria-label="Next slide">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. INTERACTIVE TABBED CATALOGUE (WHEY, CREATINE, PRE-WORKOUT)
          ======================================================== */}
      <section className="tabbed-catalogue-section reveal-section">
        <div className="container">
          <div className="mockup-section-header">
            <div className="header-text-group">
              <div className="title-with-bar">
                <span className="section-title-line"></span>
                <h2 className="mockup-section-heading">Featured Sports Supplements</h2>
              </div>
              <p className="mockup-section-sub">
                Target your physique goal with scientifically verified formulas
              </p>
            </div>
            
            {/* Filter Pills */}
            <div className="category-filter-pills">
              {[
                { id: 'all', label: 'All Supplements' },
                { id: 'whey-protein', label: 'Whey Protein' },
                { id: 'creatine', label: 'Creatine' },
                { id: 'pre-workout', label: 'Pre-Workout' },
                { id: 'mass-gainers', label: 'Mass Gainers' },
                { id: 'vitamins-minerals', label: 'Vitamins' }
              ].map((tab) => (
                <button 
                  key={tab.id}
                  type="button" 
                  className={`cat-pill ${activeCategoryTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveCategoryTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
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
          6. CERTIFIED GLOBAL BRAND PARTNERS SLIDER
          ======================================================== */}
      <section className="brand-partners-slider-section reveal-section">
        <div className="container">
          <div className="mockup-section-header center">
            <div className="header-text-group center">
              <span className="section-pre-title">100% DIRECT IMPORTER AUTHENTICITY</span>
              <h2 className="mockup-section-heading">Certified Global Brand Partners</h2>
              <p className="mockup-section-sub">
                Official stockists with scratch-to-verify security holograms and QR verification
              </p>
            </div>
          </div>

          <div className="brands-swiper-wrap">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2400, disableOnInteraction: false }}
              spaceBetween={14}
              slidesPerView={2.8}
              breakpoints={{
                480: { slidesPerView: 3.8, spaceBetween: 16 },
                768: { slidesPerView: 4.8, spaceBetween: 20 },
                1024: { slidesPerView: 6, spaceBetween: 24 },
                1280: { slidesPerView: 8, spaceBetween: 24 }
              }}
              className="brands-swiper"
            >
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
                <SwiperSlide key={b.name}>
                  <Link to={b.link} className="brand-slide-card">
                    <img 
                      src={`/assets/brands/${b.file}`} 
                      alt={b.name} 
                      className="brand-slide-logo"
                      loading="lazy"
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. ATHLETE TESTIMONIALS SLIDER
          ======================================================== */}
      <section className="testimonials-section reveal-section">
        <div className="container">
          <div className="mockup-section-header center">
            <div className="header-text-group center">
              <span className="section-pre-title">COMMUNITY OF CHAMPIONS</span>
              <h2 className="mockup-section-heading">Verified Athlete Reviews</h2>
              <p className="mockup-section-sub">
                Real feedback from competitors, powerlifters, and coaches
              </p>
            </div>
          </div>

          <div className="testimonials-slider-box">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000 }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="testimonials-swiper"
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="testimonial-card">
                    <div className="testi-stars">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#ffb800" stroke="#ffb800" />
                      ))}
                    </div>
                    <p className="testi-comment">"{t.comment}"</p>
                    <div className="testi-author">
                      <div className="testi-author-info">
                        <div className="testi-name">{t.name}</div>
                        <div className="testi-title">{t.title}</div>
                      </div>
                      <div className="testi-product-tag">
                        <span>Used: {t.productUsed}</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
