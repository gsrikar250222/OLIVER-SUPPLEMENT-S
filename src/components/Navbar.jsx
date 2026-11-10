import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Award, 
  Percent,
  BookOpen
} from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ onOpenSearch, onOpenGuide }) {
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Handle sticky header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header-wrapper ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <nav className="navbar">
            {/* Mobile Hamburger Button */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* OLIVER Brand Logo */}
            <Link to="/" className="nav-brand" aria-label="OLIVER SUPPLEMENT SHOP">
              <img 
                src="/icons/logo.svg" 
                alt="OLIVER Supplement Shop" 
                height="44" 
                className="brand-logo-img"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="nav-menu">
              {/* Home */}
              <li className="nav-item">
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>

              {/* Shop */}
              <li className="nav-item">
                <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Shop <ChevronDown size={12} className="nav-chevron" />
                </NavLink>
              </li>

              {/* BRANDS Mega Menu */}
              <li 
                className="nav-item has-mega"
                onMouseEnter={() => setActiveDropdown('brands')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/brands" className="nav-link">
                  Brands <ChevronDown size={12} className="nav-chevron" />
                </Link>

                <div className={`nav-dropdown mega-menu brands-mega ${activeDropdown === 'brands' ? 'visible' : ''}`}>
                  <div className="brands-mega-grid">
                    {[
                      { name: 'OLIVER Pro Nutrition', tag: 'Flagship In-House', img: '/assets/brands/oliver.svg', link: '/shop?brand=OLIVER+Pro+Nutrition' },
                      { name: 'Optimum Nutrition', tag: 'Gold Standard', img: '/assets/brands/optimum-nutrition.svg', link: '/shop?brand=Optimum+Nutrition' },
                      { name: 'MuscleTech', tag: 'Nitro-Tech Science', img: '/assets/brands/muscletech.svg', link: '/shop?brand=MuscleTech' },
                      { name: 'Dymatize', tag: 'ISO-100 Leaders', img: '/assets/brands/dymatize.svg', link: '/shop?brand=Dymatize' },
                      { name: 'Myprotein', tag: 'Impact Whey', img: '/assets/brands/myprotein.svg', link: '/shop?brand=Myprotein' },
                      { name: 'Cellucor', tag: 'C4 Pre-Workout', img: '/assets/brands/cellucor.svg', link: '/shop?brand=Cellucor' },
                      { name: 'MuscleBlaze', tag: 'Biozyme Series', img: '/assets/brands/muscleblaze.svg', link: '/shop?brand=MuscleBlaze' },
                      { name: 'GNC', tag: 'Live Well Foundation', img: '/assets/brands/gnc.svg', link: '/shop?brand=GNC' }
                    ].map((b) => (
                      <Link key={b.name} to={b.link} className="brand-mega-card">
                        <span className="brand-card-name">{b.name}</span>
                        <span className="brand-card-tag">{b.tag}</span>
                      </Link>
                    ))}
                  </div>
                  <div className="mega-bottom-bar">
                    <Link to="/brands" className="view-all-brands-btn">
                      View All Certified Partner Brands &rarr;
                    </Link>
                  </div>
                </div>
              </li>

              {/* CATEGORIES Mega Menu */}
              <li 
                className="nav-item has-mega"
                onMouseEnter={() => setActiveDropdown('categories')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link to="/shop" className="nav-link">
                  Categories <ChevronDown size={12} className="nav-chevron" />
                </Link>

                <div className={`nav-dropdown mega-menu ${activeDropdown === 'categories' ? 'visible' : ''}`}>
                  <div className="mega-menu-grid">
                    {/* Column 1: Proteins */}
                    <div className="mega-col">
                      <div className="mega-heading">
                        <Flame size={15} className="mega-icon red" /> PROTEIN FORMULAS
                      </div>
                      <Link to="/category/whey-protein" className="dropdown-link">
                        Whey Protein <span className="badge-subtle">Top Choice</span>
                      </Link>
                      <Link to="/category/whey-isolate" className="dropdown-link">
                        Whey Protein Isolate <span className="badge-hot">90% Pure</span>
                      </Link>
                      <Link to="/category/mass-gainers" className="dropdown-link">
                        Mass Gainers (Calorie Dense)
                      </Link>
                      <Link to="/category/plant-protein" className="dropdown-link">
                        Organic Plant Protein
                      </Link>
                    </div>

                    {/* Column 2: Performance & Energy */}
                    <div className="mega-col">
                      <div className="mega-heading">
                        <Zap size={15} className="mega-icon" /> PERFORMANCE & PUMP
                      </div>
                      <Link to="/category/creatine" className="dropdown-link">
                        Creatine Monohydrate & Creapure
                      </Link>
                      <Link to="/category/pre-workout" className="dropdown-link">
                        High-Octane Pre-Workouts
                      </Link>
                      <Link to="/category/amino-acids" className="dropdown-link">
                        BCAA & EAA Amino Acids
                      </Link>
                      <Link to="/category/electrolytes" className="dropdown-link">
                        Electrolytes & Endurance
                      </Link>
                    </div>

                    {/* Column 3: Health & Wellness */}
                    <div className="mega-col">
                      <div className="mega-heading">
                        <ShieldCheck size={15} className="mega-icon green" /> HEALTH & LONGEVITY
                      </div>
                      <Link to="/category/vitamins-minerals" className="dropdown-link">
                        Daily Multivitamins & Minerals
                      </Link>
                      <Link to="/category/fish-oil-omega-3" className="dropdown-link">
                        Triple-Strength Fish Oil & Omega-3
                      </Link>
                      <Link to="/category/protein-bars-snacks" className="dropdown-link">
                        High-Protein Bars & Snacks
                      </Link>
                      <Link to="/category/healthy-foods" className="dropdown-link">
                        Clean Peanut Butter & Rolled Oats
                      </Link>
                    </div>

                    {/* Column 4: Featured Promo Card */}
                    <div className="mega-col promo-col">
                      <div className="mega-promo-card">
                        <span className="promo-badge">AUTHENTICITY</span>
                        <h4>100% Genuine Guaranteed</h4>
                        <p>Every batch verified with direct brand importer holograms and QR scratch codes.</p>
                        <Link to="/shop" className="promo-cta">
                          EXPLORE ALL 65 SUPPLEMENTS &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              {/* DEALS */}
              <li className="nav-item">
                <Link to="/shop?sort=discount" className="nav-link deals-link">
                  Deals
                </Link>
              </li>

              {/* ABOUT US */}
              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About Us
                </NavLink>
              </li>
            </ul>

            {/* Nav Search Pill (Matching Mockup) */}
            <div className="nav-search-pill" onClick={onOpenSearch} role="button" tabIndex={0}>
              <Search size={15} className="search-pill-icon" />
              <span className="search-pill-placeholder">Search supplements, brands...</span>
            </div>

            {/* Action Bar (Search, Nutrition Guide, Account, Wishlist, Cart) */}
            <div className="nav-actions">
              {/* Search Trigger */}
              <button 
                className="action-btn search-open-btn" 
                onClick={onOpenSearch}
                aria-label="Search Supplements" 
                title="Search Supplements"
              >
                <Search size={20} />
              </button>

              {/* Nutrition & Dosage Guide Trigger */}
              {onOpenGuide && (
                <button 
                  className="action-btn guide-open-btn" 
                  onClick={onOpenGuide}
                  aria-label="Dosage & Nutrition Calculator" 
                  title="Protein Calculator & Guide"
                >
                  <BookOpen size={20} />
                  <span className="guide-dot"></span>
                </button>
              )}

              {/* Account */}
              <Link 
                to={isAuthenticated ? "/account" : "/login"} 
                className="action-btn user-btn" 
                aria-label="User Account"
                title={isAuthenticated ? `Logged in as ${user?.name || 'Athlete'}` : "Login to Oliver"}
              >
                <User size={20} />
                {isAuthenticated && <span className="auth-indicator-dot"></span>}
              </Link>

              {/* Wishlist */}
              <Link 
                to="/wishlist" 
                className="action-btn wishlist-btn" 
                aria-label="Wishlist" 
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="action-badge wishlist-count">{wishlistCount}</span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button 
                className="action-btn cart-open-btn" 
                onClick={openCart}
                aria-label="Shopping Cart" 
                title="Shopping Bag"
              >
                <ShoppingBag size={20} />
                {totalItemsCount > 0 && (
                  <span className="action-badge cart-count">{totalItemsCount}</span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div 
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="mobile-brand" onClick={() => setMobileMenuOpen(false)}>
            <img src="/icons/logo.svg" alt="OLIVER Supplement Shop" height="36" />
          </Link>
          <button 
            className="mobile-close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-drawer-body">
          <div className="mobile-search-box" onClick={() => { setMobileMenuOpen(false); onOpenSearch(); }}>
            <Search size={16} />
            <span>Search 65+ supplements...</span>
          </div>

          <div className="mobile-links-list">
            <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>
              HOME
            </Link>
            <Link to="/shop" className="mobile-link highlight-red" onClick={() => setMobileMenuOpen(false)}>
              SHOP ALL SUPPLEMENTS
            </Link>

            <div className="mobile-accordion-section">
              <div className="mobile-section-title">TOP CATEGORIES</div>
              <Link to="/category/whey-protein" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Whey Protein Powders
              </Link>
              <Link to="/category/whey-isolate" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Whey Protein Isolate (90%+)
              </Link>
              <Link to="/category/mass-gainers" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Mass Gainers
              </Link>
              <Link to="/category/creatine" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Creatine Monohydrate & Creapure
              </Link>
              <Link to="/category/pre-workout" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; High-Stim Pre-Workout
              </Link>
              <Link to="/category/amino-acids" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; BCAA & EAA Amino Acids
              </Link>
              <Link to="/category/vitamins-minerals" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Daily Multivitamins & Minerals
              </Link>
              <Link to="/category/fish-oil-omega-3" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Fish Oil & Omega-3
              </Link>
              <Link to="/category/protein-bars-snacks" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Protein Bars & Snacks
              </Link>
            </div>

            <div className="mobile-accordion-section">
              <div className="mobile-section-title">CERTIFIED BRANDS</div>
              <Link to="/brands" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; View All 10 Brands
              </Link>
              <Link to="/shop?brand=Optimum+Nutrition" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Optimum Nutrition (ON)
              </Link>
              <Link to="/shop?brand=MuscleTech" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; MuscleTech
              </Link>
              <Link to="/shop?brand=Dymatize" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Dymatize
              </Link>
              <Link to="/shop?brand=OLIVER+Pro+Nutrition" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; OLIVER Pro Nutrition
              </Link>
            </div>

            <div className="mobile-accordion-section">
              <div className="mobile-section-title">CUSTOMER HELP & TRACKING</div>
              <Link to="/track-order" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Track Live Shipment
              </Link>
              <Link to="/about" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; About OLIVER Shop
              </Link>
              <Link to="/contact" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Contact Support (+91 98888 01234)
              </Link>
              <Link to="/faq" className="mobile-sublink" onClick={() => setMobileMenuOpen(false)}>
                &bull; Authenticity & FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="mobile-drawer-footer">
          <Link 
            to={isAuthenticated ? "/account" : "/login"} 
            className="mobile-account-cta" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={16} />
            <span>{isAuthenticated ? 'My Athlete Account' : 'Login / Register'}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
