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
  const [bestsellers, setBestsellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');
  const [activePromoSlide, setActivePromoSlide] = useState(0);

  // Refs for GSAP
  const heroRef = useRef(null);
  const headlineLine1Ref = useRef(null);
  const headlineLine2Ref = useRef(null);
  const athleteRef = useRef(null);
  const tubRef = useRef(null);
  const badgesRef = useRef(null);
  const ctaRef = useRef(null);
  const quickCatsRef = useRef(null);
  const bestSellersHeaderRef = useRef(null);

  useEffect(() => {
    // Populate products
    setBestsellers(getBestsellers(10));
    setNewArrivals(getNewArrivals(8));
  }, []);

  // Quick Category Bar Data (Matching the exact 10 tiles in the mockup)
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
      bgImg: '/assets/hero/hero-cinematic-banner-2k.png',
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
      bgImg: '/assets/hero/hero-cinematic-banner-2k.png',
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
      bgImg: '/assets/hero/hero-cinematic-banner-2k.png',
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

  // GSAP Cinematic Hero & ScrollTrigger Setup
  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Hero Master Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Athlete enters from left
      if (athleteRef.current) {
        tl.from(athleteRef.current, {
          x: -90,
          opacity: 0,
          scale: 0.96,
          duration: 1.1
        }, 0.1);
      }

      // Whey tub enters from right
      if (tubRef.current) {
        tl.from(tubRef.current, {
          x: 90,
          opacity: 0,
          scale: 0.95,
          duration: 1.2
        }, 0.15);

        // Subtle idle floating breathing animation
        gsap.to(tubRef.current, {
          y: -10,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.3
        });
      }

      // Text Reveal
      if (headlineLine1Ref.current && headlineLine2Ref.current) {
        tl.from('.hero-tracking-tag', {
          y: 20,
          opacity: 0,
          duration: 0.6
        }, 0.3);

        tl.from(headlineLine1Ref.current.querySelectorAll('.hero-word'), {
          y: 45,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8
        }, 0.4);

        tl.from(headlineLine2Ref.current.querySelectorAll('.hero-word'), {
          y: 45,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8
        }, 0.6);
      }

      // Badges Stagger
      if (badgesRef.current) {
        tl.from(badgesRef.current.querySelectorAll('.hero-quality-badge'), {
          y: 25,
          opacity: 0,
          scale: 0.92,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.6)'
        }, 0.8);
      }

      // CTA Button
      if (ctaRef.current) {
        tl.from(ctaRef.current, {
          scale: 0.88,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)'
        }, 1.0);
      }

      // 2. ScrollTrigger for Quick Categories Bar
      if (quickCatsRef.current) {
        gsap.from(quickCatsRef.current.querySelectorAll('.quick-cat-card'), {
          scrollTrigger: {
            trigger: quickCatsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          y: 35,
          opacity: 0,
          stagger: 0.05,
          duration: 0.7,
          ease: 'power2.out'
        });
      }

      // 3. ScrollTrigger for Best Sellers Section Header
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

      // 4. Section Reveals
      gsap.utils.toArray('.reveal-section').forEach((sec) => {
        gsap.from(sec, {
          scrollTrigger: {
            trigger: sec,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-page-wrap" ref={heroRef}>
      {/* ========================================================
          1. CINEMATIC HERO SECTION (MATCHING USER MOCKUP EXACTLY)
          ======================================================== */}
      <section className="mockup-cinematic-hero">
        <div className="hero-dark-atmosphere-bg"></div>
        <div className="hero-red-ambient-flare"></div>

        <div className="container mockup-hero-container">
          {/* Athlete Visual on Left (Kevin with red rim lighting) */}
          <div className="mockup-hero-athlete-col" ref={athleteRef}>
            <img 
              src="/assets/hero/hero-athlete-kevin.png" 
              alt="Oliver Athlete Kevin aesthetic"
              className="mockup-hero-athlete-img"
              loading="eager"
            />
          </div>

          {/* Center Brand Typography & Badges */}
          <div className="mockup-hero-center-col">
            <span className="hero-tracking-tag">OLIVER SUPPLEMENT SHOP</span>
            
            <h1 className="mockup-hero-headline">
              <span className="hero-headline-line line-1" ref={headlineLine1Ref}>
                <span className="hero-word">FUEL</span>{' '}
                <span className="hero-word">YOUR</span>{' '}
                <span className="hero-word highlight-red">BODY</span>
              </span>
              <span className="hero-headline-line line-2" ref={headlineLine2Ref}>
                <span className="hero-word">BUILD</span>{' '}
                <span className="hero-word">YOUR</span>{' '}
                <span className="hero-word highlight-red">BEST</span>
              </span>
            </h1>

            {/* 3 Quality Badges (Matching Mockup) */}
            <div className="mockup-hero-badges-row" ref={badgesRef}>
              <div className="hero-quality-badge">
                <div className="badge-icon-box">
                  <Flame size={15} />
                </div>
                <span className="badge-name">QUALITY</span>
              </div>

              <div className="hero-quality-badge">
                <div className="badge-icon-box">
                  <Zap size={15} />
                </div>
                <span className="badge-name">STRENGTH</span>
              </div>

              <div className="hero-quality-badge">
                <div className="badge-icon-box">
                  <ShieldCheck size={15} />
                </div>
                <span className="badge-name">PERFORMANCE</span>
              </div>
            </div>

            {/* Glowing Red CTA Button (Matching Mockup) */}
            <div className="mockup-hero-cta-wrap" ref={ctaRef}>
              <Link to="/shop" className="mockup-hero-shop-btn">
                <span>SHOP NOW</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Oliver Whey Protein Tub with Chocolate Splash on Right */}
          <div className="mockup-hero-tub-col" ref={tubRef}>
            <img 
              src="/assets/hero/hero-whey-tub.png" 
              alt="OLIVER Whey Protein Chocolate Flavour"
              className="mockup-hero-tub-img"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          2. QUICK CATEGORIES BAR (MATCHING MOCKUP 10 TILES)
          ======================================================== */}
      <section className="quick-categories-bar-section" ref={quickCatsRef}>
        <div className="container">
          <div className="quick-categories-scroll-row">
            {quickCategories.map((cat, idx) => (
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
          3. BEST SELLERS SWIPER SLIDER (MATCHING MOCKUP EXACTLY)
          ======================================================== */}
      <section className="bestsellers-swiper-section reveal-section" ref={bestSellersHeaderRef}>
        <div className="container">
          {/* Header matching mockup: Red vertical bar + italic title + view all pill */}
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
                480: { slidesPerView: 2.2, spaceBetween: 14 },
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
          4. CINEMATIC 3-SLIDE PROMOTIONAL SHOWCASE (SPEC #5)
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
              spaceBetween={16}
              slidesPerView={2.5}
              breakpoints={{
                480: { slidesPerView: 3.5, spaceBetween: 16 },
                768: { slidesPerView: 4.5, spaceBetween: 20 },
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
              spaceBetween={20}
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
