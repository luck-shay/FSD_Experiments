import '../styles/Pages.css';

function About() {
  return (
    <div className="page-container">
      <div className="content-section">
        <h1>About This Project</h1>
        
        <div className="info-card">
          <h2>What is Client-Side Routing?</h2>
          <p>
            Client-side routing is a technique that allows navigation between different views in a Single Page Application (SPA) 
            without requiring a full page reload from the server. This approach provides a smoother, faster user experience.
          </p>
        </div>
        
        <div className="info-card">
          <h2>Why React Router?</h2>
          <p>
            React Router is the most popular routing library for React applications. It provides:
          </p>
          <ul>
            <li>Dynamic route matching</li>
            <li>Lazy code loading</li>
            <li>Location transition handling</li>
            <li>Dynamic route segments</li>
            <li>Standardized structure and behavior</li>
          </ul>
        </div>
        
        <div className="info-card">
          <h2>Key Features of This App</h2>
          <ul>
            <li>BrowserRouter for client-side routing</li>
            <li>Routes and Route components for defining paths</li>
            <li>Navigation Links for smooth transitions</li>
            <li>Dynamic page content based on URL</li>
            <li>Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
