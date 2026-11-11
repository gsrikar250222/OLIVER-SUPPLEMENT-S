import React, { useState, useEffect } from 'react';
import { Users, Search, Phone, Mail, ShoppingBag } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function CustomersManager() {
  const { showToast } = useAdmin();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCustomers();
      setCustomers(res.customers || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const toggleStatus = async (c) => {
    const newStatus = c.status === 'blocked' ? 'active' : 'blocked';
    try {
      await adminApi.updateCustomer(c.id, { status: newStatus });
      showToast(`Customer ${c.name} is now ${newStatus}`, 'info');
      loadCustomers();
    } catch (err) {
      showToast('Failed to update status', 'danger');
    }
  };

  const filtered = customers.filter(c =>
    !searchTerm ||
    (c.name && c.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.phone && c.phone.includes(searchTerm))
  );

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Athlete Customer Directory</h1>
          <p>View registered lifters, lifetime spending, order histories & account status</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', position: 'relative' }}>
          <input
            type="text"
            className="admin-search-field"
            style={{ width: '100%', paddingLeft: '34px' }}
            placeholder="Search by customer name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={15} style={{ position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact Email & Phone</th>
                <th>Total Orders</th>
                <th>Lifetime Spend</th>
                <th>Last Order</th>
                <th>Account Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(c => (
                  <tr key={c.id || c.email}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="admin-user-avatar" style={{ width: '32px', height: '32px' }}>
                          {c.name ? c.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <strong style={{ color: '#fff' }}>{c.name}</strong>
                      </div>
                    </td>
                    <td>
                      <div style={{ color: '#ddd' }}>{c.email}</div>
                      <div style={{ color: '#777', fontSize: '0.78rem' }}>{c.phone}</div>
                    </td>
                    <td>
                      <span className="admin-badge neutral">{c.totalOrders || 1} orders</span>
                    </td>
                    <td>
                      <strong style={{ color: '#10B981' }}>₹{(c.totalSpent || 0).toLocaleString('en-IN')}</strong>
                    </td>
                    <td style={{ color: '#888', fontSize: '0.8rem' }}>
                      {c.lastOrderDate ? new Date(c.lastOrderDate).toLocaleDateString('en-IN') : 'Recent'}
                    </td>
                    <td>
                      <span className={`admin-badge ${c.status === 'blocked' ? 'danger' : 'success'}`}>
                        {c.status || 'active'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="admin-secondary-btn" 
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                        onClick={() => toggleStatus(c)}
                      >
                        {c.status === 'blocked' ? 'Reactivate' : 'Block'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No customer accounts found yet.
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
