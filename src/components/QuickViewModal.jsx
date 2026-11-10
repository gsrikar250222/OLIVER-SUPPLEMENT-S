import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, ShieldCheck, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

export default function QuickViewModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedFlavor, setSelectedFlavor] = useState(
    product.flavors && product.flavors.length > 0 ? product.flavors[0] : product.flavor || 'Standard'
  );
  const [selectedWeight, setSelectedWeight] = useState(
    product.weights && product.weights.length > 0 ? product.weights[0] : product.size || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity, { flavor: selectedFlavor, weight: selectedWeight, size: selectedWeight });
    onClose();
    openCart();
  };

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="modal-overlay active" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-dialog quick-view-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close Preview">
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          {/* Image & Authenticity Badge */}
          <div className="quick-view-media">
            <div className="quick-view-badge">
              <ShieldCheck size={14} /> 100% GENUINE
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="quick-view-img"
              loading="lazy"
            />
          </div>

          {/* Product Info & Selectors */}
          <div className="quick-view-info">
            <div className="quick-view-brand">{product.brand}</div>
            <h3 className="quick-view-title">{product.name}</h3>

            {/* Rating */}
            <div className="quick-view-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating || 5) ? '#FFC107' : 'none'} 
                    stroke="#FFC107" 
                  />
                ))}
              </div>
              <span className="rating-num">{product.rating}</span>
              <span className="rating-count">({product.reviews} verified reviews)</span>
            </div>

            {/* Price */}
            <div className="quick-view-pricing">
              <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="original-price">₹{product.mrp.toLocaleString('en-IN')}</span>
                  <span className="discount-tag">{product.discount || Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF</span>
                </>
              )}
            </div>

            <p className="quick-view-desc">{product.desc}</p>

            {/* Flavors */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="selector-group">
                <label className="selector-label">Flavour: <strong>{selectedFlavor}</strong></label>
                <div className="selector-options">
                  {product.flavors.map((flv) => (
                    <button
                      key={flv}
                      type="button"
                      className={`option-chip ${selectedFlavor === flv ? 'selected' : ''}`}
                      onClick={() => setSelectedFlavor(flv)}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Weights / Sizes */}
            {product.weights && product.weights.length > 0 && (
              <div className="selector-group">
                <label className="selector-label">Size / Weight: <strong>{selectedWeight}</strong></label>
                <div className="selector-options">
                  {product.weights.map((wgt) => (
                    <button
                      key={wgt}
                      type="button"
                      className={`option-chip ${selectedWeight === wgt ? 'selected' : ''}`}
                      onClick={() => setSelectedWeight(wgt)}
                    >
                      {wgt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="quick-view-actions">
              <div className="qty-picker">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >-</button>
                <span>{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >+</button>
              </div>

              <button 
                type="button" 
                className="btn-primary add-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} /> ADD TO CART
              </button>

              <button 
                type="button" 
                className={`wishlist-toggle-btn ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle Wishlist"
              >
                <Heart size={18} fill={isFavorited ? '#E50914' : 'none'} stroke={isFavorited ? '#E50914' : 'currentColor'} />
              </button>
            </div>

            <div className="quick-view-footer">
              <Link to={`/product/${product.id}`} onClick={onClose} className="view-full-link">
                View Full Nutritional Facts & Lab Reports <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

