import React, { useState } from 'react';
import '../styles/Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is a demo - no actual submission)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Contact Us</h1>
        <p className="page-description">
          Get in touch with us. We'd love to hear from you!
        </p>
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-item">
              <h3>📧 Email</h3>
              <p>contact@example.com</p>
            </div>
            <div className="info-item">
              <h3>📞 Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <h3>📍 Address</h3>
              <p>123 Web Street<br />React City, RC 12345</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
