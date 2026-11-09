import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { X, Trash2, ArrowRight, Tag, Check, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
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

  if (!isCartOpen) return null;

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

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={closeCart} />
      <aside className="cart-drawer open" aria-label="Shopping Bag">
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-title">
            <ShoppingBag size={20} />
            <span>YOUR BAG ({totalItemsCount})</span>
          </div>
          <button className="drawer-close-btn" onClick={closeCart} aria-label="Close Bag">
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-progress-banner">
          <div className="shipping-progress-text">
            {freeShipping ? (
              <span className="unlocked-text">
                <Check size={16} /> YOU'VE UNLOCKED <strong>FREE EXPRESS SHIPPING</strong>!
              </span>
            ) : (
              <span>
                Add <strong>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong>FREE EXPRESS SHIPPING</strong>
              </span>
            )}
          </div>
          <div className="shipping-progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items Body */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} strokeWidth={1.2} />
              <h3>YOUR BAG IS CURRENTLY EMPTY</h3>
              <p>Explore our latest athletic collections and build your training wardrobe.</p>
              <Link to="/shop" onClick={closeCart} className="btn btn-primary">
                EXPLORE CATALOG
              </Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => (
                <div key={item.cartItemId} className="cart-drawer-item">
                  <Link to={`/product/${item.productId}`} onClick={closeCart} className="item-thumb-link">
                    <img 
                      src={`/${item.image.replace(/^\//, '')}`} 
                      alt={item.name} 
                      className="item-thumb" 
                    />
                  </Link>

                  <div className="item-details">
                    <div className="item-top">
                      <Link to={`/product/${item.productId}`} onClick={closeCart} className="item-title">
                        {item.name}
                      </Link>
                      <button 
                        className="btn-remove-item"
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="item-variants">
                      <span>Size: <strong>{item.size}</strong></span>
                      {item.color && <span>• Color: <strong>{item.color}</strong></span>}
                    </div>

                    <div className="item-bottom">
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

                      <div className="item-price-col">
                        <span className="item-total-price">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="item-orig-price">
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Totals & Coupon */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Coupon Code Box */}
            <div className="coupon-box-wrap">
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
                    placeholder="Coupon code (e.g. VAULT10)" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    aria-label="Coupon code input"
                  />
                  <button type="submit" disabled={applying}>
                    {applying ? '...' : 'APPLY'}
                  </button>
                </form>
              )}
              {couponError && <p className="coupon-error-msg">{couponError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="cart-calc-breakdown">
              <div className="calc-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="calc-row discount-row">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="calc-row">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="green-text">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="calc-row">
                <span>GST (5%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-row total-row">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Actions */}
            <button className="btn btn-primary full-width checkout-action-btn" onClick={handleCheckout}>
              PROCEED TO CHECKOUT • ₹{total.toLocaleString('en-IN')} <ArrowRight size={18} />
            </button>
            <Link to="/cart" onClick={closeCart} className="view-cart-link">
              View Detailed Bag
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

