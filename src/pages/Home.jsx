import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { api } from '../services/api.js';
import ProductGrid from '../components/ProductGrid.jsx';

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
      link: "/category/oversized",
      alt: "REPVAULT High-Performance Athletic Campaign — Chase Greatness"
    },
    {
      id: 2,
      image: "assets/banners/desktop/Web-Banner-04-11-26-_Desktop_-_Running__jpg_29808428-b8eb-4329-ba16-134e3abbb28a7e28.jpg",
      mobileImage: "assets/banners/mobile/Web-Banner-04-11-26-_Mobile_-_Running__jpg_eae16368-80d5-42aa-98c2-c23b29812ef8c1b8.jpg",
      link: "/category/compression",
      alt: "REPVAULT Compression Technology — Second-Skin Performance"
    },
    {
      id: 3,
      image: "assets/banners/desktop/Web-Banner-09-07-26-_Womens_-_Desktop__jpg8bb8.jpg",
      mobileImage: "assets/banners/mobile/Web-Banner-09-07-26-_Womens_-_Mobile__jpg045a.jpg",
      link: "/category/womens",
      alt: "REPVAULT Women's Activewear Collection"
    }
  ];

  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero(prev => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBanners.length]);

  // -------------------------------------------------------------
  // MEN'S SPOTLIGHT (UPPER SECTION)
  // -------------------------------------------------------------
  const menThumbs = [
    "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
    "assets/categories/oversized/repvault-oversized-tee-black.jpg",
    "assets/categories/oversized/repvault-oversized-tee-detail.jpg",
    "assets/categories/oversized/oversized-back-1.jpg"
  ];
  const [menActiveImg, setMenActiveImg] = useState(menThumbs[0]);
  const [menColor, setMenColor] = useState('Stealth Black');
  const [menSize, setMenSize] = useState('M');

  const handleMenPrevImg = () => {
    const idx = menThumbs.indexOf(menActiveImg);
    const prev = (idx - 1 + menThumbs.length) % menThumbs.length;
    setMenActiveImg(menThumbs[prev]);
  };

  const handleMenNextImg = () => {
    const idx = menThumbs.indexOf(menActiveImg);
    const next = (idx + 1) % menThumbs.length;
    setMenActiveImg(menThumbs[next]);
  };

  const handleAddSpotlightMen = () => {
    addToCart({
      id: "rv-ov-01",
      name: "Vault OG Dropped-Shoulder Heavyweight Tee",
      categoryName: "Men's Oversized Tees",
      price: 1299,
      originalPrice: 2299,
      primaryImage: menActiveImg
    }, menSize, menColor, 1);
  };

  // -------------------------------------------------------------
  // WOMEN'S SPOTLIGHT (BOTTOM SECTION)
  // -------------------------------------------------------------
  const womenThumbs = [
    "assets/featured/zipup-main.jpg",
    "assets/featured/zipup-thumb-1.jpg",
    "assets/featured/zipup-thumb-2.jpg",
    "assets/featured/zipup-thumb-3.jpg"
  ];
  const [womenActiveImg, setWomenActiveImg] = useState(womenThumbs[0]);
  const [womenColor, setWomenColor] = useState('CHALK BEIGE');
  const [womenSize, setWomenSize] = useState('M');

  const handleWomenPrevImg = () => {
    const idx = womenThumbs.indexOf(womenActiveImg);
    const prev = (idx - 1 + womenThumbs.length) % womenThumbs.length;
    setWomenActiveImg(womenThumbs[prev]);
  };

  const handleWomenNextImg = () => {
    const idx = womenThumbs.indexOf(womenActiveImg);
    const next = (idx + 1) % womenThumbs.length;
    setWomenActiveImg(womenThumbs[next]);
  };

  const handleAddSpotlightWomen = () => {
    addToCart({
      id: "rv-hd-01",
      name: "Repvault Aesthetic Hooded Zip-Up",
      categoryName: "Hoodies & Jackets",
      price: 1299,
      originalPrice: 2499,
      primaryImage: womenActiveImg
    }, womenSize, womenColor, 1);
  };

  // -------------------------------------------------------------
  // CATALOG PRODUCTS FETCHING
  // -------------------------------------------------------------
  const [bestsellers, setBestsellers] = useState([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);

  const [menProducts, setMenProducts] = useState([]);
  const [loadingMen, setLoadingMen] = useState(true);

  const [womenProducts, setWomenProducts] = useState([]);
  const [loadingWomen, setLoadingWomen] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingBestsellers(true);
        const b = await api.getProducts({ featured: true, limit: 8 });
        setBestsellers(b || []);
      } finally {
        setLoadingBestsellers(false);
      }

      try {
        setLoadingMen(true);
        const m = await api.getProducts({ gender: 'men', limit: 4 });
        setMenProducts(m || []);
      } finally {
        setLoadingMen(false);
      }

      try {
        setLoadingWomen(true);
        const w = await api.getProducts({ category: 'womens', limit: 4 });
        setWomenProducts(w || []);
      } finally {
        setLoadingWomen(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="home-page-wrap">
      {/* 1. HERO CAMPAIGN BANNER SLIDER */}
      <section className="hero-section">
        <Link to={heroBanners[currentHero].link} className="hero-banner-link" aria-label="Shop Campaign">
          <picture>
            <source media="(max-width: 768px)" srcSet={`/${heroBanners[currentHero].mobileImage}`} />
            <img 
              src={`/${heroBanners[currentHero].image}`} 
              alt={heroBanners[currentHero].alt} 
              className="hero-banner-img" 
              loading="eager" 
              fetchpriority="high" 
            />
          </picture>
        </Link>
        <button 
          className="hero-arrow-btn prev" 
          aria-label="Previous Campaign Banner"
          onClick={(e) => {
            e.preventDefault();
            setCurrentHero((currentHero - 1 + heroBanners.length) % heroBanners.length);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button 
          className="hero-arrow-btn next" 
          aria-label="Next Campaign Banner"
          onClick={(e) => {
            e.preventDefault();
            setCurrentHero((currentHero + 1) % heroBanners.length);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <div className="hero-dots-indicator">
          {heroBanners.map((_, i) => (
            <span 
              key={i} 
              className={`hero-dot ${i === currentHero ? 'active' : ''}`}
              onClick={() => setCurrentHero(i)}
            />
          ))}
        </div>
      </section>

      {/* 2. EXPLORE BY CATEGORY (5-Col Grid matching original design) */}
      <section className="container explore-cat-section" id="explore-by-category">
        <div className="explore-cat-header">
          <div className="explore-cat-title-wrap">
            <span className="subtitle">EXPLORE</span>
            <h2 className="title">BY CATEGORY</h2>
          </div>
          <Link to="/shop" className="explore-view-all-link">
            VIEW ALL
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        <div className="explore-5col-grid">
          {/* 1. T-SHIRTS */}
          <Link to="/category/t-shirts" className="explore-cat-card">
            <img src="/assets/categories/t-shirts/Category_Banners_TSHIRT__jpgd40f.jpg" alt="T-Shirts" loading="lazy" />
            <div className="explore-cat-overlay"></div>
            <div className="explore-cat-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
              </svg>
              T-SHIRTS
            </div>
          </Link>

          {/* 2. JOGGERS */}
          <Link to="/category/joggers" className="explore-cat-card">
            <img src="/assets/categories/joggers/Category_Banners_JOGGERS__jpgb5f9.jpg" alt="Joggers" loading="lazy" />
            <div className="explore-cat-overlay"></div>
            <div className="explore-cat-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L4 22h4l2-10 2 10h4l-2-20z"/>
              </svg>
              JOGGERS
            </div>
          </Link>

          {/* 3. STRINGERS */}
          <Link to="/category/stringers" className="explore-cat-card">
            <img src="/assets/categories/stringers/Category_Banners_STRINGERS__jpgd40f.jpg" alt="Stringers" loading="lazy" />
            <div className="explore-cat-overlay"></div>
            <div className="explore-cat-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              </svg>
              STRINGERS
            </div>
          </Link>

          {/* 4. SHORTS */}
          <Link to="/category/shorts" className="explore-cat-card">
            <img src="/assets/categories/shorts/Category_Banners_SHORTS__jpg_4c2913df-c57c-4ef3-8d45-4290e386e79af553.jpg" alt="Shorts" loading="lazy" />
            <div className="explore-cat-overlay"></div>
            <div className="explore-cat-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 4h18v10l-4 6-5-3-5 3-4-6V4z"/>
              </svg>
              SHORTS
            </div>
          </Link>

          {/* 5. WOMEN */}
          <Link to="/category/womens" className="explore-cat-card">
            <img src="/assets/categories/womens/Nav-Bar-Banners-_Womens_-_800-x-458_-_01__jpgc804.jpg" alt="Women" loading="lazy" />
            <div className="explore-cat-overlay"></div>
            <div className="explore-cat-badge">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="7"/>
                <path d="M12 19v3M9 22h6"/>
              </svg>
              WOMEN
            </div>
          </Link>
        </div>
      </section>

      {/* 3. MEN'S SPOTLIGHT SECTION (UPPER SECTION) */}
      <section className="container featured-spotlight-section" id="mens-spotlight">
        <div className="featured-spotlight-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div className="featured-spotlight-title-wrap">
            <span className="subtitle">FEATURED DROP — MEN'S DIVISION</span>
            <h2 className="title">New Arrivals</h2>
          </div>
          <Link to="/shop?gender=men" className="explore-view-all-link" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111' }}>
            VIEW ALL MEN'S &rarr;
          </Link>
        </div>

        <div className="featured-spotlight-card">
          {/* Gallery Split */}
          <div className="featured-gallery-split">
            <div className="featured-thumbs-stack">
              {menThumbs.map((thumb, idx) => (
                <div 
                  key={idx} 
                  className={`featured-thumb-item ${menActiveImg === thumb ? 'active' : ''}`}
                  onClick={() => setMenActiveImg(thumb)}
                >
                  <img src={`/${thumb}`} alt={`Men Drop Angle ${idx + 1}`} />
                </div>
              ))}
            </div>
            <div className="featured-main-image-wrap">
              <img src={`/${menActiveImg}`} alt="Vault OG Dropped-Shoulder Heavyweight Tee" />
            </div>
          </div>

          {/* Product Info & Actions */}
          <div className="featured-spotlight-info">
            <div className="featured-spotlight-top">
              <h3 className="featured-spotlight-title">Vault OG Dropped-Shoulder<br />Heavyweight Tee</h3>
              <div className="featured-nav-arrows">
                <button 
                  className="featured-nav-btn" 
                  aria-label="Previous Image"
                  onClick={handleMenPrevImg}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button 
                  className="featured-nav-btn" 
                  aria-label="Next Image"
                  onClick={handleMenNextImg}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="featured-spotlight-price">&#8377;1,299</div>
              <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through' }}>&#8377;2,299</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e11d48', background: '#ffe4e6', padding: '3px 8px', borderRadius: '4px' }}>43% OFF</span>
            </div>

            {/* Color Swatches */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                Color: <span style={{ color: '#141416' }}>{menColor}</span>
              </div>
              <div className="featured-color-selector">
                <div 
                  className={`featured-color-dot ${menColor === 'Stealth Black' ? 'active' : ''}`}
                  style={{ background: '#111111' }} 
                  title="Stealth Black" 
                  onClick={() => {
                    setMenColor('Stealth Black');
                    setMenActiveImg('assets/categories/oversized/repvault-oversized-lookbook-black.jpg');
                  }}
                />
                <div 
                  className={`featured-color-dot ${menColor === 'Washed Charcoal' ? 'active' : ''}`}
                  style={{ background: '#2E3033' }} 
                  title="Washed Charcoal" 
                  onClick={() => {
                    setMenColor('Washed Charcoal');
                    setMenActiveImg('assets/categories/oversized/repvault-oversized-tee-black.jpg');
                  }}
                />
                <div 
                  className={`featured-color-dot ${menColor === 'Military Olive' ? 'active' : ''}`}
                  style={{ background: '#444C38' }} 
                  title="Military Olive" 
                  onClick={() => {
                    setMenColor('Military Olive');
                    setMenActiveImg('assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg287f.jpg');
                  }}
                />
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
                  Size: <span style={{ color: '#141416' }}>{menSize}</span>
                </div>
                {onOpenSizeGuide && (
                  <button 
                    onClick={onOpenSizeGuide}
                    style={{ background: 'none', border: 'none', color: '#003B5C', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="featured-size-selector">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button 
                    key={size}
                    className={`featured-size-btn ${menSize === size ? 'active' : ''}`}
                    onClick={() => setMenSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="featured-actions-row">
              <button className="featured-add-cart-btn" onClick={handleAddSpotlightMen}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                ADD TO CART
              </button>
              <button 
                className={`featured-wishlist-btn ${isWishlisted('rv-ov-01') ? 'active' : ''}`}
                onClick={() => toggleWishlist({
                  id: "rv-ov-01",
                  name: "Vault OG Dropped-Shoulder Heavyweight Tee",
                  price: 1299,
                  primaryImage: menActiveImg
                })}
                aria-label="Save to Wishlist" 
                title="Save to Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted('rv-ov-01') ? "#e11d48" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '4px' }}>
              <Link to="/product/rv-ov-01" style={{ color: '#003B5C', fontWeight: 600 }}>
                View Full Product Specs &amp; Sizing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS & TRENDING DROPS */}
      <section className="container section" style={{ padding: '40px 24px 60px' }}>
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <span className="subtitle">FEATURED COLLECTION</span>
          <h2 className="title">Bestsellers &amp; Trending Drops</h2>
        </div>
        <ProductGrid products={bestsellers} loading={loadingBestsellers} count={8} />
      </section>

      {/* 5. SHOP MEN'S ATHLETIC DIVISION */}
      <section className="container section-alt" style={{ padding: '60px 24px', borderRadius: '12px', marginBottom: '40px' }}>
        <div className="section-header" style={{ marginBottom: '28px' }}>
          <span className="subtitle">MEN'S COLLECTION</span>
          <h2 className="title">Engineered Heavyweight &amp; Performance Gear</h2>
        </div>
        <ProductGrid products={menProducts} loading={loadingMen} count={4} />
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/shop?gender=men" className="btn btn-outline" style={{ display: 'inline-flex', padding: '12px 32px' }}>
            VIEW ALL MEN'S APPAREL &rarr;
          </Link>
        </div>
      </section>

      {/* 6. WOMEN'S SPOTLIGHT SECTION (PLACED AT BOTTOM AS REQUESTED) */}
      <section className="container featured-spotlight-section women-spotlight-section" id="womens-spotlight">
        <div className="featured-spotlight-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
          <div className="featured-spotlight-title-wrap">
            <span className="subtitle">WOMEN'S DIVISION — SCULPT &amp; AESTHETIC DROP</span>
            <h2 className="title">Repvault Aesthetic &amp; Sculpt Collection</h2>
          </div>
          <Link to="/category/womens" className="explore-view-all-link" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111' }}>
            VIEW ALL WOMEN'S &rarr;
          </Link>
        </div>

        {/* Women's Spotlight Card */}
        <div className="featured-spotlight-card">
          {/* Gallery Split */}
          <div className="featured-gallery-split">
            <div className="featured-thumbs-stack">
              {womenThumbs.map((thumb, idx) => (
                <div 
                  key={idx} 
                  className={`featured-thumb-item ${womenActiveImg === thumb ? 'active' : ''}`}
                  onClick={() => setWomenActiveImg(thumb)}
                >
                  <img src={`/${thumb}`} alt={`Women Zip-Up Angle ${idx + 1}`} />
                </div>
              ))}
            </div>
            <div className="featured-main-image-wrap">
              <img src={`/${womenActiveImg}`} alt="Repvault Aesthetic Hooded Zip-Up" />
            </div>
          </div>

          {/* Product Info & Actions */}
          <div className="featured-spotlight-info">
            <div className="featured-spotlight-top">
              <h3 className="featured-spotlight-title">Repvault Aesthetic Hooded<br />Zip-Up</h3>
              <div className="featured-nav-arrows">
                <button 
                  className="featured-nav-btn" 
                  aria-label="Previous Image"
                  onClick={handleWomenPrevImg}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button 
                  className="featured-nav-btn" 
                  aria-label="Next Image"
                  onClick={handleWomenNextImg}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="featured-spotlight-price">&#8377;1,299</div>
              <span style={{ fontSize: '1rem', color: '#999', textDecoration: 'line-through' }}>&#8377;2,499</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#e11d48', background: '#ffe4e6', padding: '3px 8px', borderRadius: '4px' }}>48% OFF</span>
            </div>

            {/* Color Swatches */}
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                Color: <span style={{ color: '#141416' }}>{womenColor}</span>
              </div>
              <div className="featured-color-selector">
                <div 
                  className={`featured-color-dot ${womenColor === 'CHALK BEIGE' ? 'active' : ''}`}
                  style={{ background: '#eae4d5' }} 
                  title="CHALK BEIGE" 
                  onClick={() => {
                    setWomenColor('CHALK BEIGE');
                    setWomenActiveImg('assets/featured/zipup-main.jpg');
                  }}
                />
                <div 
                  className={`featured-color-dot ${womenColor === 'MIDNIGHT BLACK' ? 'active' : ''}`}
                  style={{ background: '#111111' }} 
                  title="MIDNIGHT BLACK" 
                  onClick={() => {
                    setWomenColor('MIDNIGHT BLACK');
                    setWomenActiveImg('assets/featured/zipup-thumb-2.jpg');
                  }}
                />
                <div 
                  className={`featured-color-dot ${womenColor === 'HEATHER MIST' ? 'active' : ''}`}
                  style={{ background: '#d5d7dc' }} 
                  title="HEATHER MIST" 
                  onClick={() => {
                    setWomenColor('HEATHER MIST');
                    setWomenActiveImg('assets/featured/zipup-thumb-3.jpg');
                  }}
                />
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', textTransform: 'uppercase' }}>
                  Size: <span style={{ color: '#141416' }}>{womenSize}</span>
                </div>
                {onOpenSizeGuide && (
                  <button 
                    onClick={onOpenSizeGuide}
                    style={{ background: 'none', border: 'none', color: '#003B5C', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Size Guide
                  </button>
                )}
              </div>
              <div className="featured-size-selector">
                {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                  <button 
                    key={size}
                    className={`featured-size-btn ${womenSize === size ? 'active' : ''}`}
                    onClick={() => setWomenSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="featured-actions-row">
              <button className="featured-add-cart-btn" onClick={handleAddSpotlightWomen}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                ADD TO CART
              </button>
              <button 
                className={`featured-wishlist-btn ${isWishlisted('rv-hd-01') ? 'active' : ''}`}
                onClick={() => toggleWishlist({
                  id: "rv-hd-01",
                  name: "Repvault Aesthetic Hooded Zip-Up",
                  price: 1299,
                  primaryImage: womenActiveImg
                })}
                aria-label="Save to Wishlist" 
                title="Save to Wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted('rv-hd-01') ? "#e11d48" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '4px' }}>
              <Link to="/product/rv-hd-01" style={{ color: '#003B5C', fontWeight: 600 }}>
                View Full Product Specs &amp; Sizing &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Curated Women's Collection Showcase Grid */}
        <div style={{ marginTop: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#141416', letterSpacing: '-0.3px', margin: 0 }}>
              Trending in Women's Activewear
            </h3>
            <span style={{ fontSize: '0.85rem', color: '#666' }}>Engineered High-Rise &amp; Sculpt Bras</span>
          </div>
          <ProductGrid products={womenProducts} loading={loadingWomen} count={4} />
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link to="/category/womens" className="btn btn-outline" style={{ display: 'inline-flex', padding: '12px 32px' }}>
              EXPLORE COMPLETE WOMEN'S COLLECTION &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
