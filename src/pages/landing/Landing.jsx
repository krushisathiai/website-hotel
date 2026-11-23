import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BedDouble,
  CalendarDays,
  Users,
  ConciergeBell,
  Wrench,
  Receipt,
  UserCog,
  BarChart3,
  Package,
  UtensilsCrossed,
  Bell,
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Building2,
  Clock,
  KeyRound,
  Laptop
} from 'lucide-react';
import './Landing.css';

const features = [
  { name: 'Room Management', desc: 'Track all rooms, categories, statuses (Clean, Dirty, Occupied, Maintenance) in real-time.', icon: BedDouble },
  { name: 'Smart Reservations', desc: 'Manage reservations with instant availability check, double-booking prevention, and calendar view.', icon: CalendarDays },
  { name: 'Guest CRM', desc: 'Store guest profiles, identification, stay histories, preferences, and contact records.', icon: Users },
  { name: 'Front Desk Operations', desc: 'One-click check-in, check-out, room allocation, and instant key issuance.', icon: ConciergeBell },
  { name: 'Housekeeping Desk', desc: 'Real-time task dispatching, cleaning logs, and instant room readiness notifications.', icon: Wrench },
  { name: 'Invoicing & Payments', desc: 'Automated GST-ready invoices, multi-currency support, payment tracking, and receipt generation.', icon: Receipt },
  { name: 'Staff Management', desc: 'Manage employees, assign role permissions, track schedules, and department performance.', icon: UserCog },
  { name: 'Financial Reports', desc: 'Comprehensive dashboards for RevPAR, ADR, occupancy rates, and profit/loss insights.', icon: BarChart3 },
  { name: 'Inventory & Stock', desc: 'Monitor toiletries, linens, amenities, minibar stock, and auto re-order thresholds.', icon: Package },
  { name: 'Restaurant / Room Service', desc: 'Integrate in-room dining, POS orders, and automatic bill routing directly to guest invoices.', icon: UtensilsCrossed },
  { name: 'Real-Time Alerts', desc: 'Instant system notifications for VIP arrivals, overdue check-outs, and pending maintenance.', icon: Bell },
  { name: 'Multi-Role Security', desc: 'Granular role-based access control (Admin, Manager, Reception, Housekeeping, Accounts).', icon: ShieldCheck },
];

const steps = [
  { num: '01', title: 'Register Hotel Profile', desc: 'Set up your hotel name, policies, tax rates, and currency in under 2 minutes.' },
  { num: '02', title: 'Configure Rooms & Rates', desc: 'Create room types, bed configurations, seasonal prices, and amenities.' },
  { num: '03', title: 'Accept & Manage Bookings', desc: 'Capture reservations across walk-ins, phone bookings, and online channels.' },
  { num: '04', title: 'Coordinate Staff Operations', desc: 'Dispatch tasks to housekeeping and maintenance with live status tracking.' },
  { num: '05', title: 'Bill & Collect Payments', desc: 'Generate itemized digital invoices with GST and accept digital payments.' },
  { num: '06', title: 'Scale with Analytics', desc: 'Review occupancy analytics and revenue metrics to maximize profitability.' },
];

