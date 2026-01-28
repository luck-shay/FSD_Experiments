import React from 'react';
import '../styles/Pages.css';

const Services = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Our Services</h1>
        <p className="page-description">
          Discover what we can do for you.
        </p>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🚀</div>
            <h3>Web Development</h3>
            <p>Custom web applications built with React, Vue, and Angular</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📱</div>
            <h3>Mobile Apps</h3>
            <p>Cross-platform mobile solutions using React Native</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🎨</div>
            <h3>UI/UX Design</h3>
            <p>Beautiful and intuitive user interfaces</p>
          </div>
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3>Performance Optimization</h3>
            <p>Speed up your applications for better user experience</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔧</div>
            <h3>Maintenance & Support</h3>
            <p>Ongoing support and updates for your projects</p>
          </div>
          <div className="service-card">
            <div className="service-icon">☁️</div>
            <h3>Cloud Solutions</h3>
            <p>Deploy and scale your applications in the cloud</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
