import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell } from 'lucide-react';
import './Navbar.css';

export const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={onMenuClick}>
            <Menu size={24} />
          </button>
        </div>

        <div className="navbar-right">
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-badge">2</span>
          </button>

          <div className="user-section">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <p className="user-name">{user?.name}</p>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
