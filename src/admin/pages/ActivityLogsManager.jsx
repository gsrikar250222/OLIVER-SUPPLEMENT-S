import React, { useState, useEffect } from 'react';
import { History, Search, Clock, Shield } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';

export default function ActivityLogsManager() {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getActivityLogs();
      setLogs(res.logs || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter(l =>
    !searchTerm ||
    l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.adminName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.targetEntity && l.targetEntity.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Administrator Audit Trail & Activity Logs</h1>
          <p>Immutable forensic record of all administrative operations, price modifications & content updates</p>
        </div>
      </div>

      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div style={{ padding: '14px 20px', position: 'relative' }}>
          <input
            type="text"
            className="admin-search-field"
            style={{ width: '100%', paddingLeft: '34px' }}
            placeholder="Search activity by action, admin name or target entity..."
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
                <th>Timestamp</th>
                <th>Staff Administrator</th>
                <th>Action Taken</th>
                <th>Module / Entity</th>
                <th>Context Details</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map(l => (
                  <tr key={l.id}>
                    <td style={{ color: '#888', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                      <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      {new Date(l.timestamp).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <strong style={{ color: '#fff' }}>{l.adminName}</strong>
                      <div style={{ fontSize: '0.72rem', color: '#777' }}>{l.adminEmail}</div>
                    </td>
                    <td>
                      <strong style={{ color: '#E50914' }}>{l.action}</strong>
                    </td>
                    <td>
                      <span className="admin-badge neutral">{l.targetEntity}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: '#aaa', maxWidth: '350px' }}>
                      <code>{JSON.stringify(l.details || {})}</code>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#777' }}>
                    No audit records logged yet.
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

