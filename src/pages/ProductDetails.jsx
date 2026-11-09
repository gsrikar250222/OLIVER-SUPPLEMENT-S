import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Ruler, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Share2,
  Sparkles
} from 'lucide-react';

export default function ProductDetails({ onOpenSizeGuide }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('description');

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      const data = await api.getProduct(id);
      if (data) {
        setProduct(data);
        setActiveImage(data.primaryImage);
        setSelectedSize(data.sizes?.[0] || 'M');
        setSelectedColor(data.colors?.[0]?.name || 'Standard');
        setQuantity(1);

        // Load related products from same category
        const related = await api.getProducts({ category: data.category, limit: 4 });
        setRelatedProducts(related.filter(p => p.id !== data.id));
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container pdp-loading-container section-pad">
        <div className="pdp-skeleton-grid">
          <div className="skeleton-image skeleton-pulse" style={{ height: '560px' }}></div>
          <div className="pdp-skeleton-details">
            <div className="skeleton-line skeleton-title skeleton-pulse" style={{ height: '32px' }}></div>
            <div className="skeleton-line skeleton-price skeleton-pulse" style={{ width: '40%' }}></div>
            <div className="skeleton-line skeleton-pulse" style={{ height: '100px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center section-pad">
        <h2>PRODUCT NOT FOUND</h2>
        <p>The athletic style you are looking for has been moved or retired.</p>
        <Link to="/shop" className="btn btn-primary mt-20">Browse Catalog</Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? '' : name);
  };

  const galleryList = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.primaryImage];

  return (
    <div className="pdp-page container section-pad">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs pdp-breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Catalog</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`}>{product.categoryName}</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      {/* Main PDP Layout */}
      <div className="pdp-main-grid">
        {/* Left: Gallery (Thumbnails + Main Image) */}
        <div className="pdp-gallery-wrap">
          {/* Vertical Thumbnails */}
          <div className="pdp-thumb-stack">
            {galleryList.map((imgUrl, idx) => (
              <button 
                key={idx}
                className={`pdp-thumb-btn ${activeImage === imgUrl ? 'active' : ''}`}
                onClick={() => setActiveImage(imgUrl)}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={`/${imgUrl.replace(/^\//, '')}`} alt="" />
              </button>
            ))}
          </div>

          {/* Large Image Preview with Badges */}
          <div className="pdp-large-image-frame">
            <img 
              src={`/${activeImage.replace(/^\//, '')}`} 
              alt={product.name} 
              className="pdp-main-img" 
            />
            {product.badge && (
              <span className={`pdp-badge badge-${product.badge.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                {product.badge}
              </span>
            )}
            <button 
              className={`pdp-wishlist-float ${isWishlisted(product.id) ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Save to Wishlist"
            >
              <Heart size={22} fill={isWishlisted(product.id) ? "#e11d48" : "none"} color={isWishlisted(product.id) ? "#e11d48" : "#111111"} />
            </button>
          </div>
        </div>

        {/* Right: Product Details & Configuration */}
        <div className="pdp-info-col">
          <span className="pdp-category-tag">{product.categoryName}</span>
          <h1 className="pdp-title">{product.name}</h1>

          {/* Rating & Reviews */}
          <div className="pdp-rating-row">
            <div className="pdp-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  fill={i < Math.floor(product.rating) ? "#f59e0b" : "#e5e7eb"} 
                  color={i < Math.floor(product.rating) ? "#f59e0b" : "#d1d5db"} 
                />
              ))}
            </div>
            <span className="pdp-rating-num">{product.rating}</span>
            <span className="pdp-review-count">({product.reviewCount} verified athlete reviews)</span>
          </div>

          {/* Price Row */}
          <div className="pdp-price-row">
            <span className="pdp-current-price">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="pdp-orig-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
            {discountPercent > 0 && (
              <span className="pdp-discount-pill">SAVE {discountPercent}%</span>
            )}
            <span className="pdp-tax-note">Inclusive of all taxes</span>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="pdp-selector-block">
              <span className="selector-title">
                COLOR: <strong>{selectedColor}</strong>
              </span>
              <div className="pdp-color-options">
                {product.colors.map(col => (
                  <button 
                    key={col.name}
                    className={`pdp-color-swatch ${selectedColor === col.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(col.name)}
                    title={col.name}
                  >
                    <span className="swatch-inner" style={{ backgroundColor: col.hex }}></span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="pdp-selector-block">
            <div className="pdp-size-header">
              <span className="selector-title">
                SELECT SIZE: <strong>{selectedSize}</strong>
              </span>
              <button 
                type="button" 
                className="btn-size-guide"
                onClick={() => onOpenSizeGuide?.()}
              >
                <Ruler size={16} /> Size Guide
              </button>
            </div>
            <div className="pdp-size-grid">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  className={`pdp-size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Indicator */}
          <div className="pdp-stock-status">
            <span className="stock-dot pulse-green"></span>
            {product.stockCount <= 10 ? (
              <span className="stock-text low-stock">
                Only <strong>{product.stockCount} left</strong> in stock — Order soon
              </span>
            ) : (
              <span className="stock-text in-stock">
                In Stock • Dispatched within 24 hours
              </span>
            )}
          </div>

          {/* Quantity Stepper & Add to Cart */}
          <div className="pdp-actions-row">
            <div className="pdp-qty-stepper">
              <button 
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-number">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <button 
              className="btn btn-primary pdp-btn-add"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={20} />
              <span>{added ? 'ADDED TO BAG!' : 'ADD TO CART'}</span>
            </button>
          </div>

          <button 
            className="btn btn-dark full-width pdp-buy-now-btn"
            onClick={handleBuyNow}
          >
            BUY IT NOW • ₹{(product.price * quantity).toLocaleString('en-IN')}
          </button>

          {/* Shipping Value Strip */}
          <div className="pdp-trust-strip">
            <div className="pdp-trust-item">
              <Truck size={20} />
              <div>
                <strong>Free Shipping</strong>
                <p>On orders above ₹1,000</p>
              </div>
            </div>
            <div className="pdp-trust-item">
              <RotateCcw size={20} />
              <div>
                <strong>7-Day Returns</strong>
                <p>Easy doorstep exchange</p>
              </div>
            </div>
            <div className="pdp-trust-item">
              <ShieldCheck size={20} />
              <div>
                <strong>100% Genuine</strong>
                <p>Direct from Vault atelier</p>
              </div>
            </div>
          </div>

          {/* Accordions */}
          <div className="pdp-accordions-group">
            {/* 1. Description */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion('description')}
              >
                <span>PRODUCT OVERVIEW & FIT</span>
                {openAccordion === 'description' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'description' && (
                <div className="accordion-content">
                  <p>{product.description}</p>
                  {product.features && (
                    <ul className="accordion-feature-list">
                      {product.features.map((f, i) => (
                        <li key={i}><Check size={16} /> {f}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* 2. Fabric & Specifications */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion('fabric')}
              >
                <span>FABRIC & CARE SPECIFICATIONS</span>
                {openAccordion === 'fabric' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'fabric' && (
                <div className="accordion-content">
                  <p><strong>Composition:</strong> {product.fabric || '100% Premium Compact Cotton'}</p>
                  <p><strong>Care Instructions:</strong> Machine wash cold with similar colors inside out. Tumble dry low or hang dry in shade. Do not iron directly on rubberized or high-density prints.</p>
                </div>
              )}
            </div>

            {/* 3. Shipping & Delivery */}
            <div className="pdp-accordion-item">
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion('shipping')}
              >
                <span>SHIPPING, COD & RETURNS</span>
                {openAccordion === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {openAccordion === 'shipping' && (
                <div className="accordion-content">
                  <p>• <strong>Delivery Time:</strong> Metro cities receive delivery in 2-3 business days. Rest of India delivered in 3-5 days.</p>
                  <p>• <strong>Cash on Delivery:</strong> Available across all serviceable Indian PIN codes with zero additional COD charges.</p>
                  <p>• <strong>Return Policy:</strong> Return or exchange unworn items with tags intact within 7 days of delivery.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="pdp-related-section mt-60">
          <div className="section-header">
            <span className="section-eyebrow">COMPLETE YOUR KIT</span>
            <h2 className="section-headline">YOU MAY ALSO LIKE</h2>
          </div>
          <ProductGrid products={relatedProducts} count={4} />
        </section>
      )}

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="mobile-sticky-pdp-bar">
        <div className="sticky-thumb-col">
          <img src={`/${product.primaryImage.replace(/^\//, '')}`} alt="" />
          <div>
            <span className="sticky-title">{product.name}</span>
            <span className="sticky-price">₹{product.price.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <button className="btn btn-primary btn-sm sticky-add-btn" onClick={handleAddToCart}>
          {added ? 'ADDED!' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
}

