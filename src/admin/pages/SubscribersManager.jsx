import React, { useState, useEffect } from 'react';
import { Send, Download, Mail } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';

export default function SubscribersManager() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getSubscribers().then(res => {
      setSubscribers(res.subscribers || []);
    }).finally(() => setLoading(false));
  }, []);

  const exportCsv = () => {
    const headers = ['Email', 'Subscribed Date'];
    const rows = subscribers.map(s => [s.email, s.subscribedAt || '']);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `oliver_subscribers_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Newsletter & VIP Athlete Subscribers</h1>
          <p>{subscribers.length} athletes subscribed to drop announcements & offers</p>
        </div>
        <button className="admin-secondary-btn" onClick={exportCsv}>
          <Download size={15} /> Export CSV List
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Subscriber Email</th>
                <th>Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((s, idx) => (
                  <tr key={idx}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mail size={14} color="#E50914" />
                        <strong style={{ color: '#fff' }}>{s.email}</strong>
                      </div>
                    </td>
                    <td style={{ color: '#888' }}>
                      {s.subscribedAt ? new Date(s.subscribedAt).toLocaleString('en-IN') : 'Recent'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No newsletter subscriptions yet.
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

