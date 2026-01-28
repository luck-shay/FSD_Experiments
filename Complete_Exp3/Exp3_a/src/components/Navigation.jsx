import { Link, useLocation } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚛️</span>
          SPA Router
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/contact" 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
