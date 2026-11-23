import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BedDouble, CalendarDays, Users, ConciergeBell,
  ClipboardList, Wrench, UtensilsCrossed, Package, UserCog,
  Receipt, PiggyBank, BarChart3, Bell, Settings, ChevronLeft,
  ChevronRight, DoorOpen, LogIn, LogOut as LogOutIcon, Home
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Sidebar.css';

const menuItems = [
  { label: 'MAIN', items: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ]},
  { label: 'FRONT OFFICE', items: [
    { name: 'Front Desk', path: '/front-desk', icon: ConciergeBell },
    { name: 'Bookings', path: '/bookings', icon: CalendarDays },
    { name: 'Calendar', path: '/bookings/calendar', icon: CalendarDays },
  ]},
  { label: 'MANAGEMENT', items: [
    { name: 'Rooms', path: '/rooms', icon: BedDouble },
    { name: 'Room Types', path: '/rooms/types', icon: DoorOpen },
    { name: 'Guests', path: '/guests', icon: Users },
  ]},
  { label: 'OPERATIONS', items: [
    { name: 'Housekeeping', path: '/housekeeping', icon: Home },
    { name: 'Maintenance', path: '/maintenance', icon: Wrench },
    { name: 'Restaurant', path: '/restaurant', icon: UtensilsCrossed },
    { name: 'Inventory', path: '/inventory', icon: Package },
  ]},
  { label: 'FINANCE', items: [
    { name: 'Billing', path: '/billing', icon: Receipt },
    { name: 'Expenses', path: '/expenses', icon: PiggyBank },
  ]},
  { label: 'HR & REPORTS', items: [
    { name: 'Staff', path: '/staff', icon: UserCog },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
  ]},
  { label: 'SYSTEM', items: [
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]},
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`sidebar-overlay ${mobileOpen ? 'visible' : ''}`} onClick={onMobileClose} />
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">L</div>
          <span className="logo-text">LuxeStay</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((section) => (
            <div key={section.label}>
              <div className="menu-label">{section.label}</div>
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={onMobileClose}
                >
                  <item.icon />
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
