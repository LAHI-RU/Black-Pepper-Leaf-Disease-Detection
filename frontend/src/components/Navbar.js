// frontend/src/components/Navbar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "./images/logo.png";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">Black Pepper Leaf Disease Detection</span>
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <div className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/detect" 
              className={`nav-link ${location.pathname === '/detect' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Detection Tool
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/disease-info" 
              className={`nav-link ${location.pathname === '/disease-info' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Disease Info
            </Link>
          </div>
          <div className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </div>
        </div>
        
        <div className="navbar-theme-toggle">
          <ThemeToggle />
        </div>
        
        <div className="menu-icon" onClick={handleClick}>
          <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
          <div className={`menu-bar ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;