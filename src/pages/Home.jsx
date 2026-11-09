import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { api } from '../services/api.js';
import ProductGrid from '../components/ProductGrid.jsx';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Zap, 
  Award,
  Sparkles,
  Check
} from 'lucide-react';

export default function Home({ onOpenSizeGuide }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  // Hero Banners Slider
  const heroBanners = [
    {
      id: 1,
      image: "assets/banners/desktop/Web-Banner-06-10-26-_Desktop_-_Main-Banner_.jpg_158ea.jpg",
      mobileImage: "assets/banners/mobile/Web-Banner-06-10-26-_Mobile_-_Main-Banner_.jpg_1_9131220d-650e-4f5c-926b-d7b364248d41561a.jpg",
      subtitle: "AUTUMN / WINTER 2026",
      title: "ARCHITECTURAL ATHLETIC COUTURE",
      description: "Drop-shoulder heavyweight streetwear engineered for maximum silhouette drape and gym durability.",
      link: "/category/oversized",
      btnText: "EXPLORE OVERSIZED"
    },
    {
      id: 2,
      image: "assets/banners/desktop/Web-Banner-04-11-26-_Desktop_-_Running__jpg_29808428-b8eb-4329-ba16-134e3abbb28a7e28.jpg",
      mobileImage: "assets/banners/mobile/Web-Banner-04-11-26-_Mobile_-_Running__jpg_eae16368-80d5-42aa-98c2-c23b29812ef8c1b8.jpg",
      subtitle: "COMPRESSION DIVISION",
      title: "SECOND-SKIN ANATOMICAL PERFORMANCE",
      description: "Graduated vascular support panels engineered to maximize oxygen delivery during heavy training.",
      link: "/category/compression",
      btnText: "DISCOVER COMPRESSION"
    },
    {
      id: 3,
      image: "assets/banners/desktop/Web-Banner-09-07-26-_Womens_-_Desktop__jpg8bb8.jpg",
      mobileImage: "assets/banners/mobile/Web-Banner-09-07-26-_Womens_-_Mobile__jpg045a.jpg",
      subtitle: "WOMEN'S SCULPT SERIES",
      title: "HIGH-IMPACT ATHLETIC SILHOUETTES",
      description: "Squat-proof sculpt leggings and engineered high-support crossover sports bras.",
      link: "/category/womens",
      btnText: "SHOP WOMEN'S"
    }
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  // Featured Spotlight State (Repvault Aesthetic Hooded Zip-Up)
  const spotlightGallery = [
    "assets/featured/zipup-main.jpg",
    "assets/featured/zipup-thumb-1.jpg",
    "assets/featured/zipup-thumb-2.jpg",
    "assets/featured/zipup-thumb-3.jpg"
  ];
  const [spotlightActiveImg, setSpotlightActiveImg] = useState(spotlightGallery[0]);
  const [spotlightColor, setSpotlightColor] = useState('Chalk Beige');
  const [spotlightSize, setSpotlightSize] = useState('M');
  const [spotlightAdded, setSpotlightAdded] = useState(false);

  // Men's Tab Featured Products
  const [menTab, setMenTab] = useState('oversized');
  const [menProducts, setMenProducts] = useState([]);
  const [loadingMen, setLoadingMen] = useState(true);

  // Bestsellers & Trending Drops
  const [bestsellers, setBestsellers] = useState([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoadingMen(true);
      const mProducts = await api.getProducts({ category: menTab, limit: 4 });
      setMenProducts(mProducts);
      setLoadingMen(false);
    }
    loadData();
  }, [menTab]);

  useEffect(() => {
    async function loadBestsellers() {
      setLoadingBestsellers(true);
      const bProducts = await api.getProducts({ featured: true, limit: 8 });
      setBestsellers(bProducts);
      setLoadingBestsellers(false);
    }
    loadBestsellers();
  }, []);

  const handleSpotlightAddToCart = () => {
    const spotlightProduct = {
      id: "rv-hd-01",
      name: "Repvault Aesthetic Hooded Zip-Up",
      categoryName: "Hoodies & Jackets",
      price: 1299,
      originalPrice: 2499,
      primaryImage: spotlightActiveImg
    };
    addToCart(spotlightProduct, spotlightSize, spotlightColor, 1);
    setSpotlightAdded(true);
    setTimeout(() => setSpotlightAdded(false), 2000);
  };

  const handleSpotlightBuyNow = () => {
    handleSpotlightAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="home-page">
      {/* 1. HERO CAMPAIGN SLIDER */}
      <section className="hero-section">
        {heroBanners.map((banner, idx) => (
          <div 
            key={banner.id} 
            className={`hero-slide ${idx === currentHero ? 'active' : ''}`}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet={`/${banner.mobileImage}`} />
              <img 
                src={`/${banner.image}`} 
                alt={banner.title} 
                className="hero-banner-img"
              />
            </picture>
            <div className="hero-overlay">
              <div className="container hero-content">
                <span className="hero-subtitle">{banner.subtitle}</span>
                <h1 className="hero-title">{banner.title}</h1>
                <p className="hero-desc">{banner.description}</p>
                <div className="hero-cta-group">
                  <Link to={banner.link} className="btn btn-primary hero-btn">
                    {banner.btnText} <ArrowRight size={18} />
                  </Link>
                  <Link to="/shop" className="btn btn-outline-white hero-btn">
                    VIEW ALL PRODUCTS
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Hero Slider Controls */}
        <button 
          className="hero-arrow hero-prev" 
          onClick={() => setCurrentHero((currentHero - 1 + heroBanners.length) % heroBanners.length)}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          className="hero-arrow hero-next" 
          onClick={() => setCurrentHero((currentHero + 1) % heroBanners.length)}
          aria-label="Next Slide"
        >
          <ChevronRight size={28} />
        </button>

        <div className="hero-dots">
          {heroBanners.map((_, i) => (
            <button 
              key={i} 
              className={`hero-dot ${i === currentHero ? 'active' : ''}`}
              onClick={() => setCurrentHero(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. PROMO RIBBON */}
      <section className="promo-ribbon">
        <div className="ribbon-ticker">
          <span>• 260 GSM HEAVYWEIGHT DROP SHOULDER SILHOUETTES</span>
          <span>• GRADUATED COMPRESSION RASHGUARDS</span>
          <span>• 100% SQUAT-PROOF SCULPT ACTIVEWEAR</span>
          <span>• FREE EXPRESS SHIPPING OVER ₹1,000</span>
          <span>• CASH ON DELIVERY AVAILABLE ALL-INDIA</span>
          <span>• ENGINEERED ATHLETIC DIVISION 2026</span>
        </div>
      </section>

      {/* 3. EXPLORE BY CATEGORY */}
      <section className="container section-pad" id="explore-categories">
        <div className="section-header text-center">
          <span className="section-eyebrow">CURATED DIVISIONS</span>
          <h2 className="section-headline">EXPLORE BY CATEGORY</h2>
          <p className="section-subtext">Precision-engineered collections designed for power, form, and athletic aesthetics.</p>
        </div>

        <div className="category-tiles-grid">
          <Link to="/category/oversized" className="category-tile large-tile">
            <img src="/assets/categories/oversized/repvault-oversized-lookbook-black.jpg" alt="Oversized Streetwear" />
            <div className="category-tile-overlay">
              <span className="cat-count">8 STYLES</span>
              <h3>MEN'S OVERSIZED</h3>
              <span className="cat-action">Shop Division &rarr;</span>
            </div>
          </Link>

          <Link to="/category/compression" className="category-tile">
            <img src="/assets/categories/compression/repvault-compression-short-black.jpg" alt="Compression Tech" />
            <div className="category-tile-overlay">
              <span className="cat-count">8 STYLES</span>
              <h3>COMPRESSION WEAR</h3>
              <span className="cat-action">Shop Division &rarr;</span>
            </div>
          </Link>

          <Link to="/category/joggers" className="category-tile">
            <img src="/assets/categories/joggers/Category_Banners_JOGGERS__jpgb5f9.jpg" alt="Joggers & Tracks" />
            <div className="category-tile-overlay">
              <span className="cat-count">8 STYLES</span>
              <h3>JOGGERS & TRACKS</h3>
              <span className="cat-action">Shop Division &rarr;</span>
            </div>
          </Link>

          <Link to="/category/womens" className="category-tile large-tile">
            <img src="/assets/categories/womens/repvault-womens-banner-3bc0d.jpg" alt="Women's Activewear" />
            <div className="category-tile-overlay">
              <span className="cat-count">8 STYLES</span>
              <h3>WOMEN'S ACTIVEWEAR</h3>
              <span className="cat-action">Shop Division &rarr;</span>
            </div>
          </Link>

          <Link to="/category/t-shirts" className="category-tile">
            <img src="/assets/categories/t-shirts/Category_Banners_TSHIRT__jpgd40f.jpg" alt="Gym T-Shirts & Polos" />
            <div className="category-tile-overlay">
              <span className="cat-count">8 STYLES</span>
              <h3>GYM TEES & POLOS</h3>
              <span className="cat-action">Shop Division &rarr;</span>
            </div>
          </Link>

          <Link to="/category/hoodies" className="category-tile">
            <img src="/assets/featured/zipup-main.jpg" alt="Aesthetic Hoodies" />
            <div className="category-tile-overlay">
              <span className="cat-count">8 STYLES</span>
              <h3>HOODIES & ZIP-UPS</h3>
              <span className="cat-action">Shop Division &rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. FEATURED PRODUCT SPOTLIGHT (Repvault Aesthetic Hooded Zip-Up) */}
      <section className="featured-spotlight-section">
        <div className="container">
          <div className="featured-spotlight-card">
            {/* Gallery Multi-Angle Split */}
            <div className="featured-gallery-split">
              {/* Vertical Thumbnails Stack */}
              <div className="featured-thumbs-stack">
                {spotlightGallery.map((imgUrl, i) => (
                  <div 
                    key={i} 
                    className={`thumb-box ${spotlightActiveImg === imgUrl ? 'active' : ''}`}
                    onClick={() => setSpotlightActiveImg(imgUrl)}
                  >
                    <img src={`/${imgUrl}`} alt={`Repvault Zip-Up View ${i + 1}`} />
                  </div>
                ))}
              </div>

              {/* Main Large Image */}
              <div className="featured-main-image-wrap">
                <img 
                  src={`/${spotlightActiveImg}`} 
                  alt="Repvault Aesthetic Hooded Zip-Up" 
                  className="featured-main-img" 
                />
                <span className="featured-floating-tag">BESTSELLER DROP</span>
              </div>
            </div>

            {/* Product Configuration Info */}
            <div className="featured-spotlight-info">
              <div className="spotlight-header-top">
                <span className="spotlight-eyebrow">NEW ARRIVALS SPOTLIGHT</span>
                <div className="spotlight-nav-arrows">
                  <button className="spotlight-arrow" onClick={() => {
                    const idx = spotlightGallery.indexOf(spotlightActiveImg);
                    setSpotlightActiveImg(spotlightGallery[(idx - 1 + spotlightGallery.length) % spotlightGallery.length]);
                  }}>
                    <ChevronLeft size={18} />
                  </button>
                  <button className="spotlight-arrow" onClick={() => {
                    const idx = spotlightGallery.indexOf(spotlightActiveImg);
                    setSpotlightActiveImg(spotlightGallery[(idx + 1) % spotlightGallery.length]);
                  }}>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <h2 className="spotlight-title">Repvault Aesthetic Hooded Zip-Up</h2>

              <div className="spotlight-price-row">
                <span className="spotlight-price">₹1,299</span>
                <span className="spotlight-orig-price">₹2,499</span>
                <span className="spotlight-discount-badge">SAVE 48%</span>
              </div>

              {/* Color Selection */}
              <div className="spotlight-option-block">
                <span className="option-label">COLOR: <strong>{spotlightColor.toUpperCase()}</strong></span>
                <div className="color-selector-pills">
                  <button 
                    className={`color-pill-btn ${spotlightColor === 'Chalk Beige' ? 'active' : ''}`}
                    onClick={() => {
                      setSpotlightColor('Chalk Beige');
                      setSpotlightActiveImg('assets/featured/zipup-main.jpg');
                    }}
                    title="Chalk Beige"
                  >
                    <span className="pill-circle" style={{ backgroundColor: '#eae4d5' }}></span>
                  </button>
                  <button 
                    className={`color-pill-btn ${spotlightColor === 'Midnight Black' ? 'active' : ''}`}
                    onClick={() => {
                      setSpotlightColor('Midnight Black');
                      setSpotlightActiveImg('assets/featured/zipup-thumb-2.jpg');
                    }}
                    title="Midnight Black"
                  >
                    <span className="pill-circle" style={{ backgroundColor: '#111113' }}></span>
                  </button>
                  <button 
                    className={`color-pill-btn ${spotlightColor === 'Heather Mist' ? 'active' : ''}`}
                    onClick={() => {
                      setSpotlightColor('Heather Mist');
                      setSpotlightActiveImg('assets/featured/zipup-thumb-3.jpg');
                    }}
                    title="Heather Mist"
                  >
                    <span className="pill-circle" style={{ backgroundColor: '#d5d7dc' }}></span>
                  </button>
                </div>
              </div>

              {/* Size Selection */}
              <div className="spotlight-option-block">
                <div className="size-header-row">
                  <span className="option-label">SIZE: <strong>{spotlightSize}</strong></span>
                  <button 
                    className="size-guide-link-btn"
                    onClick={() => onOpenSizeGuide?.()}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="size-buttons-row">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${spotlightSize === size ? 'active' : ''}`}
                      onClick={() => setSpotlightSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="spotlight-actions">
                <button 
                  className="btn btn-primary spotlight-add-btn"
                  onClick={handleSpotlightAddToCart}
                >
                  <ShoppingBag size={18} />
                  <span>{spotlightAdded ? 'ADDED TO BAG!' : 'ADD TO CART'}</span>
                </button>
                <button 
                  className="btn btn-outline spotlight-buy-btn"
                  onClick={handleSpotlightBuyNow}
                >
                  BUY NOW
                </button>
                <button 
                  className={`btn-wishlist-spotlight ${isWishlisted('rv-hd-01') ? 'active' : ''}`}
                  onClick={() => toggleWishlist({
                    id: "rv-hd-01",
                    name: "Repvault Aesthetic Hooded Zip-Up",
                    price: 1299,
                    primaryImage: spotlightActiveImg
                  })}
                  aria-label="Wishlist"
                >
                  <Heart size={20} fill={isWishlisted('rv-hd-01') ? "#e11d48" : "none"} color={isWishlisted('rv-hd-01') ? "#e11d48" : "#111111"} />
                </button>
              </div>

              {/* Value Bullet Points */}
              <div className="spotlight-perks">
                <div className="perk-item">
                  <Check size={16} /> <span>Two-way matte gunmetal YKK zipper</span>
                </div>
                <div className="perk-item">
                  <Check size={16} /> <span>360 GSM French terry structured double-hood</span>
                </div>
                <div className="perk-item">
                  <Check size={16} /> <span>Integrated thumbholes & athletic crop drape</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MEN'S COLLECTION DIVISION */}
      <section className="container section-pad">
        <div className="section-header-split">
          <div>
            <span className="section-eyebrow">MEN'S ATHLETIC DIVISION</span>
            <h2 className="section-headline">BUILT FOR POWER & REFINEMENT</h2>
          </div>
          {/* Category Tabs */}
          <div className="gender-tabs">
            <button 
              className={`gender-tab ${menTab === 'oversized' ? 'active' : ''}`}
              onClick={() => setMenTab('oversized')}
            >
              Oversized Tees
            </button>
            <button 
              className={`gender-tab ${menTab === 'compression' ? 'active' : ''}`}
              onClick={() => setMenTab('compression')}
            >
              Compression
            </button>
            <button 
              className={`gender-tab ${menTab === 't-shirts' ? 'active' : ''}`}
              onClick={() => setMenTab('t-shirts')}
            >
              Polos & Tees
            </button>
            <button 
              className={`gender-tab ${menTab === 'joggers' ? 'active' : ''}`}
              onClick={() => setMenTab('joggers')}
            >
              Cargo Joggers
            </button>
          </div>
        </div>

        <ProductGrid products={menProducts} loading={loadingMen} count={4} />

        <div className="text-center mt-32">
          <Link to={`/category/${menTab}`} className="btn btn-outline">
            VIEW ALL {menTab.toUpperCase()} ({8}) &rarr;
          </Link>
        </div>
      </section>

      {/* 6. TECHNICAL PERFORMANCE EDITORIAL BANNER */}
      <section className="editorial-banner-section">
        <div className="container editorial-inner">
          <div className="editorial-content">
            <span className="editorial-tag">TEXTILE ENGINEERING</span>
            <h2>VAULT ARMOR-WEAVE & AEROVENT TECH</h2>
            <p>
              Every Repvault garment undergoes bio-polishing, silver ion antimicrobial infusion, and high-tenacity tension testing. Built to withstand knurled barbells, explosive sprints, and relentless wash cycles.
            </p>
            <div className="editorial-features-grid">
              <div className="feat-box">
                <h4>260+ GSM</h4>
                <p>Dense compact combed cotton with structural rigidity</p>
              </div>
              <div className="feat-box">
                <h4>Omnistretch</h4>
                <p>4-way recovery memory that prevents neckline curling</p>
              </div>
              <div className="feat-box">
                <h4>Silver-Ion</h4>
                <p>Permanent microbial anti-odor yarn integration</p>
              </div>
            </div>
            <Link to="/shop" className="btn btn-primary mt-24">
              EXPERIENCE THE FABRIC &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* 7. BESTSELLERS & TRENDING DROPS */}
      <section className="container section-pad">
        <div className="section-header text-center">
          <span className="section-eyebrow">TRENDING ACROSS INDIA</span>
          <h2 className="section-headline">REPVAULT BESTSELLERS</h2>
          <p className="section-subtext">The most coveted high-performance athletic apparel of the season.</p>
        </div>

        <ProductGrid products={bestsellers} loading={loadingBestsellers} count={8} />
      </section>

      {/* 8. TRUST STRIP */}
      <section className="trust-strip-section">
        <div className="container trust-strip-grid">
          <div className="trust-card">
            <ShieldCheck size={32} />
            <div>
              <h4>Architectural Quality</h4>
              <p>Heavyweight fabrics engineered with zero distortion</p>
            </div>
          </div>
          <div className="trust-card">
            <Truck size={32} />
            <div>
              <h4>Express 2-4 Day Delivery</h4>
              <p>Shipped directly from warehouse with live tracking</p>
            </div>
          </div>
          <div className="trust-card">
            <RotateCcw size={32} />
            <div>
              <h4>7-Day Doorstep Exchange</h4>
              <p>Effortless size swaps and customer care support</p>
            </div>
          </div>
          <div className="trust-card">
            <Zap size={32} />
            <div>
              <h4>Cash on Delivery</h4>
              <p>Pay upon delivery across 24,000+ Indian PIN codes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

