import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    shippingFee, 
    discountAmount, 
    grandTotal,
    catalogSavings,
    coupon, 
    applyCoupon, 
    removeCoupon, 
    totalItemsCount
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponMessage(res);
    if (res.success) setCouponInput('');
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  // Free shipping progress calculation (threshold = 999)
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      <div 
        className="drawer-backdrop active" 
        onClick={closeCart} 
      />
      <aside 
        className="cart-drawer open" 
        aria-label="Sports Nutrition Cart Drawer"
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="drawer-bag-icon" />
            <span className="drawer-title">YOUR ATHLETE BAG</span>
            <span className="drawer-count-badge">{totalItemsCount}</span>
          </div>
          <button 
            className="drawer-close-btn" 
            onClick={closeCart} 
            aria-label="Close Cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Tracker */}
        <div className="free-shipping-progress">
          <div className="free-shipping-text">
            {isFreeShipping ? (
              <span className="free-shipping-unlocked">
                <Check size={14} className="inline-check" /> UNLOCKED FREE ALL-INDIA EXPRESS SHIPPING!
              </span>
            ) : (
              <span>
                Add <strong>₹{neededForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE Express Shipping</strong>
              </span>
            )}
          </div>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items Area */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={52} className="empty-cart-icon" />
              <h3>YOUR SUPPLEMENT BAG IS EMPTY</h3>
              <p>Fuel your body with premium whey protein, creatine, and sports nutrition essentials.</p>
              <button 
                className="btn-primary start-shopping-btn" 
                onClick={() => { closeCart(); navigate('/shop'); }}
              >
                EXPLORE SUPPLEMENTS &rarr;
              </button>
            </div>
          ) : (
            <div className="drawer-items-list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="drawer-cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="drawer-item-img" 
                  />
                  <div className="drawer-item-details">
                    <span className="drawer-item-brand">{item.brand}</span>
                    <h4 className="drawer-item-title">{item.name}</h4>
                    <div className="drawer-item-variants">
                      <span className="variant-tag">{item.weight || item.size}</span>
                      {item.flavor && item.flavor !== 'Standard' && (
                        <span className="variant-tag">{item.flavor}</span>
                      )}
                    </div>

                    <div className="drawer-item-bottom">
                      <div className="drawer-qty-control">
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          aria-label="Decrease"
                        >-</button>
                        <span>{item.quantity}</span>
                        <button 
                          type="button" 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          aria-label="Increase"
                        >+</button>
                      </div>

                      <div className="drawer-item-pricing">
                        <span className="drawer-item-price">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.mrp && item.mrp > item.price && (
                          <span className="drawer-item-mrp">
                            ₹{(item.mrp * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      <button 
                        type="button" 
                        className="drawer-remove-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Coupon Code Section */}
            <div className="drawer-coupon-box">
              {coupon ? (
                <div className="applied-coupon-row">
                  <span className="coupon-applied-pill">
                    <Tag size={13} /> {coupon.code} (-₹{discountAmount})
                  </span>
                  <button className="remove-coupon-btn" onClick={removeCoupon}>Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="drawer-coupon-form">
                  <input 
                    type="text" 
                    placeholder="Promo code (try OLIVER10)..." 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-apply-btn">APPLY</button>
                </form>
              )}
              {couponMessage && !coupon && (
                <span className="coupon-error-msg">{couponMessage.message}</span>
              )}
            </div>

            {/* Price Calculations */}
            <div className="drawer-breakdown">
              <div className="breakdown-row">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="breakdown-row discount-row">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="breakdown-row">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="free-text">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              {catalogSavings > 0 && (
                <div className="breakdown-row savings-row">
                  <span>Total MRP Savings</span>
                  <span className="savings-val">₹{catalogSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="breakdown-row total-row">
                <strong>GRAND TOTAL</strong>
                <strong className="grand-price">₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="drawer-security-note">
              <ShieldCheck size={14} /> 100% Authentic Products &bull; Secure Encrypted Checkout
            </div>

            {/* CTAs */}
            <button className="btn-primary drawer-checkout-btn" onClick={handleCheckout}>
              PROCEED TO SECURE CHECKOUT &rarr;
            </button>
            <Link to="/cart" onClick={closeCart} className="drawer-view-cart-link">
              View Detailed Bag & Cart Summary
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
