import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ onOpenSearch }) {
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="header-wrapper">
        <div className="container">
          <nav className="navbar">
            {/* Brand Logo */}
            <Link to="/" className="nav-brand" aria-label="REPVAULT Home">
              <img src="/icons/logo.svg" alt="REPVAULT Logo" height="38" />
            </Link>

            {/* Desktop Navigation Categories */}
            <ul className="nav-menu">
              {/* 1. MEN with Dropdown */}
              <li className="nav-item">
                <Link to="/shop?gender=men" className="nav-link">
                  MEN
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </Link>
                <div className="nav-dropdown">
                  <Link to="/category/oversized" className="dropdown-link">Oversized Streetwear <span className="badge-subtle">Popular</span></Link>
                  <Link to="/category/compression" className="dropdown-link">Compression Tech</Link>
                  <Link to="/category/t-shirts" className="dropdown-link">T-Shirts & Polos</Link>
                  <Link to="/category/shorts" className="dropdown-link">Performance Shorts</Link>
                  <Link to="/category/joggers" className="dropdown-link">Joggers & Tracks</Link>
                  <Link to="/category/training" className="dropdown-link">Ironclad Training</Link>
                  <Link to="/category/hoodies" className="dropdown-link">Hoodies & Jackets</Link>
                  <Link to="/shop?gender=men" className="dropdown-link" style={{ borderTop: '1px solid var(--border-gray)', fontWeight: 700, color: 'var(--primary-navy)' }}>
                    View All Men's &rarr;
                  </Link>
                </div>
              </li>

              {/* 2. WOMEN with Dropdown */}
              <li className="nav-item">
                <Link to="/category/womens" className="nav-link">
                  WOMEN
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </Link>
                <div className="nav-dropdown">
                  <Link to="/category/womens" className="dropdown-link">High-Rise Sculpt Leggings</Link>
                  <Link to="/category/womens" className="dropdown-link">High-Impact Sports Bras</Link>
                  <Link to="/category/hoodies" className="dropdown-link">Aesthetic Crop Zip-Ups</Link>
                  <Link to="/category/womens" className="dropdown-link">Biker Shorts</Link>
                  <Link to="/category/womens" className="dropdown-link" style={{ borderTop: '1px solid var(--border-gray)', fontWeight: 700, color: 'var(--primary-navy)' }}>
                    View All Women's &rarr;
                  </Link>
                </div>
              </li>

              {/* 3. COMPRESSION */}
              <li className="nav-item">
                <Link to="/category/compression" className="nav-link">COMPRESSION</Link>
              </li>

              {/* 4. NEW ARRIVALS */}
              <li className="nav-item">
                <Link to="/shop?sort=bestseller" className="nav-link">NEW ARRIVALS</Link>
              </li>

              {/* 5. SALE */}
              <li className="nav-item">
                <Link to="/shop?sort=price-low" className="nav-link" style={{ color: 'var(--accent-crimson)', fontWeight: 700 }}>
                  SALE
                  <span style={{ fontSize: '0.65rem', background: 'var(--accent-crimson)', color: '#fff', padding: '1px 6px', borderRadius: '2px', marginLeft: '4px' }}>
                    50% OFF
                  </span>
                </Link>
              </li>

              {/* 6. ACCESSORIES */}
              <li className="nav-item">
                <Link to="/category/accessories" className="nav-link">ACCESSORIES</Link>
              </li>
            </ul>

            {/* Action Icons: Search | Account | Wishlist | Cart */}
            <div className="nav-actions">
              {/* Search Button */}
              <button 
                className="action-btn search-open-btn" 
                aria-label="Search Drops" 
                title="Search"
                onClick={onOpenSearch}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>

              {/* Account Button */}
              {isAuthenticated ? (
                <button 
                  className="action-btn account-btn" 
                  aria-label="Customer Account" 
                  title={`Logged in as ${user.name}`}
                  onClick={() => {
                    if (window.confirm(`Signed in as ${user.name}. Sign out?`)) logout();
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="user-initial">{user.name.charAt(0)}</span>
                </button>
              ) : (
                <Link to="/login" className="action-btn account-btn" aria-label="Customer Account" title="Sign In">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </Link>
              )}

              {/* Wishlist Button */}
              <Link to="/wishlist" className="action-btn" aria-label="Wishlist" title="Saved Wishlist">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {wishlistCount > 0 && (
                  <span className="action-badge wishlist-count-badge" style={{ display: 'inline-flex' }}>
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button with Volt Badge */}
              <button 
                className="action-btn cart-open-btn" 
                aria-label="Open Cart" 
                title="Shopping Bag"
                onClick={openCart}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {totalItemsCount > 0 && (
                  <span className="action-badge cart-count-badge" style={{ display: 'inline-flex' }}>
                    {totalItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button 
                className="action-btn nav-toggle" 
                id="mobile-nav-toggle" 
                aria-label="Toggle Navigation"
                onClick={() => setMobileMenuOpen(true)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="drawer-backdrop" 
          id="mobile-menu-backdrop" 
          style={{ display: 'block', opacity: 1 }}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside 
        className="cart-drawer" 
        id="mobile-menu-drawer" 
        style={{ 
          right: 'auto', 
          left: 0, 
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s ease'
        }}
      >
        <div className="drawer-header">
          <img src="/icons/logo.svg" alt="REPVAULT" height="32" />
          <button 
            className="drawer-close-btn" 
            onClick={() => setMobileMenuOpen(false)} 
            aria-label="Close Menu"
          >
            ✕
          </button>
        </div>

        <div className="drawer-body" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '1rem', fontWeight: 800, padding: '8px 0', borderBottom: '1px solid var(--border-gray)' }}>
              ALL PRODUCTS &rarr;
            </Link>
            <Link to="/shop?gender=men" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Men's Athletic Division
            </Link>
            <Link to="/category/womens" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Women's Activewear
            </Link>
            <Link to="/category/oversized" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Oversized Tees (260 GSM)
            </Link>
            <Link to="/category/compression" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Compression Tech Wear
            </Link>
            <Link to="/category/t-shirts" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Gym T-Shirts & Polos
            </Link>
            <Link to="/category/shorts" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Training Shorts
            </Link>
            <Link to="/category/joggers" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Joggers & Cargo Tracks
            </Link>
            <Link to="/category/hoodies" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Aesthetic Hoodies & Zip-Ups
            </Link>
            <Link to="/category/accessories" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 700, padding: '6px 0' }}>
              Tactical Backpacks & Gear
            </Link>
            <Link to="/shop?sort=price-low" onClick={() => setMobileMenuOpen(false)} style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--accent-crimson)', padding: '6px 0' }}>
              50% Off Flash Sale
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
