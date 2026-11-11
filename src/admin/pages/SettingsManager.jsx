import React, { useState, useEffect } from 'react';
import { Settings, Save, Truck, CreditCard, Phone, Globe, Palette, Search } from 'lucide-react';
import { adminApi } from '../../services/adminApi.js';
import { useAdmin } from '../../context/AdminContext.jsx';

export default function SettingsManager() {
  const { showToast } = useAdmin();
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    adminApi.getSettings().then(res => {
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
    });
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    try {
      await adminApi.updateSettings(settings);
      showToast('Website settings saved and updated sitewide!', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to save settings', 'danger');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <div style={{ padding: '60px', textAlign: 'center', color: '#888' }}>Loading Settings...</div>;
  }

  return (
    <div className="admin-page-container">
      <div className="admin-page-header">
        <div className="admin-page-title-box">
          <h1>Website & System Settings</h1>
          <p>Configure shipping rules, payment gateways, contact numbers, taxes & SEO metadata</p>
        </div>
        <button className="admin-primary-btn" onClick={handleSave} disabled={saving}>
          <Save size={16} />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #222', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'contact', label: '1. Store & Contact Info', icon: Phone },
          { id: 'shipping', label: '2. Shipping & Delivery', icon: Truck },
          { id: 'payment', label: '3. Payment Gateways', icon: CreditCard },
          { id: 'socials', label: '4. Social Media & Footer', icon: Globe },
          { id: 'seo', label: '5. Search Engine SEO', icon: Search }
        ].map(t => {
          const Icon = t.icon;
          return (
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
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} color={activeTab === t.id ? '#E50914' : '#666'} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. CONTACT & STORE INFO */}
      {activeTab === 'contact' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Store & Official Contact Information</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Store Brand Name</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Brand Tagline</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.tagline}
                  onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Support Email Address</label>
                <input
                  type="email"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Customer Support Phone Hotline</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">WhatsApp Helpline Number</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Support Desk Hours</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.supportHours}
                  onChange={(e) => setSettings({ ...settings, supportHours: e.target.value })}
                />
              </div>

              <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
                <label className="admin-form-label">Warehouse & Dispatch Hub Address</label>
                <textarea
                  className="admin-textarea"
                  style={{ minHeight: '60px' }}
                  value={settings.warehouseAddress}
                  onChange={(e) => setSettings({ ...settings, warehouseAddress: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SHIPPING & DELIVERY */}
      {activeTab === 'shipping' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Shipping & Express Delivery Rules</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Free Shipping Threshold (₹)</label>
                <input
                  type="number"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.shipping?.freeShippingThreshold || 1999}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, freeShippingThreshold: Number(e.target.value) }
                  })}
                />
                <small style={{ color: '#777' }}>Orders with subtotal at or above this get free shipping.</small>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Standard Delivery Charge (₹)</label>
                <input
                  type="number"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.shipping?.standardDeliveryFee || 99}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, standardDeliveryFee: Number(e.target.value) }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Estimated Delivery Days</label>
                <input
                  type="number"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.shipping?.estimatedDeliveryDays || 3}
                  onChange={(e) => setSettings({
                    ...settings,
                    shipping: { ...settings.shipping, estimatedDeliveryDays: Number(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PAYMENT SETTINGS */}
      {activeTab === 'payment' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Payment Gateways & Methods</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#0a0a0a', padding: '16px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>UPI (GPay, PhonePe, Paytm)</strong>
                  <input
                    type="checkbox"
                    checked={settings.payment?.upiEnabled ?? true}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, upiEnabled: e.target.checked }
                    })}
                  />
                </div>
                <small style={{ color: '#777', marginTop: '6px', display: 'block' }}>Instant verified UPI QR payment</small>
              </div>

              <div style={{ background: '#0a0a0a', padding: '16px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>Cash on Delivery (COD)</strong>
                  <input
                    type="checkbox"
                    checked={settings.payment?.codEnabled ?? true}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, codEnabled: e.target.checked }
                    })}
                  />
                </div>
                <small style={{ color: '#777', marginTop: '6px', display: 'block' }}>Pay upon receipt with sealed tub inspection</small>
              </div>

              <div style={{ background: '#0a0a0a', padding: '16px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: '#fff' }}>Debit / Credit Cards & Netbanking</strong>
                  <input
                    type="checkbox"
                    checked={settings.payment?.cardsEnabled ?? true}
                    onChange={(e) => setSettings({
                      ...settings,
                      payment: { ...settings.payment, cardsEnabled: e.target.checked }
                    })}
                  />
                </div>
                <small style={{ color: '#777', marginTop: '6px', display: 'block' }}>Visa, Mastercard, RuPay, Netbanking</small>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Sports Nutrition GST Tax Rate (%)</label>
              <input
                type="number"
                className="admin-text-input"
                style={{ paddingLeft: '14px', maxWidth: '140px' }}
                value={settings.taxGstRate || 18}
                onChange={(e) => setSettings({ ...settings, taxGstRate: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. SOCIAL MEDIA & FOOTER */}
      {activeTab === 'socials' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Social Media Links & Footer</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label className="admin-form-label">Instagram Profile URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.socials?.instagram || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, instagram: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">YouTube Channel URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.socials?.youtube || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, youtube: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Facebook Page URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.socials?.facebook || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, facebook: e.target.value }
                  })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Twitter / X URL</label>
                <input
                  type="text"
                  className="admin-text-input"
                  style={{ paddingLeft: '14px' }}
                  value={settings.socials?.twitter || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    socials: { ...settings.socials, twitter: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. SEO MANAGER */}
      {activeTab === 'seo' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Homepage SEO & Metadata</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Meta Title</label>
              <input
                type="text"
                className="admin-text-input"
                style={{ paddingLeft: '14px' }}
                value={settings.seo?.metaTitle || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaTitle: e.target.value }
                })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Meta Description</label>
              <textarea
                className="admin-textarea"
                style={{ minHeight: '80px' }}
                value={settings.seo?.metaDescription || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, metaDescription: e.target.value }
                })}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Social Share (Open Graph) Image URL</label>
              <input
                type="text"
                className="admin-text-input"
                style={{ paddingLeft: '14px' }}
                value={settings.seo?.ogImage || ''}
                onChange={(e) => setSettings({
                  ...settings,
                  seo: { ...settings.seo, ogImage: e.target.value }
                })}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
