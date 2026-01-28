import { Link } from 'react-router-dom';
import '../styles/Pages.css';

function NotFound() {
  return (
    <div className="page-container">
      <div className="error-section">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p className="error-description">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="error-image">
          <div className="emoji">🔍</div>
        </div>
        
        <Link to="/" className="home-link">
          ← Back to Home
        </Link>
        
        <div className="suggestions">
          <p>Maybe you were looking for one of these:</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
