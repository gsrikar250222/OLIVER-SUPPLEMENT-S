import React, { useState, useEffect } from 'react';
import { FileText, Save, Eye, CheckCircle2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function PagesManager() {
  const { showToast } = useAdmin();
  const [pages, setPages] = useState([]);
  const [selectedSlug, setSelectedSlug] = useState('about');
  const [activePage, setActivePage] = useState({ title: '', slug: '', content: '', status: 'published' });
  const [saving, setSaving] = useState(false);

  const loadPages = async () => {
    try {
      const res = await adminApi.getPages();
      const list = res.pages || [];
      setPages(list);
      const current = list.find(p => p.slug === selectedSlug) || list[0];
      if (current) {
        setActivePage(current);
        setSelectedSlug(current.slug);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleSelectPage = (p) => {
    setSelectedSlug(p.slug);
    setActivePage(p);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await adminApi.updatePage(activePage.slug, activePage);
      showToast(`Page "${activePage.title}" updated and published!`, 'success');
      loadPages();
    } catch (err) {
      showToast(err.message || 'Failed to save page', 'danger');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Website Pages & Policy CMS</h1>
          <p>Edit About Us, Policies, FAQ & customer legal information dynamically</p>
        </div>
        <button className="admin-primary-btn" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Publish Page Content'}</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '22px' }}>
        {/* Sidebar list of pages */}
        <div className="admin-card" style={{ padding: '12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#666', padding: '8px 12px' }}>
            Store Pages
          </div>
          {pages.map(p => (
            <div
              key={p.slug}
              onClick={() => handleSelectPage(p)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedSlug === p.slug ? '#222' : 'transparent',
                color: selectedSlug === p.slug ? '#fff' : '#aaa',
                marginBottom: '4px',
                fontWeight: 600,
                fontSize: '0.88rem'
              }}
            >
              <FileText size={15} color={selectedSlug === p.slug ? '#E50914' : '#666'} />
              <span>{p.title}</span>
            </div>
          ))}
        </div>

        {/* Content Editor */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Editing: {activePage.title}</h2>
            <span className="admin-badge success">
              Status: {activePage.status || 'published'}
            </span>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Page Title</label>
              <input
                type="text"
                className="admin-text-input"
                style={{ paddingLeft: '14px' }}
                value={activePage.title}
                onChange={(e) => setActivePage({ ...activePage, title: e.target.value })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">URL Slug</label>
              <input
                type="text"
                disabled
                className="admin-text-input"
                style={{ paddingLeft: '14px', opacity: 0.6 }}
                value={`/${activePage.slug}`}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Page Content (HTML / Text)</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '280px', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: '1.6' }}
                value={activePage.content}
                onChange={(e) => setActivePage({ ...activePage, content: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
