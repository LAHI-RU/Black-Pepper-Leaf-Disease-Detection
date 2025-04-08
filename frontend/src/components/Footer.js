// frontend/src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Black Pepper Health</h3>
          <p>Helping farmers identify and treat black pepper leaf diseases using AI technology.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/detect">Disease Detector</Link></li>
            <li><Link to="/disease-info">Disease Info</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: info@blackpepperhealth.org</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Black Pepper Leaf Disease Detection Project. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;