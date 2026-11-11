import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Truck, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';

export default function OrderTracking() {
  const [queryId, setQueryId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!queryId.trim()) return;
    setLoading(true);
    setHasSearched(true);
    const order = await api.getOrder(queryId.trim());
    setTrackedOrder(order);
    setLoading(false);
  };

  const steps = [
    { label: "Order Confirmed & Payment Verified", desc: "Batch & manufacturer seal validated", completed: true },
    { label: "Inspected at Temperature-Controlled Hub", desc: "Anti-tamper holographic security applied", completed: true },
    { label: "Dispatched via BlueDart Express", desc: "AWB #BD-882910482 generated & in transit", completed: true },
    { label: "Arrived at Destination Hub (Mumbai / Delhi / Bengaluru)", desc: "Scheduled for morning delivery run", completed: false },
    { label: "Out for Delivery with OTP", desc: "Courier partner on route to destination address", completed: false }
  ];

  return (
    <div className="tracking-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <span className="current">Live Order Tracking</span>
      </nav>

      <div className="tracking-hero-card">
        <span className="tracking-pre-badge">
          <Truck size={14} /> REAL-TIME COURIER TELEMETRY
        </span>
        <h1 className="tracking-title">TRACK YOUR SUPPLEMENT SHIPMENT</h1>
        <p className="tracking-subtext">
          Enter your Oliver Order ID (e.g. OLIVER-94281-5501) or 10-digit mobile number to monitor your live shipment progress and delivery timeline.
        </p>

        <form onSubmit={handleTrack} className="tracking-search-form mt-25">
          <input 
            type="text" 
            placeholder="Enter Order ID (e.g. OLIVER-94281-5501)..." 
            value={queryId}
            onChange={(e) => setQueryId(e.target.value)}
            className="tracking-input"
            required
          />
          <button type="submit" className="btn-primary tracking-submit-btn" disabled={loading}>
            {loading ? 'LOCATING...' : 'TRACK SHIPMENT'}
          </button>
        </form>
      </div>

      {/* Results View */}
      {hasSearched && (
        <div className="tracking-results-wrap mt-40">
          {trackedOrder ? (
            <div className="tracked-order-card">
              <div className="tracked-top-info">
                <div>
                  <span className="info-label">SHIPMENT STATUS:</span>
                  <div className="info-status-badge">
                    <Truck size={16} /> {trackedOrder.status || 'IN TRANSIT'}
                  </div>
                </div>
                <div>
                  <span className="info-label">ESTIMATED ARRIVAL:</span>
                  <strong className="info-est-date">{trackedOrder.estimatedDelivery || 'In 2 Business Days'}</strong>
                </div>
                <div>
                  <span className="info-label">COURIER PARTNER:</span>
                  <strong className="info-carrier">
                    {trackedOrder.courier || 'BlueDart Air Express'} ({trackedOrder.trackingId || 'Processing'})
                  </strong>
                  {trackedOrder.trackingUrl && (
                    <div style={{ marginTop: '4px' }}>
                      <a href={trackedOrder.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#E50914', fontSize: '0.78rem' }}>
                        Track on Courier Website &rarr;
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Node Line */}
              <div className="tracking-progress-timeline mt-35">
                {(trackedOrder.statusTimeline && trackedOrder.statusTimeline.length > 0 ? trackedOrder.statusTimeline : steps).map((st, i) => (
                  <div key={i} className={`tracking-progress-step ${st.completed ? 'done' : ''} ${st.status === trackedOrder.status ? 'current' : ''}`}>
                    <div className="step-circle">
                      {st.completed ? <CheckCircle2 size={18} /> : <span>{i + 1}</span>}
                    </div>
                    <div className="step-text-content">
                      <strong className="step-title-text">{st.status || st.label}</strong>
                      <p className="step-desc-text">{st.date || st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="tracked-footer mt-30">
                <div className="auth-seal-note">
                  <ShieldCheck size={20} className="shield-icon" />
                  <div>
                    <strong>Tamper-Evident Delivery Protocol</strong>
                    <p>Do not accept delivery if the outer Oliver security tape has been cut or re-taped. Share OTP only upon inspection.</p>
                  </div>
                </div>
                <Link to={`/order-confirmation/${trackedOrder.id}`} className="btn-secondary btn-sm">
                  View Full Invoice &bull; Order Summary &rarr;
                </Link>
              </div>
            </div>
          ) : (
            <div className="tracking-not-found mt-30 text-center">
              <h3>NO ACTIVE SHIPMENT FOUND</h3>
              <p>Please double-check your Order Reference ID or contact our 24/7 athlete support team.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

