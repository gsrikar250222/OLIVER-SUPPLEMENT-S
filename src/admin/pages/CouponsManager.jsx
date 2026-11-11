import React, { useState, useEffect } from 'react';
import { Tag, Plus, Edit3, Trash2, X, CheckCircle2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function CouponsManager() {
  const { showToast } = useAdmin();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percent',
    value: 10,
    minOrder: 0,
    maxDiscount: 1500,
    description: '',
    usageLimit: 1000,
    expiryDate: '2028-12-31',
    status: 'active'
  });

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCoupons();
      setCoupons(res.coupons || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const openCreateModal = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      type: 'percent',
      value: 10,
      minOrder: 0,
      maxDiscount: 1500,
      description: 'Exclusive Discount',
      usageLimit: 1000,
      expiryDate: '2028-12-31',
      status: 'active'
    });
    setModalOpen(true);
  };

  const openEditModal = (c) => {
    setEditingCoupon(c);
    setFormData({ ...c });
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        code: formData.code.toUpperCase().trim(),
        value: Number(formData.value),
        minOrder: Number(formData.minOrder || 0),
        maxDiscount: Number(formData.maxDiscount || 0)
      };

      if (editingCoupon) {
        await adminApi.updateCoupon(editingCoupon.id, payload);
        showToast(`Coupon ${payload.code} updated`, 'success');
      } else {
        await adminApi.createCoupon(payload);
        showToast(`Created coupon ${payload.code}`, 'success');
      }
      setModalOpen(false);
      loadCoupons();
    } catch (err) {
      showToast(err.message || 'Failed to save coupon', 'danger');
    }
  };

  const handleDelete = async (id, code) => {
    if (!window.confirm(`Delete coupon "${code}"?`)) return;
    try {
      await adminApi.deleteCoupon(id);
      showToast(`Deleted coupon ${code}`, 'info');
      loadCoupons();
    } catch (err) {
      showToast(err.message || 'Failed to delete coupon', 'danger');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Coupons & Promotional Offers</h1>
          <p>Create and manage discount codes, minimum spend thresholds & usage limits</p>
        </div>
        <button className="admin-primary-btn" onClick={openCreateModal}>
          <Plus size={16} /> Create Coupon Code
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Discount Type</th>
                <th>Discount Value</th>
                <th>Min. Order</th>
                <th>Usage Count</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id || c.code}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag size={15} color="#E50914" />
                      <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{c.code}</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#777' }}>{c.description}</div>
                  </td>
                  <td>
                    <span className="admin-badge neutral">{c.type}</span>
                  </td>
                  <td>
                    <strong style={{ color: '#10B981', fontSize: '1rem' }}>
                      {c.type === 'percent' ? `${c.value}% OFF` : (c.type === 'free_shipping' ? 'Free Shipping' : `₹${c.value} FLAT`)}
                    </strong>
                  </td>
                  <td>{c.minOrder > 0 ? `₹${c.minOrder.toLocaleString('en-IN')}` : 'No Min.'}</td>
                  <td>{c.usageCount || 0} / {c.usageLimit || '∞'}</td>
                  <td>{c.expiryDate}</td>
                  <td>
                    <span className={`admin-badge ${c.status === 'active' ? 'success' : 'neutral'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-icon-btn" onClick={() => openEditModal(c)} title="Edit Coupon">
                        <Edit3 size={15} />
                      </button>
                      <button className="admin-icon-btn delete" onClick={() => handleDelete(c.id, c.code)} title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                {editingCoupon ? `Edit Coupon: ${editingCoupon.code}` : 'Create New Discount Coupon'}
              </h3>
              <button className="admin-icon-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="admin-modal-body">
                <div className="admin-form-grid">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Coupon Code (Uppercase)</label>
                    <input
                      type="text"
                      required
                      className="admin-text-input"
                      style={{ paddingLeft: '14px', textTransform: 'uppercase', fontWeight: 800 }}
                      placeholder="e.g. WHEY25"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Discount Type</label>
                    <select
                      className="admin-select-field"
                      style={{ width: '100%', height: '44px' }}
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="percent">Percentage Off (%)</option>
                      <option value="flat">Flat Amount Off (₹)</option>
                      <option value="free_shipping">Free Shipping</option>
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Discount Value (% or ₹)</label>
                    <input
                      type="number"
                      required
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Minimum Cart Subtotal (₹)</label>
                    <input
                      type="number"
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={formData.minOrder}
                      onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Expiry Date</label>
                    <input
                      type="date"
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Usage Limit (Total)</label>
                    <input
                      type="number"
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={formData.usageLimit}
                      onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                    <label className="admin-form-label">Description / Offer Headline</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="admin-secondary-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

