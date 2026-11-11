import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye, 
  Printer, 
  Truck, 
  CheckCircle2, 
  Clock, 
  X, 
  FileText,
  MapPin,
  CreditCard,
  User,
  Phone,
  Mail,
  Send
} from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function OrdersManager() {
  const { showToast } = useAdmin();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [courierName, setCourierName] = useState('Blue Dart Express');
  const [trackingId, setTrackingId] = useState('');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [adminNote, setAdminNote] = useState('');

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getOrders();
      setOrders(res.orders || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const openOrderModal = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status || 'Order Placed');
    setCourierName(order.courier || 'Blue Dart Express');
    setTrackingId(order.trackingId || '');
    setTrackingUrl(order.trackingUrl || '');
    setAdminNote('');
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    try {
      const res = await adminApi.updateOrderStatus(selectedOrder.id, newStatus);
      showToast(`Order ${selectedOrder.id} status updated to ${newStatus}`, 'success');
      setSelectedOrder(res.order);
      loadOrders();
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'danger');
    }
  };

  const handleUpdateTracking = async () => {
    if (!selectedOrder) return;
    try {
      const res = await adminApi.updateOrderTracking(selectedOrder.id, {
        courier: courierName,
        trackingId,
        trackingUrl
      });
      showToast(`Tracking saved for ${selectedOrder.id}`, 'success');
      setSelectedOrder(res.order);
      loadOrders();
    } catch (err) {
      showToast(err.message || 'Failed to update tracking', 'danger');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!adminNote.trim() || !selectedOrder) return;
    try {
      const res = await adminApi.addOrderNote(selectedOrder.id, adminNote);
      showToast('Internal note recorded', 'info');
      setAdminNote('');
      setSelectedOrder(res.order);
      loadOrders();
    } catch (err) {
      showToast('Failed to add note', 'danger');
    }
  };

  const printInvoice = () => {
    window.print();
  };

  const filteredOrders = orders.filter(o => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm ||
      o.id.toLowerCase().includes(term) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(term)) ||
      (o.customer?.phone && o.customer.phone.includes(term)) ||
      (o.customer?.email && o.customer.email.toLowerCase().includes(term));

    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Customer Orders & Live Fulfillment</h1>
          <p>Real-time order tracking synchronization, invoice generation & dispatch workflows</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '16px 20px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <input
              type="text"
              className="admin-search-field"
              style={{ width: '100%', paddingLeft: '34px' }}
              placeholder="Search by Order ID, customer, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          </div>

          <select 
            className="admin-select-field"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Order Statuses ({orders.length})</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Packed">Packed</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Customer Info</th>
                <th>Items Qty</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(o => (
                  <tr key={o.id}>
                    <td>
                      <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{o.id}</strong>
                    </td>
                    <td style={{ color: '#888', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                      {o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN') : 'Recent'}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{o.customer?.name || 'Customer'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#777' }}>{o.customer?.phone}</div>
                    </td>
                    <td>
                      <span className="admin-badge neutral">
                        {(o.items || []).reduce((acc, curr) => acc + (curr.quantity || 1), 0)} items
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#10B981', fontSize: '0.95rem' }}>
                        ₹{(o.pricing?.total || o.total || 0).toLocaleString('en-IN')}
                      </strong>
                    </td>
                    <td>
                      <span className={`admin-badge ${o.paymentStatus?.includes('Paid') ? 'success' : 'warning'}`}>
                        {o.paymentMethod || 'UPI'}
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${
                        o.status === 'Delivered' ? 'success' : 
                        (o.status === 'Cancelled' ? 'danger' : 
                        (o.status === 'Order Placed' ? 'info' : 'warning'))
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="admin-primary-btn" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => openOrderModal(o)}
                      >
                        <Eye size={14} /> Manage
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No customer orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details & Fulfillment Modal */}
      {selectedOrder && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal-container large" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3 className="admin-modal-title">Order #{selectedOrder.id}</h3>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="admin-secondary-btn" onClick={printInvoice} title="Print Invoice">
                  <Printer size={15} /> Print Invoice
                </button>
                <button className="admin-icon-btn" onClick={() => setSelectedOrder(null)}>
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="admin-modal-body">
              {/* Order Status Controller */}
              <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '18px', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 12px', textTransform: 'uppercase' }}>
                  Fulfillment Status (Synchronized with Customer Tracking Portal)
                </h4>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    className="admin-select-field"
                    style={{ flex: 1, minWidth: '220px', height: '42px' }}
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Batch Verified">Batch Verified</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed & Sealed">Packed & Sealed</option>
                    <option value="Dispatched from Warehouse">Dispatched from Warehouse</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered (Seal Intact)</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Return Requested">Return Requested</option>
                    <option value="Returned">Returned</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                  <button className="admin-primary-btn" onClick={handleUpdateStatus}>
                    Update Status
                  </button>
                </div>
              </div>

              {/* Shipping & Tracking Configuration */}
              <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '18px', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', fontSize: '0.95rem', margin: '0 0 12px', textTransform: 'uppercase' }}>
                  Courier & Tracking Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label className="admin-form-label">Courier Company</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '12px' }}
                      value={courierName}
                      onChange={(e) => setCourierName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="admin-form-label">Tracking ID / AWB</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '12px' }}
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="admin-form-label">Tracking URL</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '12px' }}
                      value={trackingUrl}
                      onChange={(e) => setTrackingUrl(e.target.value)}
                    />
                  </div>
                </div>
                <button className="admin-secondary-btn" onClick={handleUpdateTracking}>
                  Save Courier Tracking
                </button>
              </div>

              {/* Grid: Customer & Delivery Address */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ color: '#fff', fontSize: '0.88rem', margin: '0 0 10px', textTransform: 'uppercase' }}>
                    Customer Details
                  </h4>
                  <div style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: '1.7' }}>
                    <div><User size={13} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {selectedOrder.customer?.name}</div>
                    <div><Mail size={13} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {selectedOrder.customer?.email}</div>
                    <div><Phone size={13} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {selectedOrder.customer?.phone}</div>
                  </div>
                </div>

                <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '16px' }}>
                  <h4 style={{ color: '#fff', fontSize: '0.88rem', margin: '0 0 10px', textTransform: 'uppercase' }}>
                    Delivery Address
                  </h4>
                  <div style={{ color: '#ccc', fontSize: '0.85rem', lineHeight: '1.7' }}>
                    <div><MapPin size={13} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {selectedOrder.shippingAddress?.address}</div>
                    <div>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state || ''} - {selectedOrder.shippingAddress?.pincode}</div>
                  </div>
                </div>
              </div>

              {/* Items Purchased List */}
              <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ color: '#fff', fontSize: '0.88rem', margin: '0 0 12px', textTransform: 'uppercase' }}>
                  Supplement Items ({(selectedOrder.items || []).length})
                </h4>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Variant / Flavor</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedOrder.items || []).map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div style={{ color: '#fff', fontWeight: 700 }}>{item.name}</div>
                        </td>
                        <td>
                          <span style={{ color: '#aaa', fontSize: '0.8rem' }}>
                            {item.flavor || 'Standard'} / {item.weight || item.size || 'Standard'}
                          </span>
                        </td>
                        <td>₹{(item.price || 0).toLocaleString('en-IN')}</td>
                        <td>{item.quantity || 1}</td>
                        <td>
                          <strong style={{ color: '#fff' }}>
                            ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pricing Summary */}
                <div style={{ textAlign: 'right', marginTop: '16px', borderTop: '1px solid #222', paddingTop: '12px', fontSize: '0.9rem' }}>
                  <div style={{ color: '#888', marginBottom: '4px' }}>
                    Subtotal: ₹{(selectedOrder.pricing?.subtotal || selectedOrder.total || 0).toLocaleString('en-IN')}
                  </div>
                  {selectedOrder.pricing?.discount > 0 && (
                    <div style={{ color: '#E50914', marginBottom: '4px' }}>
                      Coupon Discount: -₹{selectedOrder.pricing.discount.toLocaleString('en-IN')}
                    </div>
                  )}
                  <div style={{ color: '#888', marginBottom: '4px' }}>
                    Shipping: ₹{selectedOrder.pricing?.shipping || 0}
                  </div>
                  <div style={{ color: '#888', marginBottom: '6px' }}>
                    GST (18% Sports Nutrition): ₹{selectedOrder.pricing?.gst || 0}
                  </div>
                  <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 900 }}>
                    Total: ₹{(selectedOrder.pricing?.total || selectedOrder.total || 0).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Internal Notes */}
              <div style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '16px' }}>
                <h4 style={{ color: '#fff', fontSize: '0.88rem', margin: '0 0 10px', textTransform: 'uppercase' }}>
                  Internal Admin Notes
                </h4>
                {(selectedOrder.notes || []).map((n, idx) => (
                  <div key={idx} style={{ background: '#141414', padding: '8px 12px', borderRadius: '6px', marginBottom: '8px', fontSize: '0.82rem' }}>
                    <div style={{ color: '#fff' }}>{n.text}</div>
                    <div style={{ color: '#666', fontSize: '0.72rem', marginTop: '4px' }}>By {n.author} • {n.date}</div>
                  </div>
                ))}
                <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '12px' }}
                    placeholder="Add an internal note about this shipment..."
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                  />
                  <button type="submit" className="admin-secondary-btn">
                    <Send size={14} /> Add
                  </button>
                </form>
              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-secondary-btn" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
