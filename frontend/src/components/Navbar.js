// frontend/src/components/Navbar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import ThemeToggle from "./ThemeToggle";
import logo from "./images/logo.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="Logo" className="logo-image" />
          <span className="logo-text">Black Pepper Leaf Disease Detection</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-bar ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-bar ${menuOpen ? "open" : ""}`}></div>
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/detect"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              Disease Detection
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/disease-info"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              Disease Info
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/about"
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              onClick={closeMenu}
            >
              About Us
            </NavLink>
          </li>
          <li className="nav-item navbar-theme-toggle-mobile">
            <ThemeToggle />
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