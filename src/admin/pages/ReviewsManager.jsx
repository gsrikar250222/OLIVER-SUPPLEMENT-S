import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, ShieldCheck } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function ReviewsManager() {
  const { showToast } = useAdmin();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getReviews();
      setReviews(res.reviews || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await adminApi.updateReviewStatus(id, status);
      showToast(`Review status updated to ${status}`, 'success');
      loadReviews();
    } catch (err) {
      showToast('Failed to update review status', 'danger');
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Product Reviews & Customer Feedback Moderation</h1>
          <p>Approve, moderate and review verified purchase athlete feedback</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Review Comment</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length > 0 ? (
                reviews.map(r => (
                  <tr key={r.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{r.userName || 'Athlete'}</strong>
                    </td>
                    <td>{r.productName || r.productId}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '2px', color: '#FBBF24' }}>
                        {[...Array(r.rating || 5)].map((_, i) => (
                          <Star key={i} size={13} fill="#FBBF24" />
                        ))}
                      </div>
                    </td>
                    <td style={{ color: '#ddd', fontSize: '0.85rem', maxWidth: '350px' }}>
                      {r.comment}
                    </td>
                    <td>
                      <span className="admin-badge success">
                        <ShieldCheck size={11} /> Verified Order
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${r.status === 'approved' ? 'success' : (r.status === 'rejected' ? 'danger' : 'warning')}`}>
                        {r.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button 
                          className="admin-icon-btn" 
                          style={{ color: '#10B981' }} 
                          onClick={() => updateStatus(r.id, 'approved')} 
                          title="Approve Review"
                        >
                          <CheckCircle size={15} />
                        </button>
                        <button 
                          className="admin-icon-btn delete" 
                          onClick={() => updateStatus(r.id, 'rejected')} 
                          title="Reject Review"
                        >
                          <XCircle size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No pending customer reviews awaiting moderation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
