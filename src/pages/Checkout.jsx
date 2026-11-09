import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../services/api.js';
import { ShieldCheck, Truck, Lock, CreditCard, Smartphone, Building, Banknote, ArrowRight, CheckCircle2 } from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

export default function Checkout() {
  const { cart, subtotal, discount, shippingFee, gst, total, coupon, clearCart } = useCart();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container empty-page-wrap section-pad text-center">
        <h2>YOUR BAG IS EMPTY</h2>
        <p>Please add products to your shopping bag before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary mt-20">Browse Catalog</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Form validations
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please enter your shipping address');
      return;
    }
    if (!formData.city.trim() || !formData.pincode.trim()) {
      setErrorMsg('Please enter your city and PIN code');
      return;
    }
    if (paymentMethod === 'UPI' && upiId && !upiId.includes('@')) {
      setErrorMsg('Please enter a valid UPI ID (e.g. name@okaxis)');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: paymentMethod === 'UPI' && upiId ? `UPI (${upiId})` : paymentMethod,
        couponCode: coupon?.code || null,
        items: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          categoryName: item.categoryName,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.image
        })),
        subtotal,
        discount,
        shipping: shippingFee,
        gst,
        total
      };

      const createdOrder = await api.createOrder(orderPayload);
      clearCart();
      navigate(`/order-confirmation/${createdOrder.id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while placing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page container section-pad">
      <div className="checkout-header">
        <Link to="/" className="checkout-brand">
          <img src="/icons/logo.svg" alt="REPVAULT" width="180" />
        </Link>
        <div className="secure-badge-top">
          <Lock size={16} />
          <span>256-Bit SSL Encrypted Checkout</span>
        </div>
      </div>

      <div className="checkout-layout">
        {/* Left Column: Customer Details & Payment */}
        <form onSubmit={handleSubmitOrder} className="checkout-form-col">
          {errorMsg && (
            <div className="checkout-alert-error">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Customer Info */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">1. CONTACT INFORMATION</h2>
            <div className="form-grid-2">
              <div className="form-field">
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Rahul"
                  required 
                />
              </div>
              <div className="form-field">
                <label>Last Name *</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Sharma"
                  required 
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label>Email Address (For Tracking & Invoice) *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="rahul@example.com"
                  required 
                />
              </div>
              <div className="form-field">
                <label>Mobile Number (For Courier Updates) *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="9876543210"
                  maxLength={10}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">2. SHIPPING ADDRESS</h2>
            <div className="form-field">
              <label>Street Address / House No. / Building *</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Flat 402, Signature Towers, Main Road"
                required 
              />
            </div>

            <div className="form-field">
              <label>Apartment, Landmark, Suite (Optional)</label>
              <input 
                type="text" 
                name="apartment" 
                value={formData.apartment} 
                onChange={handleInputChange} 
                placeholder="Near Metro Station"
              />
            </div>

            <div className="form-grid-3">
              <div className="form-field">
                <label>City *</label>
                <input 
                  type="text" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  placeholder="Mumbai"
                  required 
                />
              </div>
              <div className="form-field">
                <label>State *</label>
                <select 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange}
                  required
                >
                  {INDIAN_STATES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label>PIN Code *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleInputChange} 
                  placeholder="400001"
                  maxLength={6}
                  required 
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">3. PAYMENT METHOD</h2>

            <div className="payment-options-list">
              {/* UPI Option */}
              <label className={`payment-option-card ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                <div className="option-head">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="UPI" 
                    checked={paymentMethod === 'UPI'} 
                    onChange={() => setPaymentMethod('UPI')}
                  />
                  <Smartphone size={20} />
                  <div className="option-text">
                    <strong>UPI (Google Pay, PhonePe, Paytm, BHIM)</strong>
                    <span>Instant payment with zero transaction fees</span>
                  </div>
                </div>
                {paymentMethod === 'UPI' && (
                  <div className="option-expanded-content">
                    <input 
                      type="text" 
                      placeholder="Enter UPI ID (e.g. mobile@okhdfcbank or gpay)" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="upi-input"
                    />
                    <span className="upi-note">Or click Place Order to open UPI QR gateway directly.</span>
                  </div>
                )}
              </label>

              {/* Card Option */}
              <label className={`payment-option-card ${paymentMethod === 'Card' ? 'selected' : ''}`}>
                <div className="option-head">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Card" 
                    checked={paymentMethod === 'Card'} 
                    onChange={() => setPaymentMethod('Card')}
                  />
                  <CreditCard size={20} />
                  <div className="option-text">
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, MasterCard, RuPay, American Express</span>
                  </div>
                </div>
                {paymentMethod === 'Card' && (
                  <div className="option-expanded-content">
                    <div className="form-field">
                      <input 
                        type="text" 
                        placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        maxLength={19}
                      />
                    </div>
                    <div className="form-grid-2">
                      <input 
                        type="text" 
                        placeholder="MM / YY"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        maxLength={5}
                      />
                      <input 
                        type="password" 
                        placeholder="CVV"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        maxLength={4}
                      />
                    </div>
                  </div>
                )}
              </label>

              {/* Net Banking */}
              <label className={`payment-option-card ${paymentMethod === 'NetBanking' ? 'selected' : ''}`}>
                <div className="option-head">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="NetBanking" 
                    checked={paymentMethod === 'NetBanking'} 
                    onChange={() => setPaymentMethod('NetBanking')}
                  />
                  <Building size={20} />
                  <div className="option-text">
                    <strong>Net Banking</strong>
                    <span>All major Indian banks supported</span>
                  </div>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className={`payment-option-card ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                <div className="option-head">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="COD" 
                    checked={paymentMethod === 'COD'} 
                    onChange={() => setPaymentMethod('COD')}
                  />
                  <Banknote size={20} />
                  <div className="option-text">
                    <strong>Cash on Delivery (COD)</strong>
                    <span>Pay with cash or UPI upon delivery to courier</span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary full-width submit-order-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span>VERIFYING & CREATING VAULT ORDER...</span>
            ) : (
              <span>PLACE ORDER • ₹{total.toLocaleString('en-IN')} <ArrowRight size={18} /></span>
            )}
          </button>
        </form>

        {/* Right Column: Order Items Review */}
        <aside className="checkout-summary-col">
          <div className="summary-sticky-card">
            <h3 className="checkout-summary-title">ORDER ITEMS ({cart.length})</h3>

            <div className="checkout-items-list">
              {cart.map(item => (
                <div key={item.cartItemId} className="checkout-item-row">
                  <div className="checkout-item-thumb-box">
                    <img src={`/${item.image.replace(/^\//, '')}`} alt={item.name} />
                    <span className="checkout-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-text">
                    <h4 className="checkout-item-name">{item.name}</h4>
                    <span className="checkout-item-meta">
                      Size: {item.size} {item.color ? `• ${item.color}` : ''}
                    </span>
                  </div>
                  <span className="checkout-item-cost">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="checkout-calculations">
              <div className="calc-line">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="calc-line discount">
                  <span>Coupon Discount ({coupon?.code})</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="calc-line">
                <span>Express Shipping</span>
                <span>{shippingFee === 0 ? <strong className="green-text">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="calc-line">
                <span>GST (5% Apparel)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="calc-line total-highlight">
                <span>Grand Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="checkout-guarantees">
              <div className="guarantee-row">
                <Truck size={16} />
                <span>Estimated Delivery: <strong>2 - 4 Business Days</strong></span>
              </div>
              <div className="guarantee-row">
                <ShieldCheck size={16} />
                <span>7-Day Return & Size Exchange Window</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

