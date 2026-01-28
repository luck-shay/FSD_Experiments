import { useState } from 'react';
import '../styles/Pages.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };
  
  return (
    <div className="page-container">
      <div className="contact-section">
        <h1>Contact Us</h1>
        <p className="subtitle">We'd love to hear from you! Get in touch with us.</p>
        
        {submitted && (
          <div className="success-message">
            ✓ Thank you for your message! We'll get back to you soon.
          </div>
        )}
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
              placeholder="Enter your email address"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="6"
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
        
        <div className="contact-info">
          <h3>Other Ways to Reach Us</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Email:</strong>
              <p>info@example.com</p>
            </div>
            <div className="info-item">
              <strong>Phone:</strong>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <strong>Address:</strong>
              <p>123 Tech Street, Silicon Valley, CA 94025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
