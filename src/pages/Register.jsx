import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { Lock, Mail, User, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    const res = await register(formData.name, formData.email, formData.password, formData.phone);
    if (res.success) {
      navigate('/account');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-page container section-pad">
      <div className="auth-card">
        <div className="auth-header text-center">
          <Link to="/">
            <img src="/icons/logo.svg" alt="OLIVER Supplement Shop" height="42" className="auth-logo" />
          </Link>
          <h1 className="auth-title">CREATE ATHLETE ACCOUNT</h1>
          <p className="auth-subtitle">
            Join 50,000+ athletes. Get exclusive 10% discount on your first order and instant tracking notifications.
          </p>
        </div>

        {error && <div className="checkout-alert-error mb-20">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field">
            <label>Full Name</label>
            <div className="input-with-icon">
              <User size={18} className="field-icon" />
              <input 
                type="text" 
                name="name"
                placeholder="e.g. Vikram Sharma" 
                value={formData.name}
                onChange={handleInputChange}
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
                name="email"
                placeholder="vikram@athlete.com" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Mobile Number (For Courier OTP)</label>
            <div className="input-with-icon">
              <Phone size={18} className="field-icon" />
              <input 
                type="tel" 
                name="phone"
                maxLength={10}
                placeholder="9876543210" 
                value={formData.phone}
                onChange={handleInputChange}
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
                name="password"
                placeholder="••••••••••••" 
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="field-icon" />
              <input 
                type="password" 
                name="confirmPassword"
                placeholder="••••••••••••" 
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary auth-submit-btn" disabled={loading}>
            {loading ? 'CREATING ATHLETE PROFILE...' : 'REGISTER ATHLETE PROFILE'} <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-footer text-center mt-24">
          <p>Already an Oliver member? <Link to="/login">Sign In &rarr;</Link></p>
        </div>
      </div>
    </div>
  );
}
