import '../styles/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3>SPA with React Router</h3>
          <p>A demonstration of client-side routing in Single Page Applications</p>
        </div>
        
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} SPA Router. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
