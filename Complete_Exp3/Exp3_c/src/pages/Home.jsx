import React from 'react';
import '../styles/Pages.css';

const Home = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Welcome to Our Website</h1>
        <p className="page-description">
          This is a multi-page Single Page Application (SPA) built with React and React Router.
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Fast Navigation</h3>
            <p>Navigate between pages instantly without full page reloads</p>
          </div>
          <div className="feature-card">
            <h3>Modern Design</h3>
            <p>Clean and responsive user interface</p>
          </div>
          <div className="feature-card">
            <h3>React Router</h3>
            <p>Powered by client-side routing for seamless experience</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
