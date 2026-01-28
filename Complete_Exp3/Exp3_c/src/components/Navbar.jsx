import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          MyApp
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className={`nav-link ${isActive('/about')}`}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className={`nav-link ${isActive('/services')}`}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
