import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Heart, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart, openCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container empty-page-wrap section-pad text-center">
        <Heart size={64} className="empty-cart-icon" />
        <h1 className="empty-page-title">YOUR SUPPLEMENT WISHLIST IS EMPTY</h1>
        <p className="empty-page-desc">Save your target whey proteins, creatines, and pre-workouts here.</p>
        <Link to="/shop" className="btn-primary mt-24">
          EXPLORE SUPPLEMENTS &rarr;
        </Link>
      </div>
    );
  }

  const handleMoveToCart = (product) => {
    addToCart(product, 1, {
      flavor: product.flavors?.[0] || product.flavor || 'Standard',
      weight: product.weights?.[0] || product.size || 'Standard',
      size: product.weights?.[0] || product.size || 'Standard'
    });
    removeFromWishlist(product.id);
    openCart();
  };

  return (
    <div className="wishlist-page container section-pad">
      <div className="section-header">
        <div>
          <span className="section-pre-title">SAVED FAVORITES</span>
          <h1 className="section-title">YOUR SUPPLEMENT WISHLIST ({wishlist.length} ITEMS)</h1>
        </div>
        <Link to="/shop" className="section-header-link">
          Explore More Products &rarr;
        </Link>
      </div>

      <div className="products-grid mt-30">
        {wishlist.map(product => {
          const discountPercent = product.discount || (product.mrp && product.mrp > product.price 
            ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
            : 0);

          return (
            <div key={product.id} className="product-card wishlist-card">
              <div className="product-media">
                <Link to={`/product/${product.id}`}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-img" 
                  />
                </Link>

                <div className="authenticity-badge">
                  <ShieldCheck size={11} /> 100% GENUINE
                </div>

                {discountPercent > 0 && (
                  <div className="product-badge-wrap">
                    <span className="badge badge-sale">{discountPercent}% OFF</span>
                  </div>
                )}

                <button 
                  className="product-wishlist-btn active"
                  onClick={() => removeFromWishlist(product.id)}
                  title="Remove from Wishlist"
                  aria-label="Remove from Wishlist"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="product-info">
                <div className="product-meta">
                  <span className="product-brand">{product.brand}</span>
                  <div className="product-rating">
                    <Star size={12} fill="#FFC107" stroke="#FFC107" />
                    <span className="rating-val">{product.rating}</span>
                  </div>
                </div>

                <Link to={`/product/${product.id}`}>
                  <h3 className="product-title">{product.name}</h3>
                </Link>

                <div className="product-specs-pills">
                  <span className="spec-pill">{product.weights?.[0] || product.size || 'Standard'}</span>
                  {product.flavors?.[0] && <span className="spec-pill">{product.flavors[0]}</span>}
                </div>

                <div className="product-pricing-row">
                  <div className="product-pricing">
                    <span className="price-current">₹{(product.price || 0).toLocaleString('en-IN')}</span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="price-mrp">₹{product.mrp.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  <button 
                    type="button" 
                    className="card-cart-btn"
                    onClick={() => handleMoveToCart(product)}
                    title="Move to Bag"
                    aria-label="Move to Bag"
                  >
                    <ShoppingBag size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
