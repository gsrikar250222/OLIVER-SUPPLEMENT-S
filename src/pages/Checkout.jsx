import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../services/api.js';
import { 
  ShieldCheck, 
  Truck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building, 
  Banknote, 
  ArrowRight, 
  CheckCircle2, 
  Shield 
} from 'lucide-react';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal"
];

export default function Checkout() {
  const { 
    cart, 
    subtotal, 
    discountAmount, 
    shippingFee, 
    grandTotal, 
    catalogSavings, 
    coupon, 
    clearCart 
  } = useCart();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (cart.length === 0) {
    return (
      <div className="container empty-page-wrap section-pad text-center">
        <h2>YOUR SUPPLEMENT BAG IS EMPTY</h2>
        <p>Please add supplements to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn-primary mt-20">Browse All Supplements</Link>
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
      setErrorMsg('Please enter your first and last name');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg('Please enter your complete street address');
      return;
    }
    if (!formData.city.trim() || !formData.pincode.trim() || formData.pincode.length !== 6) {
      setErrorMsg('Please enter your city and a valid 6-digit Indian PIN code');
      return;
    }
    if (paymentMethod === 'UPI' && upiId && !upiId.includes('@')) {
      setErrorMsg('Please enter a valid UPI ID (e.g. mobile@upi or name@okaxis)');
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
          productId: item.productId || item.id,
          name: item.name,
          brand: item.brand,
          categoryName: item.categoryName || item.category,
          price: item.price,
          quantity: item.quantity,
          weight: item.weight || item.size || 'Standard',
          size: item.weight || item.size || 'Standard',
          flavor: item.flavor || item.color || 'Standard',
          image: item.image
        })),
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total: grandTotal
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
    <div className="checkout-page-wrap container section-pad">
      <div className="checkout-brand-bar">
        <Link to="/" className="checkout-logo">
          <img src="/icons/logo.svg" alt="OLIVER Supplement Shop" height="40" />
        </Link>
        <div className="secure-badge-top">
          <Lock size={15} />
          <span>256-Bit Bank-Grade SSL Encryption</span>
        </div>
      </div>

      <div className="checkout-layout-grid mt-25">
        {/* Left Column: Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="checkout-form-col">
          {errorMsg && (
            <div className="checkout-alert-error">
              {errorMsg}
            </div>
          )}

          {/* 1. Contact Information */}
          <div className="checkout-card">
            <h2 className="checkout-card-title">1. ATHLETE CONTACT INFORMATION</h2>
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
                <label>Email Address (For Tax Invoice & Tracking) *</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  placeholder="rahul.athlete@gmail.com"
                  required 
                />
              </div>
              <div className="form-field">
                <label>Mobile Number (For Courier OTP & Updates) *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  maxLength={10}
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  placeholder="9876543210"
                  required 
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="checkout-card mt-20">
            <h2 className="checkout-card-title">2. SHIPPING ADDRESS (INDIA)</h2>
            <div className="form-field">
              <label>Flat / House No. / Building Name / Street Address *</label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                placeholder="Flat 402, Olympic Towers, Sector 18"
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
                placeholder="Near Gold's Gym"
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
                  className="state-select"
                >
                  {INDIAN_STATES.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>PIN Code (6 Digits) *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  maxLength={6}
                  value={formData.pincode} 
                  onChange={handleInputChange} 
                  placeholder="400050"
                  required 
                />
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="checkout-card mt-20">
            <h2 className="checkout-card-title">3. SELECT PAYMENT METHOD</h2>
            <div className="payment-options-grid">
              {/* UPI */}
              <label className={`payment-option-tile ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="UPI" 
                  checked={paymentMethod === 'UPI'} 
                  onChange={() => setPaymentMethod('UPI')} 
                />
                <div className="pay-option-content">
                  <Smartphone className="pay-icon" size={20} />
                  <div>
                    <strong>UPI & Instant QR</strong>
                    <span>Google Pay, PhonePe, Paytm, BHIM (Zero Convenience Fee)</span>
                  </div>
                </div>
              </label>

              {/* Cards */}
              <label className={`payment-option-tile ${paymentMethod === 'Cards' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Cards" 
                  checked={paymentMethod === 'Cards'} 
                  onChange={() => setPaymentMethod('Cards')} 
                />
                <div className="pay-option-content">
                  <CreditCard className="pay-icon" size={20} />
                  <div>
                    <strong>Credit / Debit Card</strong>
                    <span>Visa, MasterCard, RuPay, Amex</span>
                  </div>
                </div>
              </label>

              {/* Net Banking */}
              <label className={`payment-option-tile ${paymentMethod === 'NetBanking' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="NetBanking" 
                  checked={paymentMethod === 'NetBanking'} 
                  onChange={() => setPaymentMethod('NetBanking')} 
                />
                <div className="pay-option-content">
                  <Building className="pay-icon" size={20} />
                  <div>
                    <strong>Net Banking</strong>
                    <span>HDFC, ICICI, SBI, Axis, Kotak & 50+ Banks</span>
                  </div>
                </div>
              </label>

              {/* COD */}
              <label className={`payment-option-tile ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="COD" 
                  checked={paymentMethod === 'COD'} 
                  onChange={() => setPaymentMethod('COD')} 
                />
                <div className="pay-option-content">
                  <Banknote className="pay-icon" size={20} />
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <span>Pay at your doorstep upon verified package inspection</span>
                  </div>
                </div>
              </label>
            </div>

            {/* UPI ID input if UPI chosen */}
            {paymentMethod === 'UPI' && (
              <div className="upi-input-box mt-15">
                <label>Enter UPI ID (Virtual Payment Address)</label>
                <input 
                  type="text" 
                  placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="upi-id-field"
                />
                <span className="upi-subtext">You will receive a payment request on your UPI app to authorize ₹{grandTotal.toLocaleString('en-IN')}.</span>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-primary checkout-submit-btn mt-25"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'VERIFYING ORDER & SECURITY CODES...' : `PLACE ORDER &bull; ₹${grandTotal.toLocaleString('en-IN')}`}
          </button>
        </form>

        {/* Right Column: Order Summary & Trust Guarantee */}
        <aside className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3 className="summary-title">YOUR ORDER SUMMARY ({cart.length} ITEMS)</h3>

            {/* Items list */}
            <div className="checkout-items-list">
              {cart.map(item => (
                <div key={item.cartItemId} className="checkout-item-row">
                  <div className="checkout-item-img-wrap">
                    <img src={item.image} alt={item.name} />
                    <span className="checkout-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-details">
                    <span className="checkout-item-brand">{item.brand}</span>
                    <h4 className="checkout-item-name">{item.name}</h4>
                    <span className="checkout-variant-tag">{item.weight || item.size} &bull; {item.flavor || 'Standard'}</span>
                  </div>
                  <div className="checkout-item-price">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost Breakdown */}
            <div className="checkout-breakdown-list mt-20">
              <div className="breakdown-line">
                <span>Items Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="breakdown-line discount-line">
                  <span>Coupon Discount {coupon && `(${coupon.code})`}</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="breakdown-line">
                <span>Insured Express Shipping</span>
                <span>{shippingFee === 0 ? <strong className="free-text">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              {catalogSavings > 0 && (
                <div className="breakdown-line savings-line">
                  <span>Total Savings on MRP</span>
                  <span className="savings-val">₹{catalogSavings.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="breakdown-line grand-total-line">
                <strong>TOTAL AMOUNT PAYABLE</strong>
                <strong className="grand-price-val">₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Authenticity Guarantee Card */}
            <div className="checkout-guarantee-box mt-20">
              <ShieldCheck size={22} className="shield-icon" />
              <div>
                <strong>Oliver Authenticity Protocol</strong>
                <p>Every supplement container comes with a verifiable scratch QR seal and official GST invoice with manufacturer batch details.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
