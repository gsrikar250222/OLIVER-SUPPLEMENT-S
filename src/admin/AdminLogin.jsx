import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext.jsx';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdmin();

  const [email, setEmail] = useState('admin@olivershop.com');
  const [password, setPassword] = useState('OliverAdmin#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password, rememberMe);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid administrator credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <img src="/icons/logo.svg" alt="OLIVER SUPPLEMENT SHOP" className="admin-login-logo" />
          <h1 className="admin-login-title">MASTER CONTROL CENTER</h1>
          <p className="admin-login-subtitle">Secure Staff & Administrator Portal</p>
        </div>

        {error && (
          <div className="admin-login-alert error">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-form-label">Admin Email</label>
            <div className="admin-input-wrap">
              <Mail size={18} className="admin-input-icon" />
              <input
                type="email"
                required
                className="admin-text-input"
                placeholder="admin@olivershop.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-form-label">Password</label>
            <div className="admin-input-wrap">
              <Lock size={18} className="admin-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="admin-text-input"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#888' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember 8-hour session</span>
            </label>
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            <span>{loading ? 'Authenticating...' : 'Sign In To Control Center'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="admin-demo-creds">
          <div><strong>Initial Super Admin Credentials:</strong></div>
          <div>Email: <code>admin@olivershop.com</code></div>
          <div>Password: <code>OliverAdmin#2026!</code></div>
          <div style={{ marginTop: '6px', fontSize: '0.72rem', color: '#666' }}>
            Protected with PBKDF2 100k salted hashing & rate-limiting. Password can be updated in Settings.
          </div>
        </div>
      </div>
    </div>
  );
}
