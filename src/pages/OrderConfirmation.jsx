import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { CheckCircle2, Package, Truck, Clock, ArrowRight, Printer, MapPin, CreditCard, ChevronRight } from 'lucide-react';

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
    }
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="container section-pad text-center">
        <h2>RETRIEVING ORDER DETAILS...</h2>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container section-pad text-center">
        <h2>ORDER NOT FOUND</h2>
        <p>No order was found with ID <strong>{id}</strong>.</p>
        <Link to="/shop" className="btn btn-primary mt-20">Back to Shop</Link>
      </div>
    );
  }

  const steps = [
    { label: "Order Placed & Verified", desc: "Payment received & inventory allocated" },
    { label: "Atelier Inspection", desc: "Garments packaged with anti-static seal" },
    { label: "Dispatched from Hub", desc: "Handed over to BlueDart Express" },
    { label: "Out for Delivery", desc: "Courier on route to your address" },
    { label: "Delivered", desc: "Delivered to recipient" }
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
          <CheckCircle2 size={54} className="success-icon" />
        </div>
        <span className="order-confirmed-tag">ORDER CONFIRMED</span>
        <h1 className="order-confirmed-title">THANK YOU FOR YOUR ORDER</h1>
        <p className="order-confirmed-sub">
          We've received your order and our atelier is preparing your garments. A confirmation with your invoice has been sent to <strong>{order.customer?.email}</strong>.
        </p>

        <div className="order-id-pill">
          <span>ORDER ID:</span>
          <strong>{order.id}</strong>
        </div>
      </div>

      {/* Interactive Delivery Tracking Simulator */}
      <div className="tracking-timeline-card">
        <div className="tracking-card-header">
          <div className="tracking-title-wrap">
            <Truck size={22} />
            <div>
              <h3>LIVE DISPATCH & DELIVERY STATUS</h3>
              <p>Estimated Delivery by: <strong>{order.estimatedDelivery}</strong></p>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={advanceTracking}>
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
                {i < trackingStep ? (
                  <CheckCircle2 size={18} />
                ) : (
                  <span>{i + 1}</span>
                )}
              </div>
              <div className="node-info">
                <h4>{st.label}</h4>
                <p>{st.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Grid */}
      <div className="order-details-layout">
        {/* Purchased Items List */}
        <div className="order-items-col">
          <h3 className="section-title">ITEMS ORDERED ({order.items?.length})</h3>
          <div className="confirmed-items-list">
            {order.items?.map((item, idx) => (
              <div key={idx} className="confirmed-item-row">
                <img src={`/${item.image.replace(/^\//, '')}`} alt={item.name} className="confirmed-item-thumb" />
                <div className="confirmed-item-details">
                  <h4>{item.name}</h4>
                  <span className="confirmed-item-variants">
                    Size: <strong>{item.size}</strong> {item.color ? `• Color: ${item.color}` : ''}
                  </span>
                  <span className="confirmed-item-qty">Qty: {item.quantity}</span>
                </div>
                <div className="confirmed-item-price">
                  <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="order-cost-breakdown-card">
            <div className="cost-row">
              <span>Subtotal</span>
              <span>₹{order.pricing?.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            {order.pricing?.discount > 0 && (
              <div className="cost-row green-text">
                <span>Coupon Discount</span>
                <span>-₹{order.pricing?.discount?.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="cost-row">
              <span>Shipping Charge</span>
              <span>{order.pricing?.shipping === 0 ? 'FREE' : `₹${order.pricing?.shipping}`}</span>
            </div>
            <div className="cost-row">
              <span>GST (5% Apparel)</span>
              <span>₹{order.pricing?.gst?.toLocaleString('en-IN')}</span>
            </div>
            <div className="cost-row total-highlight">
              <span>Total Amount Paid</span>
              <span>₹{order.pricing?.total?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Customer & Delivery Summary Card */}
        <div className="order-meta-col">
          <div className="customer-meta-card">
            <h3 className="section-title">DELIVERY & PAYMENT DETAILS</h3>

            <div className="meta-block">
              <div className="meta-block-title">
                <MapPin size={18} />
                <strong>Shipping Address</strong>
              </div>
              <p>
                <strong>{order.customer?.name}</strong><br />
                {order.shippingAddress?.address}<br />
                {order.shippingAddress?.apartment && <>{order.shippingAddress.apartment}<br /></>}
                {order.shippingAddress?.city}, {order.shippingAddress?.state} — {order.shippingAddress?.pincode}<br />
                Phone: +91 {order.customer?.phone}
              </p>
            </div>

            <div className="meta-block">
              <div className="meta-block-title">
                <CreditCard size={18} />
                <strong>Payment Information</strong>
              </div>
              <p>
                Method: <strong>{order.paymentMethod}</strong><br />
                Status: <span className="payment-status-pill">{order.paymentStatus}</span>
              </p>
            </div>

            <div className="meta-actions">
              <button onClick={handlePrint} className="btn btn-outline full-width">
                <Printer size={16} /> Print Order Receipt
              </button>
              <Link to="/shop" className="btn btn-primary full-width mt-12">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

