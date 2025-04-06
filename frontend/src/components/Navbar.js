// frontend/src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import "../styles/Navbar.css";
import logo from "./images/logo.png";

const Navbar = () => {
  const { darkMode } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img 
            src={logo} 
            alt="Black Pepper Leaf" 
            className="logo-image"
          />
          <span className="logo-text">Black Pepper Leaf Disease Detection</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-bar ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-bar ${isMenuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/detect" 
              className={`nav-link ${location.pathname === "/detect" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Disease Detector
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/disease-info" 
              className={`nav-link ${location.pathname === "/disease-info" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Disease Info
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
        </ul>

        <div className="navbar-theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;