import React, { useState, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft, Mail, Lock, Sparkles, Shield, UserCheck, KeyRound, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const demoRoles = [
  {
    role: 'Admin',
    name: 'Admin User',
    email: 'admin@luxestay.com',
    password: 'admin123',
    badge: 'Full Hotel Access',
    color: '#f59e0b',
    icon: '👑',
  },
  {
    role: 'User (Guest)',
    name: 'Rahul Sharma',
    email: 'guest@luxestay.com',
    password: 'admin123',
    badge: 'Book Room & Food',
    color: '#10b981',
    icon: '👤',
  },
  {
    role: 'Waiter',
    name: 'Ramesh Waiter',
    email: 'waiter@luxestay.com',
    password: 'admin123',
    badge: 'Kitchen Orders Queue',
    color: '#06b6d4',
    icon: '🍽️',
  },
  {
    role: 'Billing',
    name: 'Priya Cashier',
    email: 'billing@luxestay.com',
    password: 'admin123',
    badge: 'Checkout & Invoices',
    color: '#8b5cf6',
    icon: '💳',
  },
];

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState(null);

  if (user) return <Navigate to="/dashboard" />;

  const handleFillCredentials = (demo, autoSubmit = false) => {
    setSelectedDemo(demo.role);
    setForm({ email: demo.email, password: demo.password });
    toast.success(`Filled credentials for ${demo.role}!`, { icon: demo.icon, duration: 2500 });

    if (autoSubmit) {
      triggerLogin(demo.email, demo.password);
    }
  };

  const triggerLogin = async (emailToUse, passToUse) => {
    setLoading(true);
    try {
      await login(emailToUse, passToUse);
      toast.success('Welcome back to LuxeStay!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please enter both email and password');
    await triggerLogin(form.email, form.password);
  };

  return (
    <div className="auth-page">
      <div className="auth-top-nav">
        <Link to="/" className="back-home-link">
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-logo">
            <div className="logo-icon">L</div>
            <div className="logo-text">
              <span className="logo-title">LuxeStay</span>
              <span className="logo-tag">Hotel Cloud OS</span>
            </div>
          </div>

          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to manage rooms, bookings, and operations</p>
          </div>

          {/* Quick Demo Auto-Fill Buttons */}
          <div className="demo-credentials-section">
            <div className="demo-section-header">
              <div className="demo-title">
                <Sparkles size={16} className="sparkle-icon" />
                <span>1-Click Auto Fill Demo Roles</span>
              </div>
              <span className="demo-hint">Click any role to populate credentials</span>
            </div>

            <div className="demo-roles-grid">
              {demoRoles.map((demo) => {
                const isSelected = selectedDemo === demo.role;
                return (
                  <button
                    key={demo.role}
                    type="button"
                    className={`demo-role-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => handleFillCredentials(demo, false)}
                    title={`Click to fill: ${demo.email}`}
                  >
                    <span className="demo-role-icon">{demo.icon}</span>
                    <div className="demo-role-info">
                      <div className="demo-role-top">
                        <span className="demo-role-name">{demo.role}</span>
                        {isSelected && <CheckCircle2 size={13} className="check-icon" />}
                      </div>
                      <span className="demo-role-badge">{demo.badge}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="auth-divider">
            <span>OR ENTER CREDENTIALS</span>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <span>Email Address</span>
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="admin@luxestay.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setSelectedDemo(null);
                  }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label className="form-label">Password</label>
                <span className="default-pass-hint">Demo password: <code>admin123</code></span>
              </div>
              <div className="input-with-icon password-toggle">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setSelectedDemo(null);
                  }}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="remember-me-label">
                <input type="checkbox" defaultChecked />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <KeyRound size={18} />
                  <span>Sign In to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have a hotel registered? <Link to="/register">Create one here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
