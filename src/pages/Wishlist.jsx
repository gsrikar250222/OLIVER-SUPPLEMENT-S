import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="container empty-page-wrap section-pad text-center">
        <Heart size={64} strokeWidth={1} className="empty-cart-icon" />
        <h1 className="empty-page-title">YOUR WISHLIST IS EMPTY</h1>
        <p className="empty-page-desc">Save your favorite athletic styles and return to them anytime.</p>
        <Link to="/shop" className="btn btn-primary mt-24">
          EXPLORE THE CATALOG &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page container section-pad">
      <div className="section-header">
        <span className="section-eyebrow">SAVED FAVORITES</span>
        <h1 className="section-headline">YOUR WISHLIST ({wishlist.length} ITEMS)</h1>
      </div>

      <div className="product-grid">
        {wishlist.map(product => (
          <div key={product.id} className="product-card wishlist-card">
            <div className="product-thumb-wrap">
              <Link to={`/product/${product.id}`} className="product-image-link">
                <img 
                  src={`/${product.primaryImage.replace(/^\//, '')}`} 
                  alt={product.name} 
                  className="product-img" 
                />
              </Link>
              <button 
                className="wishlist-btn active"
                onClick={() => removeFromWishlist(product.id)}
                title="Remove from Wishlist"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="product-info">
              <span className="product-category">{product.categoryName}</span>
              <h3 className="product-title">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>

              <div className="product-pricing">
                <span className="price-current">₹{product.price?.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="price-original">₹{product.originalPrice?.toLocaleString('en-IN')}</span>
                )}
              </div>

              <button 
                className="btn btn-primary full-width mt-12 btn-sm"
                onClick={() => {
                  addToCart(product, product.sizes?.[0] || 'M', product.colors?.[0]?.name, 1);
                  removeFromWishlist(product.id);
                }}
              >
                <ShoppingBag size={15} /> Move to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

