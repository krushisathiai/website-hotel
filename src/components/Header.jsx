import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, Menu, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

export default function Header({ onMobileMenuToggle }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMobileMenuToggle} aria-label="Toggle menu">
          <Menu size={22} />
        </button>
        <div className="header-search">
          <Search />
          <input type="text" placeholder="Search guests, bookings, rooms..." />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      <div className="header-right">
        <Link to="/notifications" className="header-icon-btn" aria-label="Notifications">
          <Bell />
          <span className="notif-badge" />
        </Link>

        <div className="user-menu" ref={dropdownRef} onClick={() => setShowDropdown(!showDropdown)}>
          <div className="user-avatar">{initials}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role?.replace('_', ' ').toLowerCase()}</span>
          </div>
          <ChevronDown size={16} style={{ color: 'var(--color-text-muted)' }} />

          {showDropdown && (
            <div className="user-dropdown">
              <Link to="/settings/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                <User size={16} /> Profile
              </Link>
              <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                <Settings size={16} /> Settings
              </Link>
              <div className="dropdown-divider" />
              <button className="dropdown-item danger" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
