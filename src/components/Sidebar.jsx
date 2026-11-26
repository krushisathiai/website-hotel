import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BedDouble, CalendarDays, Users, ConciergeBell,
  ClipboardList, UtensilsCrossed, UserCog, Receipt, PiggyBank, 
  BarChart3, Settings, ChevronLeft, ChevronRight, DoorOpen, 
  ChefHat, PlusCircle
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const getRole = () => {
    if (!user) return 'ADMIN';
    const email = (user.email || '').toLowerCase();
    const role = (user.role || '').toUpperCase();

    if (email.includes('waiter') || role === 'STAFF') return 'WAITER';
    if (email.includes('billing') || role === 'ACCOUNTANT') return 'BILLING';
    if (email.includes('guest') || role === 'RECEPTIONIST') return 'GUEST';
    return 'ADMIN';
  };

  const currentRole = getRole();

  const getRoleBadge = () => {
    switch (currentRole) {
      case 'WAITER':
        return { label: 'Dining & Kitchen', color: '#3b82f6' };
      case 'BILLING':
        return { label: 'Cashier & Billing', color: '#10b981' };
      case 'GUEST':
        return { label: 'Guest Portal', color: '#f59e0b' };
      default:
        return { label: 'Hotel Admin', color: '#f59e0b' };
    }
  };

  const roleBadge = getRoleBadge();

  // Role-based menu configs
  const getMenuItems = () => {
    if (currentRole === 'WAITER') {
      return [
        {
          label: 'KITCHEN & DINING',
          items: [
            { name: 'Live Orders Queue', path: '/waiter-orders', icon: ChefHat },
            { name: 'Take Food Order', path: '/order-food', icon: PlusCircle },
            { name: 'Restaurant Menu', path: '/restaurant', icon: UtensilsCrossed },
          ],
        },
      ];
    }

    if (currentRole === 'BILLING') {
      return [
        {
          label: 'BILLING DESK',
          items: [
            { name: 'Checkout & Invoices', path: '/billing', icon: Receipt },
            { name: 'Hotel Expenses', path: '/expenses', icon: PiggyBank },
            { name: 'Revenue Reports', path: '/reports', icon: BarChart3 },
          ],
        },
      ];
    }

    if (currentRole === 'GUEST') {
      return [
        {
          label: 'GUEST SERVICES',
          items: [
            { name: 'Home Dashboard', path: '/dashboard', icon: LayoutDashboard },
            { name: 'Book Room', path: '/bookings', icon: BedDouble },
            { name: 'Order Food & Dining', path: '/order-food', icon: UtensilsCrossed },
            { name: 'My Food Orders', path: '/my-orders', icon: ClipboardList },
          ],
        },
      ];
    }

    // Default: ADMIN
    return [
      {
        label: 'OVERVIEW',
        items: [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        ],
      },
      {
        label: 'ROOMS & BOOKINGS',
        items: [
          { name: 'Rooms & Floors', path: '/rooms', icon: BedDouble },
          { name: 'Room Types', path: '/room-types', icon: DoorOpen },
          { name: 'All Bookings', path: '/bookings', icon: CalendarDays },
          { name: 'Guest Directory', path: '/guests', icon: Users },
        ],
      },
      {
        label: 'DINING & KITCHEN',
        items: [
          { name: 'Kitchen Live Orders', path: '/waiter-orders', icon: ChefHat },
          { name: 'Food Menu Catalog', path: '/restaurant', icon: UtensilsCrossed },
          { name: 'Take Food Order', path: '/order-food', icon: ConciergeBell },
        ],
      },
      {
        label: 'FINANCE & ADMIN',
        items: [
          { name: 'Billing & Checkouts', path: '/billing', icon: Receipt },
          { name: 'Staff Management', path: '/staff', icon: UserCog },
          { name: 'Reports', path: '/reports', icon: BarChart3 },
          { name: 'Settings', path: '/settings', icon: Settings },
        ],
      },
    ];
  };

  const sections = getMenuItems();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={onMobileClose} />
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">L</div>
          <div>
            <span className="logo-text">LuxeStay</span>
            <div 
              className="text-xs font-bold" 
              style={{ color: roleBadge.color, fontSize: '10px', letterSpacing: '0.05em' }}
            >
              {roleBadge.label}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="menu-label">{section.label}</div>
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={onMobileClose}
                >
                  <item.icon size={20} />
                  <span className="nav-text">{item.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="collapse-btn" onClick={onToggle}>
            {collapsed ? <ChevronRight size={18} /> : <><ChevronLeft size={18} /> <span>Collapse</span></>}
          </button>
        </div>
      </aside>
    </>
  );
}
