import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import QuickViewModal from './QuickViewModal.jsx';

export default function ProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);
  const discountPercent = product.discount || (product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0);

  const defaultFlavor = product.flavors?.[0] || product.flavor || 'Standard';
  const defaultWeight = product.weights?.[0] || product.size || 'Standard';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, { flavor: defaultFlavor, weight: defaultWeight, size: defaultWeight });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  return (
    <>
      <div className="product-card" data-product-id={product.id}>
        {/* Media Frame */}
        <div className="product-media">
          <Link to={`/product/${product.id}`} className="product-media-link">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-img" 
              loading="lazy" 
            />
          </Link>

          {/* Genuine Authentic Badge */}
          <div className="authenticity-badge">
            <ShieldCheck size={11} /> 100% GENUINE
          </div>

          {/* Discount / Bestseller Badge */}
          {discountPercent > 0 && (
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
            <Heart 
              size={16} 
              fill={wishlisted ? '#E50914' : 'none'} 
              stroke={wishlisted ? '#E50914' : '#FFFFFF'} 
            />
          </button>

          {/* Action Overlay: Quick View & Quick Add */}
          <div className="product-card-actions">
            <button 
              type="button" 
              className="card-action-btn quick-view-trigger"
              onClick={handleQuickViewClick}
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye size={15} /> <span>Quick View</span>
            </button>
            <button 
              type="button" 
              className={`card-action-btn quick-add-trigger ${justAdded ? 'added' : ''}`}
              onClick={handleQuickAdd}
              title="Add to Cart"
              aria-label="Add to Cart"
            >
              {justAdded ? (
                <>
                  <Check size={15} /> <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} /> <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Product Details Area */}
        <div className="product-info">
          {/* Brand & Rating Meta */}
          <div className="product-meta">
            <span className="product-brand">{product.brand}</span>
            <div className="product-rating">
              <Star size={12} fill="#FFC107" stroke="#FFC107" />
              <span className="rating-val">{product.rating || '4.8'}</span>
              <span className="reviews-cnt">({product.reviews || '280'})</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/product/${product.id}`} className="product-title-link">
            <h3 className="product-title">{product.name}</h3>
          </Link>

          {/* Weight & Flavour Pills */}
          <div className="product-specs-pills">
            <span className="spec-pill spec-weight">{defaultWeight}</span>
            {defaultFlavor && defaultFlavor !== 'Standard' && (
              <span className="spec-pill spec-flavor">{defaultFlavor}</span>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="product-pricing-row">
            <div className="product-pricing">
              <span className="price-current">₹{(product.price || 0).toLocaleString('en-IN')}</span>
              {product.mrp && product.mrp > product.price && (
                <span className="price-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
              )}
              {discountPercent > 0 && (
                <span className="price-discount-pill">{discountPercent}% OFF</span>
              )}
            </div>

            <button 
              type="button" 
              className={`card-cart-btn ${justAdded ? 'added' : ''}`}
              onClick={handleQuickAdd}
              aria-label="Add to cart"
            >
              {justAdded ? <Check size={16} /> : <ShoppingBag size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={product} 
        isOpen={quickViewOpen} 
        onClose={() => setQuickViewOpen(false)} 
      />
    </>
  );
}
