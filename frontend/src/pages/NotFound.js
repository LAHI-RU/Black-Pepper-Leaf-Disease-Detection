// frontend/src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn primary-btn">Return to Home</Link>
      </div>
      <div className="not-found-image">
        <img src="/images/404-plant.png" alt="Plant with question mark" />
      </div>
    </div>
  );
};

export default NotFound;