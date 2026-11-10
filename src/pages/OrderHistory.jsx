import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowRight, ShieldCheck, Clock, ExternalLink } from 'lucide-react';

export default function OrderHistory() {
  const savedOrders = JSON.parse(localStorage.getItem('oliver_orders') || '[]');

  // Default sample order if user has empty local orders
  const orders = savedOrders.length > 0 ? savedOrders : [
    {
      id: 'OLIVER-94281-5501',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'In Transit',
      estimatedDelivery: 'Tomorrow, by 6:00 PM',
      items: [
        {
          productId: 'p01',
          name: 'Gold Standard 100% Whey Protein',
          brand: 'Optimum Nutrition',
          price: 3299,
          quantity: 1,
          weight: '2 kg (4.4 lbs)',
          flavor: 'Double Rich Chocolate',
          image: '/assets/products/01_whey_protein_gold_standard.jpg'
        },
        {
          productId: 'p11',
          name: 'Creatine Monohydrate 200 Mesh',
          brand: 'OLIVER Pro Nutrition',
          price: 999,
          quantity: 1,
          weight: '250g (83 Servings)',
          flavor: 'Unflavored Micronized',
          image: '/assets/products/11_creatine_monohydrate.jpg'
        }
      ],
      pricing: { subtotal: 4298, discount: 430, shipping: 0, total: 3868 }
    }
  ];

  return (
    <div className="orders-page-wrap container section-pad">
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>&gt;</span>
        <Link to="/account">Account</Link>
        <span>&gt;</span>
        <span className="current">Order History</span>
      </nav>

      <div className="section-header">
        <div>
          <span className="section-pre-title">ALL SHIPMENTS & INVOICES</span>
          <h1 className="section-title">YOUR ORDER HISTORY ({orders.length})</h1>
        </div>
        <Link to="/track-order" className="section-header-link">
          Track Live Courier Shipment &rarr;
        </Link>
      </div>

      <div className="orders-full-list mt-30">
        {orders.map((order) => (
          <div key={order.id} className="order-history-card">
            <div className="order-card-header">
              <div className="order-meta-info">
                <div>
                  <span className="meta-label">ORDER ID</span>
                  <strong className="meta-val">{order.id}</strong>
                </div>
                <div>
                  <span className="meta-label">DATE PLACED</span>
                  <strong className="meta-val">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                  </strong>
                </div>
                <div>
                  <span className="meta-label">TOTAL AMOUNT</span>
                  <strong className="meta-val">₹{(order.pricing?.total || order.total || 0).toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div className="order-status-badge-wrap">
                <span className="status-badge live-status">
                  <Truck size={14} /> {order.status || 'Dispatched'}
                </span>
                <Link to={`/order-confirmation/${order.id}`} className="order-details-link">
                  View Full Invoice &bull; Track &rarr;
                </Link>
              </div>
            </div>

            {/* Items in this order */}
            <div className="order-card-items-list">
              {(order.items || []).map((item, idx) => (
                <div key={idx} className="order-item-inline">
                  <img 
                    src={item.image || '/assets/products/01_whey_protein_gold_standard.jpg'} 
                    alt={item.name} 
                    className="order-inline-img" 
                  />
                  <div className="order-inline-details">
                    <span className="inline-brand">{item.brand || 'Oliver Pro'}</span>
                    <h4 className="inline-name">{item.name}</h4>
                    <span className="inline-specs">
                      {item.weight || item.size || '2 kg'} &bull; {item.flavor || 'Standard'} &bull; Qty: {item.quantity || 1}
                    </span>
                  </div>
                  <div className="order-inline-price">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <div className="est-delivery-note">
                <Clock size={15} /> Estimated Delivery: <strong>{order.estimatedDelivery || 'In 2-3 business days'}</strong>
              </div>
              <Link to={`/order-confirmation/${order.id}`} className="btn-secondary btn-sm">
                Track Live Order Timeline
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

