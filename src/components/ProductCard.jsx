import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [showQuickSizes, setShowQuickSizes] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const wishlisted = isWishlisted(product.id);
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleQuickAdd = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size, product.colors?.[0]?.name, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setShowQuickSizes(false);
    }, 1200);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="product-card" onMouseLeave={() => setShowQuickSizes(false)}>
      <div className="product-thumb-wrap">
        <Link to={`/product/${product.id}`} className="product-image-link">
          <img 
            src={`/${product.primaryImage.replace(/^\//, '')}`} 
            alt={product.name} 
            className="product-img primary-img"
            loading="lazy" 
          />
          {product.hoverImage && (
            <img 
              src={`/${product.hoverImage.replace(/^\//, '')}`} 
              alt={`${product.name} alternate view`} 
              className="product-img hover-img"
              loading="lazy" 
            />
          )}
        </Link>

        {/* Badges */}
        {product.badge && (
          <span className={`product-badge badge-${product.badge.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
            {product.badge}
          </span>
        )}

        {discountPercent > 0 && !product.badge && (
          <span className="product-badge badge-discount">
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          title={wishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <Heart size={18} fill={wishlisted ? "#e11d48" : "none"} color={wishlisted ? "#e11d48" : "#111111"} />
        </button>

        {/* Quick Add Overlay */}
        <div className="quick-add-wrap">
          {showQuickSizes ? (
            <div className="quick-size-selector">
              <span className="quick-size-title">Select Size:</span>
              <div className="quick-size-buttons">
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className="size-btn-quick"
                    onClick={(e) => handleQuickAdd(size, e)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button 
              className="btn-quick-add"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (product.sizes && product.sizes.length === 1) {
                  handleQuickAdd(product.sizes[0], e);
                } else {
                  setShowQuickSizes(true);
                }
              }}
            >
              <ShoppingBag size={15} />
              <span>{added ? 'ADDED!' : '+ QUICK ADD'}</span>
            </button>
          )}
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.categoryName}</span>
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="product-pricing">
          <span className="price-current">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {discountPercent > 0 && (
            <span className="price-discount-tag">({discountPercent}% OFF)</span>
          )}
        </div>

        {/* Color swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-color-swatches">
            {product.colors.slice(0, 4).map((c, idx) => (
              <span 
                key={idx} 
                className="color-dot" 
                style={{ backgroundColor: c.hex }} 
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="color-more">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

