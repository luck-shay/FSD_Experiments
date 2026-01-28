import React from 'react';
import '../styles/Pages.css';

const About = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>About Us</h1>
        <p className="page-description">
          Learn more about our mission and values.
        </p>
        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              We strive to create exceptional web applications that provide
              seamless user experiences through modern technologies and best practices.
            </p>
          </section>
          <section className="about-section">
            <h2>Our Team</h2>
            <p>
              Our team consists of dedicated developers passionate about building
              innovative solutions using React and other cutting-edge technologies.
            </p>
          </section>
          <section className="about-section">
            <h2>Our Values</h2>
            <ul>
              <li>Quality and Excellence</li>
              <li>Innovation and Creativity</li>
              <li>User-Centered Design</li>
              <li>Continuous Learning</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
