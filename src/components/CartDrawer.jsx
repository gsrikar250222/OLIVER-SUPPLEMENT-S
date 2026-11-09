import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
      <div 
        className="drawer-backdrop" 
        id="cart-drawer-backdrop" 
        style={{ display: 'block', opacity: 1 }}
        onClick={closeCart} 
      />
      <aside 
        className="cart-drawer" 
        id="cart-drawer" 
        aria-label="Shopping Cart Drawer"
        style={{ transform: 'translateX(0)' }}
      >
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              YOUR CART
            </span>
            <span className="action-badge cart-count-badge" style={{ position: 'static', display: 'inline-flex' }}>
              {totalItemsCount}
            </span>
          </div>
          <button 
            className="drawer-close-btn" 
            id="cart-close-btn" 
            onClick={closeCart} 
            aria-label="Close Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Tracker */}
        <div className="free-shipping-progress">
          <div className="free-shipping-text" id="shipping-progress-text">
            {freeShipping ? (
              <span style={{ color: '#059669', fontWeight: 800 }}>
                ✓ UNLOCKED FREE EXPRESS SHIPPING!
              </span>
            ) : (
              <span>
                Add ₹{amountNeededForFreeShipping.toLocaleString('en-IN')} more for FREE Express Shipping
              </span>
            )}
          </div>
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Body Items */}
        <div className="drawer-body" id="cart-items-container">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px' }}>Your Cart is Empty</p>
              <p style={{ fontSize: '0.85rem', marginBottom: '20px' }}>Explore the catalog to add items to your cart.</p>
              <Link to="/shop" onClick={closeCart} className="btn btn-navy btn-sm" style={{ display: 'inline-block' }}>
                Start Shopping
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div 
                  key={item.cartItemId} 
                  style={{ display: 'flex', gap: '14px', paddingBottom: '16px', borderBottom: '1px solid var(--border-gray)' }}
                >
                  <img 
                    src={`/${item.image.replace(/^\//, '')}`} 
                    alt={item.name} 
                    style={{ width: '70px', height: '88px', objectFit: 'cover', borderRadius: '4px' }} 
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Link 
                        to={`/product/${item.productId}`} 
                        onClick={closeCart}
                        style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}
                      >
                        {item.name}
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px' }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                      Size: <strong>{item.size}</strong> {item.color ? `• Color: ${item.color}` : ''}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--border-gray)', borderRadius: '4px' }}>
                        <button 
                          style={{ padding: '2px 8px', cursor: 'pointer' }}
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span style={{ padding: '2px 8px', fontWeight: 700, fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button 
                          style={{ padding: '2px 8px', cursor: 'pointer' }}
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="drawer-footer" id="cart-footer">
            {/* Coupon Box */}
            <div style={{ marginBottom: '14px' }}>
              {coupon ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ecfdf5', padding: '8px 12px', borderRadius: '4px', fontSize: '0.85rem' }}>
                  <span>✓ <strong>{coupon.code}</strong> applied</span>
                  <button onClick={removeCoupon} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>✕</button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px' }}>
                  <input 
                    type="text" 
                    placeholder="Coupon (e.g. VAULT10)" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    style={{ flexGrow: 1, padding: '8px 10px', border: '1px solid var(--border-gray)', borderRadius: '4px', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-navy btn-sm" disabled={applying}>
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{couponError}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.9rem', color: '#059669' }}>
                <span>Coupon Discount</span>
                <span style={{ fontWeight: 800 }}>-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
              <span style={{ fontWeight: 800 }}>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderTop: '1px solid var(--border-gray)', paddingTop: '10px' }}>
              <span style={{ fontSize: '1rem', textTransform: 'uppercase', fontWeight: 800 }}>Estimated Total</span>
              <span style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--text-primary)' }}>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <button 
              className="btn btn-buy-now" 
              id="checkout-btn"
              onClick={handleCheckout}
            >
              PROCEED TO CHECKOUT &rarr;
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
