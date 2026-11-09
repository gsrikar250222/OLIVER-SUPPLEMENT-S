import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-wrapper">
        <div className="header-inner container">
          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-nav-toggle"
            aria-label="Toggle Mobile Menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={22} />
          </button>

          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={handleNavClick}>
            <img 
              src="/icons/logo.svg" 
              alt="REPVAULT Logo" 
              className="logo-img logo-img-dark" 
              width="210" 
              height="44" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <NavLink to="/shop?gender=men" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              MEN
            </NavLink>
            <NavLink to="/category/womens" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              WOMEN
            </NavLink>
            <NavLink to="/category/oversized" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              OVERSIZED
            </NavLink>
            <NavLink to="/category/compression" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              COMPRESSION
            </NavLink>
            <NavLink to="/category/joggers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              JOGGERS
            </NavLink>
            <NavLink to="/category/training" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              TRAINING
            </NavLink>
            <NavLink to="/category/hoodies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              HOODIES
            </NavLink>
            <NavLink to="/category/accessories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              ACCESSORIES
            </NavLink>
            <NavLink to="/shop?sort=sale" className="nav-link sale-link">
              SALE <span className="sale-badge">40% OFF</span>
            </NavLink>
          </nav>

          {/* Action Icons */}
          <div className="header-actions">
            {/* Search */}
            <button 
              className="action-btn" 
              aria-label="Search Catalog"
              onClick={onOpenSearch}
              title="Search"
            >
              <Search size={20} />
            </button>

            {/* User Account */}
            {isAuthenticated ? (
              <div className="user-profile-menu">
                <button 
                  className="action-btn user-btn"
                  title={`Logged in as ${user.name}`}
                  onClick={() => {
                    if (window.confirm(`Logged in as ${user.name} (${user.email}). Sign out?`)) {
                      logout();
                    }
                  }}
                >
                  <User size={20} />
                  <span className="user-initial">{user.name.charAt(0)}</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="action-btn" title="Sign In" aria-label="Customer Login">
                <User size={20} />
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="action-btn" title="Saved Wishlist" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart Bag */}
            <button 
              className="action-btn cart-btn" 
              aria-label="Open Shopping Bag" 
              onClick={openCart}
              title="Shopping Bag"
            >
              <ShoppingBag size={20} />
              {totalItemsCount > 0 && <span className="action-badge cart-badge">{totalItemsCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="drawer-backdrop" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <img src="/icons/logo.svg" alt="REPVAULT" width="160" />
          <button 
            className="drawer-close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Mobile Menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-nav-body">
          <div className="mobile-nav-group">
            <span className="mobile-nav-subtitle">COLLECTIONS</span>
            <Link to="/shop" onClick={handleNavClick} className="mobile-nav-item">
              All Products <ArrowRight size={16} />
            </Link>
            <Link to="/shop?gender=men" onClick={handleNavClick} className="mobile-nav-item">
              Men's Division <ArrowRight size={16} />
            </Link>
            <Link to="/category/womens" onClick={handleNavClick} className="mobile-nav-item">
              Women's Activewear <ArrowRight size={16} />
            </Link>
            <Link to="/category/oversized" onClick={handleNavClick} className="mobile-nav-item">
              Oversized Streetwear <ArrowRight size={16} />
            </Link>
            <Link to="/category/compression" onClick={handleNavClick} className="mobile-nav-item">
              Compression Wear <ArrowRight size={16} />
            </Link>
            <Link to="/category/t-shirts" onClick={handleNavClick} className="mobile-nav-item">
              Gym T-Shirts & Polos <ArrowRight size={16} />
            </Link>
            <Link to="/category/shorts" onClick={handleNavClick} className="mobile-nav-item">
              Training Shorts <ArrowRight size={16} />
            </Link>
            <Link to="/category/joggers" onClick={handleNavClick} className="mobile-nav-item">
              Joggers & Tracks <ArrowRight size={16} />
            </Link>
            <Link to="/category/hoodies" onClick={handleNavClick} className="mobile-nav-item">
              Aesthetic Hoodies & Zip-Ups <ArrowRight size={16} />
            </Link>
            <Link to="/category/accessories" onClick={handleNavClick} className="mobile-nav-item">
              Backpacks & Gear <ArrowRight size={16} />
            </Link>
            <Link to="/shop?sort=sale" onClick={handleNavClick} className="mobile-nav-item highlight-sale">
              Sale - 40% Off <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mobile-nav-footer">
            {isAuthenticated ? (
              <div className="mobile-user-status">
                <p>Signed in as <strong>{user.name}</strong></p>
                <button className="btn-signout" onClick={logout}>Sign Out</button>
              </div>
            ) : (
              <div className="mobile-auth-btns">
                <Link to="/login" onClick={handleNavClick} className="btn btn-outline full-width">
                  Sign In
                </Link>
                <Link to="/register" onClick={handleNavClick} className="btn btn-primary full-width">
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