const faqs = [
  {
    q: 'How quickly can I set up LuxeStay for my hotel?',
    a: 'You can have your hotel management system live in under 5 minutes. Simply register, define your room categories, and begin taking reservations right away.'
  },
  {
    q: 'Can my staff use it on smartphones or tablets?',
    a: 'Yes! LuxeStay is built with a 100% mobile-responsive design. Housekeeping and front desk staff can manage tasks directly from their mobile phones, tablets, or laptops.'
  },
  {
    q: 'Does it support role-based permissions?',
    a: 'Yes, LuxeStay includes 5 specialized pre-built roles: Hotel Admin, Manager, Receptionist, Housekeeping, and Accountant. Each role only has access to the modules they need.'
  },
  {
    q: 'Is my hotel data safe in the cloud?',
    a: 'We use enterprise-grade PostgreSQL with SSL encryption, JWT authentication, and automatic cloud backups to guarantee 99.9% uptime and data privacy.'
  },
  {
    q: 'Can I test the system before committing?',
    a: 'Yes! We have pre-seeded demo accounts for all roles (Admin, Manager, Reception, Housekeeping, Accountant) that you can test immediately with 1-click on the login page.'
  }
];

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <div className="logo-icon">L</div>
            <span className="logo-text">LuxeStay</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links desktop-only">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          {/* Right Action Buttons */}
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost nav-login-btn">
              <KeyRound size={16} />
              <span>Login</span>
            </Link>
            <Link to="/register" className="btn btn-primary nav-cta-btn desktop-only">
              <span>Get Started</span>
              <ArrowRight size={15} />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-dropdown-menu">
            <div className="mobile-nav-links">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            </div>
            <div className="mobile-nav-buttons">
              <Link to="/login" className="btn btn-secondary w-full" onClick={() => setMobileMenuOpen(false)}>
                <KeyRound size={16} />
                <span>Sign In (Demo Login)</span>
              </Link>
              <Link to="/register" className="btn btn-primary w-full" onClick={() => setMobileMenuOpen(false)}>
                <span>Register New Hotel</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-badge">
            <Sparkles size={15} className="badge-sparkle" />
            <span>Modern Hotel Management Platform v2.0</span>
          </div>

          <h1 className="hero-headline">
            Run Your Hotel Smarter.<br />
            <span className="gradient-text">Delight Your Guests Every Stay.</span>
          </h1>

          <p className="hero-subtext">
            The all-in-one cloud platform to manage rooms, reservations, front desk check-ins,
            housekeeping, automated GST billing, staff, and financial analytics.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary hero-btn-main">
              <KeyRound size={18} />
              <span>Explore Live Demo Login</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/register" className="btn btn-secondary hero-btn-sub">
              <Building2 size={18} />
              <span>Create Hotel Account</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-item">
              <span className="metric-value">99.8%</span>
              <span className="metric-label">Operational Reliability</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-value">5 Roles</span>
              <span className="metric-label">RBAC Security Included</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-value">&lt; 5 mins</span>
              <span className="metric-label">Cloud Deployment Time</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-item">
              <span className="metric-value">100%</span>
              <span className="metric-label">Mobile & Tablet Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Roles Showcase Card */}
      <section className="demo-showcase-section">
        <div className="container">
          <div className="demo-showcase-card">
            <div className="demo-showcase-content">
              <div className="demo-showcase-tag">⚡ Instant Access</div>
              <h2>Ready to see it in action?</h2>
              <p>Experience the platform right now without any setup. Pre-loaded with demo rooms, guests, and reservations.</p>
              <div className="demo-roles-pills">
                <span className="role-pill">👑 Hotel Admin</span>
                <span className="role-pill">💼 Manager</span>
                <span className="role-pill">🛎️ Receptionist</span>
                <span className="role-pill">🧹 Housekeeping</span>
                <span className="role-pill">📊 Accountant</span>
              </div>
            </div>
            <div className="demo-showcase-action">
              <Link to="/login" className="btn btn-primary btn-lg">
                <Laptop size={18} />
                <span>Open Login & 1-Click Auto Fill</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-section" id="features">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">POWERFUL CAPABILITIES</span>
            <h2>Everything You Need to Run Your Property</h2>
            <p>From the front desk to the back office, LuxeStay unifies all hotel workflows into one intuitive dashboard.</p>
          </div>

          <div className="features-grid">
            {features.map((f) => (
              <div key={f.name} className="feature-card">
                <div className="feature-icon-wrapper">
                  <f.icon size={26} />
                </div>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section section-alternate" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">SIMPLE ONBOARDING</span>
            <h2>How It Works in 6 Easy Steps</h2>
            <p>Get your entire property onboarded and operational smoothly.</p>
          </div>

          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.num} className="step-card">
                <div className="step-number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-section" id="pricing">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">TRANSPARENT PRICING</span>
            <h2>Plans Built for Every Hotel Size</h2>
            <p>Predictable monthly subscriptions with zero hidden commission fees.</p>
          </div>

          <div className="pricing-grid">
            {/* Starter Plan */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Starter</h3>
                <p className="pricing-desc">Ideal for boutique hotels, B&Bs & guesthouses.</p>
              </div>
              <div className="pricing-price">
                ₹2,999<span>/month</span>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle2 size={16} /> Up to 20 rooms</li>
                <li><CheckCircle2 size={16} /> Reservation & calendar management</li>
                <li><CheckCircle2 size={16} /> Guest profiles & history</li>
                <li><CheckCircle2 size={16} /> Basic billing & invoices</li>
                <li><CheckCircle2 size={16} /> Standard email support</li>
              </ul>
              <Link to="/register" className="btn btn-secondary w-full">Choose Starter</Link>
            </div>

            {/* Professional Plan (Featured) */}
            <div className="pricing-card featured">
              <div className="featured-badge">MOST POPULAR</div>
              <div className="pricing-header">
                <h3>Professional</h3>
                <p className="pricing-desc">For growing independent hotels and resorts.</p>
              </div>
              <div className="pricing-price">
                ₹7,999<span>/month</span>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle2 size={16} /> Up to 100 rooms</li>
                <li><CheckCircle2 size={16} /> Everything in Starter</li>
                <li><CheckCircle2 size={16} /> Housekeeping & Maintenance desk</li>
                <li><CheckCircle2 size={16} /> Restaurant POS integration</li>
                <li><CheckCircle2 size={16} /> Inventory management & alerts</li>
                <li><CheckCircle2 size={16} /> RevPAR & Occupancy analytics</li>
                <li><CheckCircle2 size={16} /> Priority 24/7 support</li>
              </ul>
              <Link to="/register" className="btn btn-primary w-full">Start 14-Day Free Trial</Link>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Enterprise</h3>
                <p className="pricing-desc">For hotel chains, luxury resorts & franchises.</p>
              </div>
              <div className="pricing-price">
                Custom
              </div>
              <ul className="pricing-features">
                <li><CheckCircle2 size={16} /> Unlimited rooms & properties</li>
                <li><CheckCircle2 size={16} /> Multi-hotel centralized management</li>
                <li><CheckCircle2 size={16} /> Custom integrations & webhooks</li>
                <li><CheckCircle2 size={16} /> Dedicated account manager</li>
                <li><CheckCircle2 size={16} /> Custom staff training & SLA</li>
              </ul>
              <Link to="/register" className="btn btn-secondary w-full">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="landing-section section-alternate" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">GOT QUESTIONS?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about setting up and using LuxeStay.</p>
          </div>

          <div className="faq-container">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`faq-card ${isOpen ? 'active' : ''}`} onClick={() => toggleFaq(i)}>
                  <div className="faq-question">
                    <h3>{faq.q}</h3>
                    <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                  </div>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Transform Your Hotel Operations?</h2>
            <p>Join modern hoteliers who save hours every day with automated check-ins, housekeeping, and billing.</p>
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary btn-lg">
                <KeyRound size={18} />
                <span>Try Demo Account</span>
              </Link>
              <Link to="/register" className="btn btn-ghost btn-lg">
                <span>Register Hotel Profile</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">
                <div className="logo-icon">L</div>
                <span className="logo-text">LuxeStay</span>
              </div>
              <p>
                The next-generation cloud operating system for hotels, resorts, and vacation rentals.
                Built for performance, reliability, and delightful guest experiences.
              </p>
              <div className="system-status">
                <span className="status-dot" />
                <span>All Systems Operational (v2.0)</span>
              </div>
            </div>

            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing Plans</a>
              <Link to="/login">Demo Login</Link>
            </div>

            <div className="footer-col">
              <h4>Modules</h4>
              <Link to="/login">Front Desk</Link>
              <Link to="/login">Housekeeping</Link>
              <Link to="/login">Invoicing & GST</Link>
              <Link to="/login">Inventory & POS</Link>
            </div>

            <div className="footer-col">
              <h4>Security & Cloud</h4>
              <span>PostgreSQL + Neon DB</span>
              <span>JWT Authentication</span>
              <span>RBAC Permissions</span>
              <span>SSL Encryption</span>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} LuxeStay Hotel Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
