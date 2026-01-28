import '../styles/Pages.css';

function Home() {
  return (
    <div className="page-container">
      <div className="hero-section">
        <h1>Welcome to Our SPA</h1>
        <p className="subtitle">A beautifully designed Single Page Application with React Router</p>
        
        <div className="features">
          <div className="feature-card">
            <h3>🚀 Fast Navigation</h3>
            <p>Experience lightning-fast page transitions without full page reloads</p>
          </div>
          
          <div className="feature-card">
            <h3>⚛️ React Powered</h3>
            <p>Built with React, the most popular JavaScript library for UI</p>
          </div>
          
          <div className="feature-card">
            <h3>🎨 Modern Design</h3>
            <p>Clean, responsive, and professionally styled interface</p>
          </div>
          
          <div className="feature-card">
            <h3>🔗 Client-Side Routing</h3>
            <p>Seamless routing using React Router for smooth user experience</p>
          </div>
        </div>
        
        <div className="cta-section">
          <p>Explore the different pages using the navigation menu above to see client-side routing in action!</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
