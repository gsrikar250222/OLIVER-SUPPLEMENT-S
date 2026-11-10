import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Clock, 
  ArrowRight, 
  Printer, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Award,
  Zap
} from 'lucide-react';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingStep, setTrackingStep] = useState(1);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      const data = await api.getOrder(id);
      if (data) {
        setOrder(data);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    }
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container section-pad text-center">
        <h2>RETRIEVING ORDER & BATCH DETAILS...</h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container section-pad text-center">
        <h2>ORDER NOT FOUND</h2>
        <p>No order was found with ID <strong>{id}</strong>.</p>
        <Link to="/shop" className="btn-primary mt-20">Back to Supplement Shop</Link>
      </div>
    );
  }

  const steps = [
    { label: "Order Confirmed", desc: "Order booked & inventory allocated" },
    { label: "Batch & Hologram Check", desc: "Direct brand importer security seal verified" },
    { label: "Dispatched from Hub", desc: "Packed in temperature-controlled packaging" },
    { label: "Out for Delivery", desc: "Courier on route with OTP verification" },
    { label: "Delivered", desc: "Delivered with tamper-proof seal intact" }
  ];

  const handlePrint = () => {
    window.print();
  };

  const advanceTracking = () => {
    setTrackingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="order-confirmation-page container section-pad">
      {/* Success Celebration Banner */}
      <div className="order-success-banner">
        <div className="success-icon-wrap">
          <CheckCircle2 size={54} className="success-icon pulse-red" />
        </div>
        <span className="order-confirmed-tag">100% GENUINE &bull; ORDER CONFIRMED</span>
        <h1 className="order-confirmed-title">THANK YOU FOR YOUR SUPPLEMENT ORDER</h1>
        <p className="order-confirmed-sub">
          We've received your sports nutrition order. A confirmation with your official GST tax invoice and batch numbers has been dispatched to <strong>{order.customer?.email}</strong>.
        </p>

        <div className="order-id-pill">
          <span>ORDER REFERENCE ID:</span>
          <strong>{order.id}</strong>
        </div>
      </div>

      {/* Interactive Delivery Tracking Simulator */}
      <div className="tracking-timeline-card mt-30">
        <div className="tracking-card-header">
          <div className="tracking-title-wrap">
            <Truck size={22} className="truck-red" />
            <div>
              <h3>LIVE SHIPMENT & COURIER DISPATCH STATUS</h3>
              <p>Estimated Delivery by: <strong>{order.estimatedDelivery}</strong></p>
            </div>
          </div>
          <button className="btn-secondary btn-sm" onClick={advanceTracking}>
            Simulate Next Status Step &rarr;
          </button>
        </div>

        <div className="tracking-steps-horizontal">
          {steps.map((st, i) => (
            <div 
              key={i} 
              className={`timeline-node ${i <= trackingStep ? 'completed' : ''} ${i === trackingStep ? 'active' : ''}`}
            >
              <div className="node-marker">
                {i <= trackingStep ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <span className="marker-number">{i + 1}</span>
                )}
              </div>
              <div className="node-content">
                <span className="node-label">{st.label}</span>
                <span className="node-desc">{st.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details & Items Breakdown */}
      <div className="order-details-grid mt-30">
        {/* Left: Ordered Supplement Items */}
        <div className="ordered-items-card">
          <div className="card-header-row">
            <h3>ORDERED SPORTS SUPPLEMENTS ({order.items?.length || 1})</h3>
            <button className="print-invoice-btn" onClick={handlePrint}>
              <Printer size={15} /> Print Invoice
            </button>
          </div>

          <div className="ordered-items-list">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="ordered-item-row">
                <img 
                  src={item.image || '/assets/products/01_whey_protein_gold_standard.jpg'} 
                  alt={item.name} 
                  className="ordered-item-img" 
                />
                <div className="ordered-item-info">
                  <span className="ordered-item-brand">{item.brand || 'Oliver Pro'}</span>
                  <h4>{item.name}</h4>
                  <div className="ordered-item-pills">
                    <span className="pill">{item.weight || item.size || '2 kg'}</span>
                    {item.flavor && <span className="pill">{item.flavor}</span>}
                    <span className="pill">Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="ordered-item-total">
                  ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="order-pricing-summary mt-20">
            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{(order.pricing?.subtotal || order.subtotal || 0).toLocaleString('en-IN')}</span>
            </div>
            {order.pricing?.discount > 0 && (
              <div className="price-row discount-row">
                <span>Discount</span>
                <span>-₹{order.pricing.discount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="price-row">
              <span>Insured Shipping</span>
              <span>{(order.pricing?.shipping || order.shipping) === 0 ? <strong className="free-text">FREE</strong> : `₹${order.pricing?.shipping || order.shipping}`}</span>
            </div>
            <div className="price-row total-row">
              <strong>Grand Total Paid</strong>
              <strong className="grand-price">₹{(order.pricing?.total || order.total || 0).toLocaleString('en-IN')}</strong>
            </div>
          </div>
        </div>

        {/* Right: Shipping Address & Authenticity Notice */}
        <div className="order-meta-col">
          <div className="order-address-card">
            <h3>DELIVERY ADDRESS</h3>
            <p className="customer-name"><strong>{order.customer?.name}</strong></p>
            <p className="address-line">{order.shippingAddress?.address}</p>
            {order.shippingAddress?.apartment && (
              <p className="address-line">{order.shippingAddress?.apartment}</p>
            )}
            <p className="address-line">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
            </p>
            <p className="contact-line">Phone: {order.customer?.phone}</p>
            <p className="contact-line">Email: {order.customer?.email}</p>
          </div>

          <div className="payment-summary-card mt-20">
            <h3>PAYMENT DETAILS</h3>
            <div className="payment-line">
              <span>Method:</span>
              <strong>{order.paymentMethod || 'UPI (Instant QR)'}</strong>
            </div>
            <div className="payment-line">
              <span>Status:</span>
              <strong className="payment-success-badge">{order.paymentStatus || 'Verified & Paid'}</strong>
            </div>
          </div>

          <div className="authenticity-guarantee-card mt-20">
            <ShieldCheck size={24} className="shield-green" />
            <div>
              <strong>100% Genuine Importer Seal</strong>
              <p>Every tub is inspected for physical seal integrity prior to dispatch. Scratch & scan the QR upon arrival to verify authenticity.</p>
            </div>
          </div>

          <div className="next-actions-row mt-25">
            <Link to="/shop" className="btn-primary w-100 text-center">
              CONTINUE SHOPPING &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
