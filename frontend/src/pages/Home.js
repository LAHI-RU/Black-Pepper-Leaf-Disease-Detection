// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Protect Your Black Pepper Plants</h1>
          <p>
            Use our AI-powered tool to detect diseases in black pepper leaves and
            get eco-friendly treatment recommendations.
          </p>
          <div className="hero-buttons">
            <Link to="/detect" className="btn primary-btn">
              Detect Disease
            </Link>
            <Link to="/disease-info" className="btn secondary-btn">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-image.jpg" alt="Healthy black pepper plant" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>How It Works</h2>
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">📷</div>
            <h3>Upload Photo</h3>
            <p>Take a clear photo of your black pepper leaf and upload it to our platform.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>AI Analysis</h3>
            <p>Our AI model analyzes the image to detect signs of common diseases.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Get Results</h3>
            <p>Receive an instant diagnosis with eco-friendly treatment recommendations.</p>
          </div>
        </div>
      </section>

      {/* Disease Preview Section */}
      <section className="disease-preview-section">
        <h2>Common Black Pepper Leaf Diseases</h2>
        <div className="disease-cards">
          <div className="disease-card">
            <img src="/images/leaf-blight.jpg" alt="Leaf Blight" />
            <h3>Leaf Blight</h3>
            <p>Characterized by dark lesions with yellow margins that can lead to leaf drop.</p>
            <Link to="/disease-info" className="learn-more-link">Learn More</Link>
          </div>
          <div className="disease-card">
            <img src="/images/yellow-mottle.jpg" alt="Yellow Mottle Virus" />
            <h3>Yellow Mottle Virus</h3>
            <p>Causes yellowing and mottling patterns on leaves, stunting plant growth.</p>
            <Link to="/disease-info" className="learn-more-link">Learn More</Link>
          </div>
          <div className="disease-card">
            <img src="/images/healthy-leaf.jpg" alt="Healthy Leaf" />
            <h3>Healthy Leaf</h3>
            <p>Deep green color with no signs of discoloration, spots, or deformities.</p>
            <Link to="/disease-info" className="learn-more-link">Learn More</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Protect Your Crops?</h2>
          <p>Use our AI-powered disease detection tool today and keep your black pepper plants healthy.</p>
          <Link to="/detect" className="btn primary-btn">
            Start Detection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;