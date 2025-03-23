import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="theme-toggle-container">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode}
          onChange={toggleTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;