import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className="theme-toggle-container">
      <label className="switch" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
        <input 
          type="checkbox" 
          checked={darkMode}
          onChange={toggleTheme}
        />
        <span className="slider">
          <span className="sr-only">{darkMode ? "Dark mode enabled" : "Light mode enabled"}</span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;