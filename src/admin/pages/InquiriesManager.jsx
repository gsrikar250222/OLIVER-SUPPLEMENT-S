import React, { useState, useEffect } from 'react';
import { Mail, Clock, Phone, User, CheckCircle2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';

export default function InquiriesManager() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getInquiries();
      setInquiries(res.inquiries || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Customer Contact Inquiries</h1>
          <p>Inbox of support questions, importer verification requests & order inquiries</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sender</th>
                <th>Contact</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map(item => (
                  <tr key={item.id}>
                    <td style={{ color: '#888', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                      {new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN')}
                    </td>
                    <td>
                      <strong style={{ color: '#fff' }}>{item.name}</strong>
                    </td>
                    <td>
                      <div>{item.email}</div>
                      <small style={{ color: '#777' }}>{item.phone || 'N/A'}</small>
                    </td>
                    <td>
                      <strong style={{ color: '#fff' }}>{item.subject}</strong>
                    </td>
                    <td style={{ color: '#aaa', fontSize: '0.85rem', maxWidth: '350px' }}>
                      {item.message}
                    </td>
                    <td>
                      <span className={`admin-badge ${item.status === 'replied' ? 'success' : 'warning'}`}>
                        {item.status || 'new'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No customer contact messages received yet.
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

