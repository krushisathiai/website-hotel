import React from 'react';
import { Link } from 'react-router-dom';
import { BedDouble, CalendarDays, Users, ConciergeBell, Wrench, Receipt, UserCog, BarChart3, Package, UtensilsCrossed, Bell, ShieldCheck } from 'lucide-react';
import './Landing.css';

const features = [
  { name: 'Room Management', desc: 'Track all rooms, types, status, and amenities in real-time.', icon: BedDouble },
  { name: 'Reservations', desc: 'Smart booking system with conflict detection and calendar view.', icon: CalendarDays },
  { name: 'Guest Management', desc: 'Complete guest profiles, history, and preferences.', icon: Users },
  { name: 'Front Desk', desc: 'Streamlined check-in, check-out, and guest services.', icon: ConciergeBell },
  { name: 'Housekeeping', desc: 'Task assignment, tracking, and room status management.', icon: Wrench },
  { name: 'Billing & Payments', desc: 'Invoicing, multiple payment methods, and financial tracking.', icon: Receipt },
  { name: 'Staff Management', desc: 'Manage departments, roles, and team performance.', icon: UserCog },
  { name: 'Reports & Analytics', desc: 'Revenue, occupancy, and operational insights with charts.', icon: BarChart3 },
  { name: 'Inventory', desc: 'Track supplies, stock levels, and purchase orders.', icon: Package },
  { name: 'Restaurant/POS', desc: 'Menu management, orders, and room charge integration.', icon: UtensilsCrossed },
  { name: 'Notifications', desc: 'Real-time alerts for bookings, payments, and tasks.', icon: Bell },
  { name: 'Multi-Role Access', desc: 'Role-based permissions for your entire team.', icon: ShieldCheck },
];

const steps = [
  { num: 1, title: 'Create Hotel', desc: 'Register and set up your hotel profile.' },
  { num: 2, title: 'Configure Rooms', desc: 'Add room types, amenities, and pricing.' },
  { num: 3, title: 'Accept Bookings', desc: 'Manage reservations from multiple channels.' },
  { num: 4, title: 'Manage Operations', desc: 'Run housekeeping, maintenance, and more.' },
  { num: 5, title: 'Track Revenue', desc: 'Invoice guests and monitor financial health.' },
  { num: 6, title: 'Grow Smarter', desc: 'Use analytics to optimize performance.' },
];

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="nav-logo"><div className="logo-icon">L</div> LuxeStay</div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Run Your Hotel Smarter. Serve Your Guests Better.</h1>
          <p>The all-in-one platform to manage rooms, bookings, guests, staff, payments, housekeeping, and reports — from one centralized dashboard.</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started Free</Link>
            <Link to="/login" className="btn btn-secondary btn-lg">Login to Dashboard</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-section" id="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything You Need to Run Your Hotel</h2>
            <p>From front desk to back office, LuxeStay gives you the tools to manage every aspect of your hotel operations.</p>
          </div>
          <div className="features-grid" onMouseMove={(e) => {
            for(const card of document.getElementsByClassName("feature-card")) {
              const rect = card.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top;
              card.style.setProperty("--mouse-x", `${x}px`);
              card.style.setProperty("--mouse-y", `${y}px`);
            }
          }}>
            {features.map(f => (
              <div key={f.name} className="feature-card">
                <div className="icon"><f.icon size={24}/></div>
                <h3>{f.name}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="landing-section" style={{background:'var(--color-bg-secondary)'}}>
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get your hotel management system running in minutes.</p>
          </div>
          <div className="steps-grid">
            {steps.map(s => (
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
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that fits your hotel.</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Starter</h3>
              <p style={{color:'var(--color-text-muted)',fontSize:'var(--font-size-sm)'}}>For small hotels & guesthouses</p>
              <div className="pricing-price">₹2,999<span>/month</span></div>
              <ul className="pricing-features">
                <li>Up to 20 rooms</li><li>Booking management</li><li>Guest management</li><li>Basic reports</li><li>Email support</li>
              </ul>
              <Link to="/register" className="btn btn-secondary">Get Started</Link>
            </div>
            <div className="pricing-card featured">
              <h3>Professional</h3>
              <p style={{color:'var(--color-text-muted)',fontSize:'var(--font-size-sm)'}}>For growing hotels</p>
              <div className="pricing-price">₹7,999<span>/month</span></div>
              <ul className="pricing-features">
                <li>Up to 100 rooms</li><li>All Starter features</li><li>Housekeeping & Maintenance</li><li>Restaurant POS</li><li>Inventory management</li><li>Advanced analytics</li><li>Priority support</li>
              </ul>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <p style={{color:'var(--color-text-muted)',fontSize:'var(--font-size-sm)'}}>For hotel chains & resorts</p>
              <div className="pricing-price">Custom</div>
              <ul className="pricing-features">
                <li>Unlimited rooms</li><li>All Professional features</li><li>Multi-property management</li><li>Custom integrations</li><li>Dedicated account manager</li><li>SLA guarantee</li>
              </ul>
              <Link to="/register" className="btn btn-secondary">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="landing-section" id="faq" style={{background:'var(--color-bg-secondary)'}}>
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{maxWidth:700,margin:'0 auto'}}>
            {[
              { q: 'How quickly can I set up LuxeStay?', a: 'You can have your hotel system running in under 10 minutes. Just register, add your rooms, and start accepting bookings.' },
              { q: 'Do I need technical knowledge?', a: 'Not at all. LuxeStay is designed for hotel staff, not engineers. The interface is intuitive and easy to learn.' },
              { q: 'Can multiple staff members use it?', a: 'Yes! LuxeStay supports multiple user roles including Admin, Manager, Receptionist, Housekeeping, and Accountant.' },
              { q: 'Is my data secure?', a: 'Absolutely. We use industry-standard encryption, secure authentication, and regular backups to protect your data.' },
            ].map((faq, i) => (
              <div key={i} className="card" style={{marginBottom:'var(--space-3)'}}>
                <h3 style={{fontSize:'var(--font-size-md)',marginBottom:'var(--space-2)'}}>{faq.q}</h3>
                <p style={{color:'var(--color-text-muted)',fontSize:'var(--font-size-sm)'}}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h3>🏨 LuxeStay</h3>
              <p>The modern hotel management system that helps you run smarter operations and deliver exceptional guest experiences.</p>
            </div>
            <div className="footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#">Changelog</a><a href="#">API Docs</a>
            </div>
            <div className="footer-col">
              <h4>Company</h4>
              <a href="#">About</a><a href="#">Contact</a><a href="#">Careers</a><a href="#">Blog</a>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Cookie Policy</a>
            </div>
          </div>
          <div className="footer-bottom">© {new Date().getFullYear()} LuxeStay Hotel Management. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
