import React, { useState, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

export default function Register() {
  const { register, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', hotelName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password, hotelName: form.hotelName });
      toast.success('Account created! Welcome to LuxeStay.');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 500 }}>
        <div className="auth-logo">
          <div className="logo-icon">L</div>
          <span>LuxeStay</span>
        </div>
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Set up your hotel management system</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Hotel Name</label>
            <input type="text" className="form-input" placeholder="Your Hotel Name" value={form.hotelName} onChange={(e) => update('hotelName', e.target.value)} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="John Doe" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="tel" className="form-input" placeholder="+91 9876543210" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-toggle">
                <input type={showPassword ? 'text' : 'password'} className="form-input" placeholder="Min. 6 characters" value={form.password} onChange={(e) => update('password', e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-input" placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} required />
            </div>
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? <Loader2 size={18} className="spinner" /> : null}
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
