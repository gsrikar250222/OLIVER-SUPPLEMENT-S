import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Trash2, ArrowRight, Tag, X, Check, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    freeShipping, 
    amountNeededForFreeShipping, 
    freeShippingProgress, 
    coupon, 
    applyCoupon, 
    removeCoupon, 
    discount, 
    gst, 
    total,
    totalItemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [applying, setApplying] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    setApplying(true);
    const res = await applyCoupon(couponInput);
    setApplying(false);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-page-wrap section-pad text-center">
        <ShoppingBag size={64} strokeWidth={1} className="empty-cart-icon" />
        <h1 className="empty-page-title">YOUR SHOPPING BAG IS EMPTY</h1>
        <p className="empty-page-desc">Looks like you haven't added any athletic styles yet.</p>
        <Link to="/shop" className="btn btn-primary mt-24">
          EXPLORE THE VAULT CATALOG &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container section-pad">
      <h1 className="page-title">YOUR SHOPPING BAG ({totalItemsCount} ITEMS)</h1>

      {/* Free Shipping Tracker */}
      <div className="cart-free-shipping-box">
        <div className="free-shipping-text">
          {freeShipping ? (
            <span className="unlocked-text">
              <Check size={18} /> YOU'VE UNLOCKED <strong>FREE EXPRESS SHIPPING</strong>!
            </span>
          ) : (
            <span>
              Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more to your bag for <strong>FREE EXPRESS SHIPPING</strong>!
            </span>
          )}
        </div>
        <div className="free-shipping-progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="cart-page-layout">
        {/* Left: Cart Items Table */}
        <div className="cart-items-section">
          <div className="cart-table-header">
            <span>PRODUCT</span>
            <span>PRICE</span>
            <span>QUANTITY</span>
            <span>SUBTOTAL</span>
          </div>

          <div className="cart-table-rows">
            {cart.map(item => (
              <div key={item.cartItemId} className="cart-item-row">
                {/* Product Column */}
                <div className="cart-col-product">
                  <Link to={`/product/${item.productId}`}>
                    <img 
                      src={`/${item.image.replace(/^\//, '')}`} 
                      alt={item.name} 
                      className="cart-row-img" 
                    />
                  </Link>
                  <div className="cart-row-info">
                    <span className="cart-row-cat">{item.categoryName}</span>
                    <Link to={`/product/${item.productId}`} className="cart-row-title">
                      {item.name}
                    </Link>
                    <div className="cart-row-variants">
                      <span>Size: <strong>{item.size}</strong></span>
                      {item.color && <span>• Color: <strong>{item.color}</strong></span>}
                    </div>
                    <button 
                      className="cart-btn-remove"
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>

                {/* Price Column */}
                <div className="cart-col-price">
                  <span>₹{item.price.toLocaleString('en-IN')}</span>
                  {item.originalPrice && (
                    <span className="cart-orig-price">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* Quantity Column */}
                <div className="cart-col-qty">
                  <div className="qty-control">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal Column */}
                <div className="cart-col-subtotal">
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions-bottom">
            <Link to="/shop" className="btn btn-outline">
              &larr; CONTINUE SHOPPING
            </Link>
          </div>
        </div>

        {/* Right: Order Summary Card */}
        <aside className="cart-summary-sidebar">
          <div className="summary-card">
            <h3 className="summary-title">ORDER SUMMARY</h3>

            {/* Coupon Code Input */}
            <div className="coupon-summary-box">
              {coupon ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-info">
                    <Tag size={16} />
                    <span><strong>{coupon.code}</strong> applied ({coupon.description})</span>
                  </div>
                  <button onClick={removeCoupon} className="btn-remove-coupon">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input 
                    type="text" 
                    placeholder="Coupon code (VAULT10)" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button type="submit" disabled={applying}>
                    {applying ? '...' : 'APPLY'}
                  </button>
                </form>
              )}
              {couponError && <p className="coupon-error-msg">{couponError}</p>}
            </div>

            {/* Calculation Lines */}
            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              {discount > 0 && (
                <div className="summary-line discount-line">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="green-text">FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div className="summary-line">
                <span>Estimated GST (5%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className="summary-line total-line">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              className="btn btn-primary full-width checkout-btn-main"
              onClick={() => navigate('/checkout')}
            >
              PROCEED TO CHECKOUT &rarr;
            </button>

            <div className="summary-reassurance">
              <div className="reassurance-item">
                <Truck size={18} />
                <span>Express courier dispatch within 24 hours</span>
              </div>
              <div className="reassurance-item">
                <ShieldCheck size={18} />
                <span>256-bit encrypted secure checkout</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

