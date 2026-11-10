import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  PRODUCTS, 
  getProductById, 
  getProductsByCategory 
} from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Share2, 
  Sparkles, 
  Award, 
  Zap, 
  Flame, 
  Clock, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

export default function ProductDetails({ onOpenGuide }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = useMemo(() => {
    return getProductById(id) || PRODUCTS[0];
  }, [id]);

  const [activeImage, setActiveImage] = useState(product?.image || '');
  const [selectedFlavor, setSelectedFlavor] = useState(product?.flavors?.[0] || product?.flavor || 'Standard');
  const [selectedWeight, setSelectedWeight] = useState(product?.weights?.[0] || product?.size || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('nutrition');
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync state on product change
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedFlavor(product.flavors?.[0] || product.flavor || 'Standard');
      setSelectedWeight(product.weights?.[0] || product.size || 'Standard');
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container text-center section-pad">
        <h2>SUPPLEMENT NOT FOUND</h2>
        <p>The product you are looking for has been moved or retired.</p>
        <Link to="/shop" className="btn-primary mt-20">Browse All Supplements</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discountPercent = product.discount || (product.mrp && product.mrp > product.price 
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
    : 0);

  // Related products
  const relatedProducts = PRODUCTS.filter(
    p => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, { 
      flavor: selectedFlavor, 
      weight: selectedWeight, 
      size: selectedWeight 
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
    openCart();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, { 
      flavor: selectedFlavor, 
      weight: selectedWeight, 
      size: selectedWeight 
    });
    navigate('/checkout');
  };

  return (
    <div className="product-details-page-wrap">
      <div className="container">
        {/* Breadcrumb Header */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <Link to="/shop">Shop</Link>
          <span>&gt;</span>
          <Link to={`/category/${product.categorySlug}`}>{product.category}</Link>
          <span>&gt;</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Product Showcase Grid */}
        <div className="pdp-main-grid">
          {/* Left Column: Gallery & Media */}
          <div className="pdp-media-col">
            <div 
              className={`pdp-main-image-frame ${isZoomed ? 'zoomed' : ''}`}
              onClick={() => setIsZoomed(!isZoomed)}
              title="Click to zoom in"
            >
              <div className="pdp-auth-seal">
                <ShieldCheck size={14} /> 100% AUTHENTIC IMPORTER SEAL
              </div>
              {discountPercent > 0 && (
                <div className="pdp-sale-tag">
                  {discountPercent}% OFF
                </div>
              )}
              <img 
                src={activeImage || product.image} 
                alt={product.name} 
                className="pdp-main-img" 
              />
            </div>

            {/* Gallery Thumbnails */}
            <div className="pdp-thumbnails-strip">
              <button 
                type="button" 
                className={`thumb-btn ${activeImage === product.image ? 'active' : ''}`}
                onClick={() => setActiveImage(product.image)}
              >
                <img src={product.image} alt="Front View" />
              </button>
              {product.gallery && product.gallery.map((gImg, idx) => (
                <button 
                  key={idx}
                  type="button" 
                  className={`thumb-btn ${activeImage === gImg ? 'active' : ''}`}
                  onClick={() => setActiveImage(gImg)}
                >
                  <img src={gImg} alt={`View ${idx + 1}`} />
                </button>
              ))}
            </div>

            {/* Authentic Brand Verification Notice */}
            <div className="authenticity-proof-card">
              <div className="auth-card-top">
                <Award size={20} className="auth-gold-icon" />
                <div>
                  <strong>Scratch & Verify Protection</strong>
                  <p>Authentic brand security sticker with unique 16-digit code on every container.</p>
                </div>
              </div>
              <div className="auth-badges-row">
                <span>&bull; Direct Importer</span>
                <span>&bull; FSSAI Licenced</span>
                <span>&bull; Labdoor Quality Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Selectors & Checkout */}
          <div className="pdp-info-col">
            <div className="pdp-brand-tag">{product.brand}</div>
            <h1 className="pdp-title">{product.name}</h1>

            {/* Ratings & Servings */}
            <div className="pdp-rating-strip">
              <div className="stars-cluster">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill={i < Math.floor(product.rating || 5) ? '#FFC107' : 'none'} 
                    stroke="#FFC107" 
                  />
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="rating-divider">&bull;</span>
              <span className="rating-reviews-cnt">{product.reviews} Verified Athlete Reviews</span>
              <span className="rating-divider">&bull;</span>
              <span className="rating-servings-badge">
                <Zap size={13} /> {product.servingsPerContainer}
              </span>
            </div>

            {/* Price Box */}
            <div className="pdp-price-box">
              <div className="price-display">
                <span className="pdp-current-price">₹{product.price.toLocaleString('en-IN')}</span>
                {product.mrp && product.mrp > product.price && (
                  <>
                    <span className="pdp-mrp-price">₹{product.mrp.toLocaleString('en-IN')}</span>
                    <span className="pdp-savings-pill">Save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({discountPercent}%)</span>
                  </>
                )}
              </div>
              <div className="tax-subtext">Inclusive of all taxes &bull; Free express delivery over ₹999</div>
            </div>

            {/* Short Form Summary */}
            <p className="pdp-overview">{product.desc}</p>

            {/* Key Nutritional Metrics at a glance */}
            {product.nutritionFacts && (
              <div className="pdp-quick-macros-grid">
                {product.nutritionFacts.protein && (
                  <div className="macro-cell">
                    <span className="macro-val">{product.nutritionFacts.protein}</span>
                    <span className="macro-label">PROTEIN</span>
                  </div>
                )}
                {product.nutritionFacts.bcaa && (
                  <div className="macro-cell">
                    <span className="macro-val">{product.nutritionFacts.bcaa}</span>
                    <span className="macro-label">BCAAs</span>
                  </div>
                )}
                {product.nutritionFacts.creatine && (
                  <div className="macro-cell">
                    <span className="macro-val">{product.nutritionFacts.creatine}</span>
                    <span className="macro-label">CREATINE</span>
                  </div>
                )}
                {product.nutritionFacts.citrulline && (
                  <div className="macro-cell">
                    <span className="macro-val">{product.nutritionFacts.citrulline}</span>
                    <span className="macro-label">L-CITRULLINE</span>
                  </div>
                )}
                {product.nutritionFacts.calories && (
                  <div className="macro-cell">
                    <span className="macro-val">{product.nutritionFacts.calories}</span>
                    <span className="macro-label">CALORIES</span>
                  </div>
                )}
              </div>
            )}

            {/* Flavour Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="pdp-selector-section">
                <div className="selector-header">
                  <span className="selector-title">FLAVOUR:</span>
                  <strong className="selected-val-label">{selectedFlavor}</strong>
                </div>
                <div className="selector-chips-list">
                  {product.flavors.map(flv => (
                    <button
                      key={flv}
                      type="button"
                      className={`spec-choice-btn ${selectedFlavor === flv ? 'active' : ''}`}
                      onClick={() => setSelectedFlavor(flv)}
                    >
                      {flv}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size / Weight Selector */}
            {product.weights && product.weights.length > 0 && (
              <div className="pdp-selector-section">
                <div className="selector-header">
                  <span className="selector-title">CONTAINER WEIGHT / PACK:</span>
                  <strong className="selected-val-label">{selectedWeight}</strong>
                </div>
                <div className="selector-chips-list">
                  {product.weights.map(wgt => (
                    <button
                      key={wgt}
                      type="button"
                      className={`spec-choice-btn ${selectedWeight === wgt ? 'active' : ''}`}
                      onClick={() => setSelectedWeight(wgt)}
                    >
                      {wgt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTAs */}
            <div className="pdp-actions-row">
              <div className="pdp-qty-stepper">
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
                className={`btn-primary pdp-add-cart-btn ${justAdded ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {justAdded ? (
                  <>
                    <Check size={18} /> ADDED TO BAG
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> ADD TO CART
                  </>
                )}
              </button>

              <button 
                type="button" 
                className="btn-secondary pdp-buy-now-btn"
                onClick={handleBuyNow}
              >
                BUY NOW
              </button>

              <button 
                type="button" 
                className={`pdp-wishlist-toggle ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Save to Wishlist"
                title="Wishlist"
              >
                <Heart size={20} fill={wishlisted ? '#E50914' : 'none'} stroke={wishlisted ? '#E50914' : '#FFFFFF'} />
              </button>
            </div>

            {/* Delivery & Pincode Checker */}
            <div className="pdp-delivery-perks">
              <div className="perk-item">
                <Truck size={18} className="perk-icon" />
                <div>
                  <strong>Dispatches in 24 Hours</strong>
                  <span>Free all-India delivery on prepaid & COD orders over ₹999</span>
                </div>
              </div>
              <div className="perk-item">
                <RotateCcw size={18} className="perk-icon" />
                <div>
                  <strong>14-Day Seal Replacement</strong>
                  <span>Damaged or broken seal? We replace instantly with zero hassle.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            DETAILED TABS: NUTRITION, INGREDIENTS, DIRECTIONS, STORAGE
            ======================================================== */}
        <div className="pdp-detailed-tabs-wrap mt-60">
          <div className="pdp-tabs-nav">
            <button 
              className={`pdp-tab-trigger ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              <Zap size={16} /> Supplement & Nutrition Facts
            </button>
            <button 
              className={`pdp-tab-trigger ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              <ShieldCheck size={16} /> Ingredients & Allergens
            </button>
            <button 
              className={`pdp-tab-trigger ${activeTab === 'directions' ? 'active' : ''}`}
              onClick={() => setActiveTab('directions')}
            >
              <Clock size={16} /> Suggested Use & Timing
            </button>
            <button 
              className={`pdp-tab-trigger ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star size={16} /> Athlete Reviews ({product.reviews})
            </button>
          </div>

          <div className="pdp-tab-content-panel">
            {/* Tab 1: Nutrition Table */}
            {activeTab === 'nutrition' && (
              <div className="tab-pane-nutrition">
                <div className="nutrition-table-header">
                  <h3>SUPPLEMENT FACTS & CLINICAL LABELS</h3>
                  <span>Serving Size: <strong>{product.servingSize}</strong> | Servings Per Container: <strong>{product.servingsPerContainer}</strong></span>
                </div>

                <table className="nutrition-facts-table">
                  <thead>
                    <tr>
                      <th>Nutrient / Active Matrix</th>
                      <th>Amount Per Serving</th>
                      <th>% Daily Value*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(product.nutritionFacts || {}).map(([key, val]) => (
                      <tr key={key}>
                        <td className="nutrient-name">
                          {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                        </td>
                        <td className="nutrient-amount">
                          <strong>{val}</strong>
                        </td>
                        <td className="nutrient-dv">
                          {key === 'protein' ? '50%' : key === 'bcaa' ? '**' : '20%'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="nutrition-disclaimer">
                  *Percent Daily Values are based on a 2,000-calorie diet. Your daily values may be higher or lower depending on your physical training output. **Daily Value (DV) not established.
                </p>
              </div>
            )}

            {/* Tab 2: Ingredients & Allergens */}
            {activeTab === 'ingredients' && (
              <div className="tab-pane-ingredients">
                <h4>Verified Ingredient Breakdown</h4>
                <p className="ingredients-body">{product.ingredients}</p>

                <div className="allergen-alert-box mt-20">
                  <AlertCircle size={20} className="alert-icon" />
                  <div>
                    <strong>ALLERGEN ADVISORY:</strong>
                    <p>{product.allergens}</p>
                  </div>
                </div>

                <div className="storage-advisory-box mt-20">
                  <h4>Recommended Storage Conditions</h4>
                  <p>{product.storage}</p>
                </div>
              </div>
            )}

            {/* Tab 3: Suggested Use */}
            {activeTab === 'directions' && (
              <div className="tab-pane-directions">
                <h4>Optimal Usage Protocol</h4>
                <p className="directions-lead">{product.suggestedUse}</p>

                <div className="timing-matrix-pdp mt-25">
                  <div className="pdp-timing-step">
                    <span className="step-tag">STEP 1</span>
                    <strong>Add Chilled Liquid</strong>
                    <p>Pour 200ml to 250ml of cold water or skimmed milk into your shaker bottle.</p>
                  </div>
                  <div className="pdp-timing-step">
                    <span className="step-tag">STEP 2</span>
                    <strong>Add 1 Level Scoop</strong>
                    <p>Add 1 level scoop ({product.servingSize}) of powder on top of the liquid to prevent clumping.</p>
                  </div>
                  <div className="pdp-timing-step">
                    <span className="step-tag">STEP 3</span>
                    <strong>Shake for 25 Seconds</strong>
                    <p>Secure the shaker lid firmly and shake vigorously for 25 to 30 seconds until completely dissolved.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Reviews */}
            {activeTab === 'reviews' && (
              <div className="tab-pane-reviews">
                <div className="reviews-aggregate-box">
                  <div className="agg-score-wrap">
                    <span className="big-rating">{product.rating}</span>
                    <div className="stars-cluster">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#FFC107" stroke="#FFC107" />
                      ))}
                    </div>
                    <span className="total-revs">Based on {product.reviews} verified purchases</span>
                  </div>

                  <div className="agg-breakdown-bars">
                    <div className="bar-row">
                      <span>5 Star</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: '88%' }}></div></div>
                      <span>88%</span>
                    </div>
                    <div className="bar-row">
                      <span>4 Star</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: '10%' }}></div></div>
                      <span>10%</span>
                    </div>
                    <div className="bar-row">
                      <span>3 Star</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: '2%' }}></div></div>
                      <span>2%</span>
                    </div>
                  </div>
                </div>

                <div className="reviews-sample-feed mt-30">
                  <div className="sample-review-card">
                    <div className="rev-head">
                      <div className="stars-cluster">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="#FFC107" stroke="#FFC107" />
                        ))}
                      </div>
                      <span className="rev-date">Verified Purchase &bull; 2 days ago</span>
                    </div>
                    <strong className="rev-title">Incredible mixability and authentic taste</strong>
                    <p className="rev-text">
                      "I have been buying supplements for over 6 years. Oliver Supplement Shop delivered this within 2 days to Pune with pristine seals. The scratch code verified on the brand website immediately. Zero clumps and tastes amazing in cold water."
                    </p>
                    <span className="rev-author">&mdash; Devendra P., Verified Buyer</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-supplements-section mt-60">
            <div className="section-header">
              <div>
                <span className="section-pre-title">COMMONLY STACKED TOGETHER</span>
                <h2 className="section-title">RELATED SUPPLEMENTS</h2>
              </div>
              <Link to={`/category/${product.categorySlug}`} className="section-header-link">
                View More {product.category} &rarr;
              </Link>
            </div>

            <div className="products-grid">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
