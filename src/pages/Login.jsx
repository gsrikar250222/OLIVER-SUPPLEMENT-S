import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Lock, Mail, ArrowRight, User } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    const res = await login(email, password);
    if (res.success) {
      navigate('/shop');
    } else {
      setError(res.message);
    }
  };

  const handleDemoLogin = async () => {
    await login('athlete@repvault.com', 'vault2026');
    navigate('/shop');
  };

  return (
    <div className="auth-page container section-pad">
      <div className="auth-card">
        <div className="auth-header text-center">
          <Link to="/">
            <img src="/icons/logo.svg" alt="REPVAULT" width="180" className="auth-logo" />
          </Link>
          <h1 className="auth-title">ACCESS YOUR VAULT</h1>
          <p className="auth-subtitle">Sign in to track orders, manage saved styles, and access private drops.</p>
        </div>

        {error && <div className="checkout-alert-error mb-20">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input 
                type="email" 
                placeholder="athlete@repvault.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary full-width" disabled={loading}>
            {loading ? 'SIGNING IN...' : 'SIGN IN TO VAULT'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-divider">
          <span>OR</span>
        </div>

        <button onClick={handleDemoLogin} className="btn btn-outline full-width demo-btn">
          Quick Demo Athlete Sign-In
        </button>

        <div className="auth-footer text-center mt-24">
          <p>
            Don't have an account yet?{' '}
            <Link to="/register" className="auth-switch-link">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

