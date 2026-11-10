import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { Trash2, ArrowRight, Tag, X, Check, ShoppingBag, ShieldCheck, Truck, Shield } from 'lucide-react';

export default function Cart() {
  const { 
    cart, 
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
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const neededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container empty-page-wrap section-pad text-center">
        <ShoppingBag size={64} className="empty-cart-icon" />
        <h1 className="empty-page-title">YOUR SUPPLEMENT BAG IS EMPTY</h1>
        <p className="empty-page-desc">
          Fuel your body with 100% genuine whey protein, creatine, and performance nutrition.
        </p>
        <Link to="/shop" className="btn-primary mt-24">
          EXPLORE SPORTS NUTRITION &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page-wrap container section-pad">
      <div className="cart-page-header">
        <h1 className="page-title">YOUR SUPPLEMENT BAG ({totalItemsCount} ITEMS)</h1>
        <Link to="/shop" className="continue-shopping-link">
          &larr; Continue Shopping
        </Link>
      </div>

      {/* Free Shipping Tracker */}
      <div className="cart-free-shipping-box">
        <div className="free-shipping-text">
          {isFreeShipping ? (
            <span className="unlocked-text">
              <Check size={18} /> YOU'VE UNLOCKED <strong>FREE ALL-INDIA EXPRESS SHIPPING</strong>!
            </span>
          ) : (
            <span>
              Add <strong>₹{neededForFreeShipping.toLocaleString('en-IN')}</strong> more to unlock <strong>FREE EXPRESS SHIPPING</strong>!
            </span>
          )}
        </div>
        <div className="free-shipping-progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      <div className="cart-page-layout">
        {/* Left: Cart Items Table */}
        <div className="cart-items-section">
          <div className="cart-table-header">
            <span>SUPPLEMENT ITEM</span>
            <span>PRICE</span>
            <span>QTY</span>
            <span>TOTAL</span>
          </div>

          <div className="cart-table-rows">
            {cart.map(item => (
              <div key={item.cartItemId} className="cart-item-row">
                {/* Product Column */}
                <div className="cart-col-product">
                  <Link to={`/product/${item.productId}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="cart-row-img" 
                    />
                  </Link>
                  <div className="cart-row-info">
                    <span className="cart-row-brand">{item.brand}</span>
                    <Link to={`/product/${item.productId}`}>
                      <h4 className="cart-row-name">{item.name}</h4>
                    </Link>
                    <div className="cart-row-meta">
                      <span className="meta-pill">{item.weight || item.size}</span>
                      {item.flavor && item.flavor !== 'Standard' && (
                        <span className="meta-pill">{item.flavor}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="cart-col-price">
                  <span className="col-price-val">₹{item.price.toLocaleString('en-IN')}</span>
                  {item.mrp && item.mrp > item.price && (
                    <span className="col-mrp-val">₹{item.mrp.toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* Quantity */}
                <div className="cart-col-qty">
                  <div className="cart-qty-picker">
                    <button 
                      type="button" 
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    >-</button>
                    <span>{item.quantity}</span>
                    <button 
                      type="button" 
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    >+</button>
                  </div>
                </div>

                {/* Row Total & Delete */}
                <div className="cart-col-total">
                  <span className="col-total-val">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button 
                    type="button" 
                    className="cart-item-delete-btn"
                    onClick={() => removeFromCart(item.cartItemId)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="cart-guarantee-strip">
            <div className="guarantee-box">
              <ShieldCheck size={20} className="g-icon" />
              <div>
                <strong>Direct Importer Authenticity</strong>
                <span>Every tub is sealed with official brand hologram</span>
              </div>
            </div>
            <div className="guarantee-box">
              <Truck size={20} className="g-icon" />
              <div>
                <strong>Express Delivery</strong>
                <span>Dispatches from temperature-controlled warehouses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <aside className="cart-summary-sidebar">
          <div className="summary-card">
            <h3 className="summary-card-title">ORDER SUMMARY</h3>

            {/* Promo Code Form */}
            <div className="cart-promo-section">
              {coupon ? (
                <div className="applied-coupon-box">
                  <div className="applied-coupon-info">
                    <Tag size={16} />
                    <span><strong>{coupon.code}</strong> Applied</span>
                  </div>
                  <button className="coupon-remove-text" onClick={removeCoupon}>Remove</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
                  <input 
                    type="text" 
                    placeholder="Coupon code (e.g. OLIVER10)..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="cart-coupon-input"
                  />
                  <button type="submit" className="cart-coupon-btn">APPLY</button>
                </form>
              )}
              {couponError && <span className="coupon-err-msg">{couponError}</span>}
            </div>

            {/* Financial Rows */}
            <div className="summary-rows-list">
              <div className="summary-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row discount-row">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="free-text">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              {catalogSavings > 0 && (
                <div className="summary-row savings-row">
                  <span>Total Savings on MRP</span>
                  <span className="savings-val">₹{catalogSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="summary-row total-row">
                <strong>GRAND TOTAL</strong>
                <strong className="grand-price">₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <button 
              className="btn-primary checkout-proceed-btn" 
              onClick={() => navigate('/checkout')}
            >
              PROCEED TO SECURE CHECKOUT <ArrowRight size={18} />
            </button>

            <div className="summary-security-footer">
              <Shield size={14} /> 256-Bit SSL Encrypted Checkout &bull; UPI & COD Accepted
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
