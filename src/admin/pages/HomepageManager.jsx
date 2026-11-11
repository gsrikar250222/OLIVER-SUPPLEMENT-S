import React, { useState, useEffect } from 'react';
import { 
  Save, 
  RotateCcw, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ExternalLink, 
  Eye, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Zap, 
  Flame, 
  ArrowRight,
  Truck,
  PhoneCall
} from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function HomepageManager() {
  const { showToast } = useAdmin();
  const [config, setConfig] = useState(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    adminApi.getHomepageConfig().then(res => {
      if (res.success && res.homepage) {
        setConfig(res.homepage);
      }
    }).catch(err => {
      console.error('Error fetching homepage config:', err);
    });
  }, []);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await adminApi.updateHomepageConfig(config);
      showToast('Homepage published and synchronized with storefront!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save homepage settings', 'danger');
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e, fieldPath) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const uploadRes = await adminApi.uploadMedia(file.name, reader.result, 'hero');
        if (uploadRes.success && uploadRes.media?.url) {
          const newUrl = uploadRes.media.url;
          setConfig(prev => {
            const next = { ...prev };
            if (fieldPath === 'desktopBg') next.hero.desktopBgUrl = newUrl;
            if (fieldPath === 'mobileBg') next.hero.mobileBgUrl = newUrl;
            if (fieldPath === 'logo') next.header.logoUrl = newUrl;
            return next;
          });
          showToast(`Image uploaded: ${file.name}`, 'success');
        }
      } catch (err) {
        showToast('Image upload failed', 'danger');
      }
    };
    reader.readAsDataURL(file);
  };

  if (!config) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>
        Loading Master Homepage Configuration...
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Master Homepage Manager</h1>
          <p>Control the entire live storefront without writing code. Instant publish & reflection.</p>
        </div>
        <div className="admin-action-btn-row">
          <button 
            className="admin-secondary-btn" 
            onClick={() => setPreviewOpen(!previewOpen)}
          >
            <Eye size={15} />
            <span>{previewOpen ? 'Hide Live Preview' : 'Preview Changes'}</span>
          </button>
          <button 
            className="admin-primary-btn" 
            onClick={handleSave} 
            disabled={saving}
          >
            <Save size={16} />
            <span>{saving ? 'Publishing...' : 'Publish to Live Storefront'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #222', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'hero', label: '1. Full-Width Hero Section' },
          { id: 'announcement', label: '2. Top Announcement Bar' },
          { id: 'header', label: '3. Header & Navigation' },
          { id: 'badges', label: '4. Quality Badges' },
          { id: 'quickCats', label: '5. Quick Categories Bar' },
          { id: 'bestsellers', label: '6. Best Sellers Section' },
          { id: 'testimonials', label: '7. Athlete Testimonials' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              background: activeTab === t.id ? '#1e1e1e' : 'transparent',
              color: activeTab === t.id ? '#fff' : '#888',
              border: 'none',
              borderBottom: activeTab === t.id ? '2px solid #E50914' : '2px solid transparent',
              padding: '10px 18px',
              fontFamily: 'Barlow Condensed',
              fontSize: '1.05rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. HERO SECTION CONFIG */}
      {activeTab === 'hero' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Full-Width Cinematic Hero Settings</h2>
            <span style={{ color: '#888', fontSize: '0.8rem' }}>Desktop & Mobile artboards, headlines, CTA</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              {/* Desktop 4K BG */}
              <div className="admin-form-group">
                <label className="admin-form-label">Desktop 4K Background URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.desktopBgUrl}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, desktopBgUrl: e.target.value }
                  })}
                />
                <div style={{ marginTop: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label className="admin-secondary-btn" style={{ cursor: 'pointer', fontSize: '0.78rem' }}>
                    <Upload size={14} /> Upload 4K Desktop Background
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileUpload(e, 'desktopBg')} 
                    />
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Recommended: 2560x1000px</span>
                </div>
              </div>

              {/* Mobile Portrait BG */}
              <div className="admin-form-group">
                <label className="admin-form-label">Mobile Portrait Background URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.mobileBgUrl}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, mobileBgUrl: e.target.value }
                  })}
                />
                <div style={{ marginTop: '8px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <label className="admin-secondary-btn" style={{ cursor: 'pointer', fontSize: '0.78rem' }}>
                    <Upload size={14} /> Upload Mobile Background
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileUpload(e, 'mobileBg')} 
                    />
                  </label>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>Recommended: 1080x1440px</span>
                </div>
              </div>

              {/* Headline Line 1 */}
              <div className="admin-form-group">
                <label className="admin-form-label">Headline Line 1 (White)</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.headlineLine1}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, headlineLine1: e.target.value }
                  })}
                />
              </div>

              {/* Headline Line 2 */}
              <div className="admin-form-group">
                <label className="admin-form-label">Headline Line 2 (Highlighted Red)</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.headlineLine2}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, headlineLine2: e.target.value }
                  })}
                />
              </div>

              {/* CTA Text */}
              <div className="admin-form-group">
                <label className="admin-form-label">CTA Button Label</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.ctaText}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, ctaText: e.target.value }
                  })}
                />
              </div>

              {/* CTA Link */}
              <div className="admin-form-group">
                <label className="admin-form-label">CTA Destination URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.ctaLink}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, ctaLink: e.target.value }
                  })}
                />
              </div>

              {/* Overlay Darkness */}
              <div className="admin-form-group">
                <label className="admin-form-label">
                  Dark Overlay Darkness: {Math.round((config.hero.overlayDarkness || 0.7) * 100)}%
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="0.95"
                  step="0.05"
                  style={{ width: '100%', accentColor: '#E50914' }}
                  value={config.hero.overlayDarkness || 0.7}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, overlayDarkness: parseFloat(e.target.value) }
                  })}
                />
              </div>

              {/* Small Kicker */}
              <div className="admin-form-group">
                <label className="admin-form-label">Hero Kicker Subheading</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.hero.kicker}
                  onChange={(e) => setConfig({
                    ...config,
                    hero: { ...config.hero, kicker: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ANNOUNCEMENT BAR */}
      {activeTab === 'announcement' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Top Announcement Bar</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={config.announcementBar?.enabled ?? true}
                onChange={(e) => setConfig({
                  ...config,
                  announcementBar: { ...config.announcementBar, enabled: e.target.checked }
                })}
              />
              <span style={{ fontSize: '0.85rem', color: '#fff' }}>Enable Bar</span>
            </label>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '12px' }}>Announcement Items</h3>
              {(config.announcementBar?.items || []).map((item, idx) => (
                <div key={item.id || idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '14px', flex: 2 }}
                    placeholder="Announcement Message"
                    value={item.text}
                    onChange={(e) => {
                      const items = [...config.announcementBar.items];
                      items[idx].text = e.target.value;
                      setConfig({ ...config, announcementBar: { ...config.announcementBar, items } });
                    }}
                  />
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '14px', flex: 1 }}
                    placeholder="Link (optional)"
                    value={item.link || ''}
                    onChange={(e) => {
                      const items = [...config.announcementBar.items];
                      items[idx].link = e.target.value;
                      setConfig({ ...config, announcementBar: { ...config.announcementBar, items } });
                    }}
                  />
                  <button
                    className="admin-icon-btn delete"
                    onClick={() => {
                      const items = config.announcementBar.items.filter((_, i) => i !== idx);
                      setConfig({ ...config, announcementBar: { ...config.announcementBar, items } });
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <button
                className="admin-secondary-btn"
                style={{ marginTop: '10px' }}
                onClick={() => {
                  const items = config.announcementBar?.items ? [...config.announcementBar.items] : [];
                  items.push({ id: String(Date.now()), text: 'New Announcement Promo', icon: 'Zap', link: '/shop' });
                  setConfig({ ...config, announcementBar: { ...config.announcementBar, items } });
                }}
              >
                <Plus size={15} /> Add Announcement Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. HEADER & LOGO */}
      {activeTab === 'header' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Header, Logo & Navigation Links</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Brand Logo URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.header?.logoUrl || '/icons/logo.svg'}
                  onChange={(e) => setConfig({
                    ...config,
                    header: { ...config.header, logoUrl: e.target.value }
                  })}
                />
                <div style={{ marginTop: '8px' }}>
                  <label className="admin-secondary-btn" style={{ cursor: 'pointer', fontSize: '0.78rem' }}>
                    <Upload size={14} /> Upload New Logo (SVG / PNG)
                    <input 
                      type="file" 
                      accept="image/*" 
                      style={{ display: 'none' }} 
                      onChange={(e) => handleFileUpload(e, 'logo')} 
                    />
                  </label>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Search Input Placeholder</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.header?.searchPlaceholder || 'Search supplements, brands...'}
                  onChange={(e) => setConfig({
                    ...config,
                    header: { ...config.header, searchPlaceholder: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. QUALITY BADGES */}
      {activeTab === 'badges' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Quality, Strength & Performance Badges</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              {(config.hero?.badges || []).map((badge, idx) => (
                <div key={badge.id || idx} style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: '#E50914', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                      <Flame size={16} />
                    </div>
                    <strong style={{ color: '#fff', fontSize: '0.95rem' }}>Badge #{idx + 1}</strong>
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Badge Label</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={badge.name}
                      onChange={(e) => {
                        const badges = [...config.hero.badges];
                        badges[idx].name = e.target.value;
                        setConfig({ ...config, hero: { ...config.hero, badges } });
                      }}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Tooltip / Description</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '14px' }}
                      value={badge.title || ''}
                      onChange={(e) => {
                        const badges = [...config.hero.badges];
                        badges[idx].title = e.target.value;
                        setConfig({ ...config, hero: { ...config.hero, badges } });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. QUICK CATEGORIES */}
      {activeTab === 'quickCats' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Quick Categories Horizontal Bar</h2>
            <span style={{ color: '#888', fontSize: '0.8rem' }}>10 Glowing Category Tiles</span>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {(config.quickCategories || []).map((cat, idx) => (
                <div key={cat.id || idx} style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '8px', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <strong style={{ color: '#fff', fontSize: '0.85rem' }}>{cat.name}</strong>
                    <input
                      type="checkbox"
                      checked={cat.enabled ?? true}
                      onChange={(e) => {
                        const qc = [...config.quickCategories];
                        qc[idx].enabled = e.target.checked;
                        setConfig({ ...config, quickCategories: qc });
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    className="admin-text-input"
                    style={{ paddingLeft: '10px', fontSize: '0.8rem', padding: '6px 10px' }}
                    value={cat.name}
                    onChange={(e) => {
                      const qc = [...config.quickCategories];
                      qc[idx].name = e.target.value;
                      setConfig({ ...config, quickCategories: qc });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. BEST SELLERS SECTION */}
      {activeTab === 'bestsellers' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Best Sellers Carousel Configuration</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Section Heading</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.bestSellersSection?.title || 'Best Sellers'}
                  onChange={(e) => setConfig({
                    ...config,
                    bestSellersSection: { ...config.bestSellersSection, title: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Section Subtitle</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.bestSellersSection?.subtitle || 'Top choice supplements trusted by fitness enthusiasts'}
                  onChange={(e) => setConfig({
                    ...config,
                    bestSellersSection: { ...config.bestSellersSection, subtitle: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Display Limit</label>
                <input
                  type="number"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={config.bestSellersSection?.limit || 10}
                  onChange={(e) => setConfig({
                    ...config,
                    bestSellersSection: { ...config.bestSellersSection, limit: parseInt(e.target.value) || 10 }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. ATHLETE TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Customer & Athlete Reviews Showcase</h2>
          </div>
          <div style={{ padding: '24px' }}>
            {(config.testimonialsSection?.testimonials || []).map((t, idx) => (
              <div key={t.id || idx} style={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: '10px', padding: '16px', marginBottom: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label className="admin-form-label">Athlete Name</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '10px' }}
                      value={t.name}
                      onChange={(e) => {
                        const items = [...config.testimonialsSection.testimonials];
                        items[idx].name = e.target.value;
                        setConfig({ ...config, testimonialsSection: { ...config.testimonialsSection, testimonials: items } });
                      }}
                    />
                  </div>
                  <div>
                    <label className="admin-form-label">Athlete Title / Sport</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '10px' }}
                      value={t.title}
                      onChange={(e) => {
                        const items = [...config.testimonialsSection.testimonials];
                        items[idx].title = e.target.value;
                        setConfig({ ...config, testimonialsSection: { ...config.testimonialsSection, testimonials: items } });
                      }}
                    />
                  </div>
                  <div>
                    <label className="admin-form-label">Product Used</label>
                    <input
                      type="text"
                      className="admin-text-input"
                      style={{ paddingLeft: '10px' }}
                      value={t.productUsed}
                      onChange={(e) => {
                        const items = [...config.testimonialsSection.testimonials];
                        items[idx].productUsed = e.target.value;
                        setConfig({ ...config, testimonialsSection: { ...config.testimonialsSection, testimonials: items } });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="admin-form-label">Review Comment</label>
                  <textarea
                    className="admin-textarea"
                    style={{ minHeight: '60px' }}
                    value={t.comment}
                    onChange={(e) => {
                      const items = [...config.testimonialsSection.testimonials];
                      items[idx].comment = e.target.value;
                      setConfig({ ...config, testimonialsSection: { ...config.testimonialsSection, testimonials: items } });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Live Preview Box */}
      {previewOpen && (
        <div className="admin-card" style={{ marginTop: '24px', border: '1px solid #E50914' }}>
          <div className="admin-card-header" style={{ background: '#1c0c0c' }}>
            <h2 className="admin-card-title" style={{ color: '#E50914' }}>Live Storefront Simulation</h2>
            <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Showing updated hero composition</span>
          </div>
          <div style={{
            position: 'relative',
            height: '380px',
            background: `url('${config.hero?.desktopBgUrl}') center center / cover no-repeat`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `rgba(9, 9, 9, ${config.hero?.overlayDarkness || 0.7})`
            }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '20px' }}>
              <div style={{ fontFamily: 'Barlow Condensed', fontSize: '0.8rem', letterSpacing: '4px', color: '#aaa', textTransform: 'uppercase', marginBottom: '8px' }}>
                {config.hero?.kicker}
              </div>
              <h1 style={{ fontFamily: 'Barlow Condensed', fontStyle: 'italic', fontWeight: 900, fontSize: '2.8rem', lineHeight: 1, textTransform: 'uppercase', margin: '0 0 16px' }}>
                <span style={{ color: '#fff' }}>{config.hero?.headlineLine1}</span><br />
                <span style={{ color: '#E50914' }}>{config.hero?.headlineLine2}</span>
              </h1>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #FF1E27 0%, #D8000C 100%)', color: '#fff', padding: '10px 28px', borderRadius: '9999px', fontFamily: 'Barlow Condensed', fontWeight: 800, textTransform: 'uppercase' }}>
                <span>{config.hero?.ctaText}</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

