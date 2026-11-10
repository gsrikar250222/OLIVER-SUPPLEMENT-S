import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Lock, Mail, ArrowRight, User, ShieldCheck } from 'lucide-react';

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
      setError('Please enter your email and password.');
      return;
    }
    const res = await login(email, password);
    if (res.success) {
      navigate('/account');
    } else {
      setError(res.message);
    }
  };

  const handleDemoLogin = async () => {
    await login('athlete@oliversupplements.com', 'oliver2026');
    navigate('/account');
  };

  return (
    <div className="auth-page container section-pad">
      <div className="auth-card">
        <div className="auth-header text-center">
          <Link to="/">
            <img src="/icons/logo.svg" alt="OLIVER Supplement Shop" height="42" className="auth-logo" />
          </Link>
          <h1 className="auth-title">ATHLETE PORTAL LOGIN</h1>
          <p className="auth-subtitle">
            Sign in to track live supplement dispatches, review batch certifications, and redeem loyalty rewards.
          </p>
        </div>

        {error && <div className="checkout-alert-error mb-20">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label>Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="field-icon" />
              <input 
                type="email" 
                placeholder="athlete@oliversupplements.com" 
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
                placeholder="••••••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : 'SIGN IN TO OLIVER'} <ArrowRight size={16} />
          </button>

          <button 
            type="button" 
            className="btn-secondary auth-demo-btn mt-12"
            onClick={handleDemoLogin}
          >
            Instant Demo Athlete Sign-In
          </button>
        </form>

        <div className="auth-footer text-center mt-24">
          <p>New to Oliver Sports Nutrition? <Link to="/register">Create an Athlete Account &rarr;</Link></p>
        </div>
      </div>
    </div>
  );
}
