import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuickAdd = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, product.colors?.[0]?.name, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card" data-product-id={product.id}>
      <div className="product-media">
        <Link to={`/product/${product.id}`}>
          <img 
            src={`/${product.primaryImage.replace(/^\//, '')}`} 
            alt={product.name} 
            className="product-img img-primary" 
            loading="lazy" 
          />
          {product.hoverImage && (
            <img 
              src={`/${product.hoverImage.replace(/^\//, '')}`} 
              alt={product.name} 
              className="product-img img-secondary" 
              loading="lazy" 
            />
          )}
        </Link>

        {/* Badge */}
        {(product.badge || discountPercent > 0) && (
          <div className="product-badge-wrap">
            <span className="badge badge-sale">
              {product.badge || `${discountPercent}% OFF`}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className={`product-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
          aria-label="Wishlist"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlisted ? "#e11d48" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick Sizes Hover Bar */}
        <div className="product-quick-sizes">
          {product.sizes.map(size => (
            <button 
              key={size}
              className="quick-size-btn"
              onClick={(e) => handleQuickAdd(size, e)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span className="product-cat">{product.categoryName}</span>
          <div className="product-rating">
            <span style={{ color: 'var(--accent-amber)' }}>★</span>
            <span style={{ fontWeight: 700, color: 'var(--charcoal)' }}>{product.rating}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>({product.reviewCount})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <div className="product-pricing">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discountPercent > 0 && (
            <span className="price-discount">{discountPercent}% OFF</span>
          )}
        </div>

        <div className="product-actions" style={{ marginTop: '10px' }}>
          <button 
            className="btn btn-navy btn-sm btn-block"
            onClick={(e) => handleQuickAdd('M', e)}
          >
            {added ? 'Added to Bag!' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
