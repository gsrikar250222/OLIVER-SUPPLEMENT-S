import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    const res = await register(name, email, password);
    if (res.success) {
      navigate('/shop');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-page container section-pad">
      <div className="auth-card">
        <div className="auth-header text-center">
          <Link to="/">
            <img src="/icons/logo.svg" alt="REPVAULT" width="180" className="auth-logo" />
          </Link>
          <h1 className="auth-title">CREATE VAULT ACCOUNT</h1>
          <p className="auth-subtitle">Join the athletic couture division and enjoy member-only benefits.</p>
        </div>

        {error && <div className="checkout-alert-error mb-20">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input 
                type="text" 
                placeholder="Rahul Sharma" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

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
            <label>Create Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                type="password" 
                placeholder="At least 6 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary full-width" disabled={loading}>
            {loading ? 'CREATING ACCOUNT...' : 'JOIN THE VAULT'} <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer text-center mt-24">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

