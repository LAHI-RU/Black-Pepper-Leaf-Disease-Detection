// frontend/src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section">
          <h3 className="footer-heading">
            <span className="footer-icon">🌿</span>
            Black Pepper Health
          </h3>
          <p className="footer-text">
            Helping farmers identify and treat black pepper
            leaf diseases using AI technology.
          </p>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-section footer-links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <div className="footer-links-vertical">
            <Link to="/">Home</Link>
            <Link to="/detect">Disease Detector</Link>
            <Link to="/disease-info">Disease Info</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-section">
          <h3 className="footer-heading">Contact</h3>
          <ul className="footer-contact">
            <li>
              <span className="footer-icon">✉️</span>
              <a href="mailto:info@blackpepperhealth.org">info@blackpepperhealth.org</a>
            </li>
            <li>
              <span className="footer-icon">📞</span>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </li>
            <li>
              <span className="footer-icon">📍</span>
              <span>Colombo, Sri Lanka</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright-text">
          © {currentYear} Black Pepper Leaf Disease Detection Project. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;