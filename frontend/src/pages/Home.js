// frontend/src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import Healthy_black_pepper_plant from "../components/images/Healthy_black_pepper_plant.png"
import healthy_leaf from "../components/images/healthy_leaf.png"
import leaf_blight from "../components/images/leaf_blight.jpg"  
import yellow_mottle from "../components/images/yellow_mottle.jpg"


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
          <img src={Healthy_black_pepper_plant} alt="Healthy black pepper plant" />
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
            <img src={healthy_leaf} alt="Healthy Leaf" />
            <h3>Healthy Leaf</h3>
            <p>Deep green color with no signs of discoloration, spots, or deformities.</p>
            <Link to="/disease-info" className="learn-more-link">Learn More</Link>
          </div>
          <div className="disease-card">
            <img src={leaf_blight} alt="Leaf Blight" />
            <h3>Leaf Blight</h3>
            <p>Characterized by dark lesions with yellow margins that can lead to leaf drop.</p>
            <Link to="/disease-info" className="learn-more-link">Learn More</Link>
          </div>
          <div className="disease-card">
            <img src={yellow_mottle} alt="Yellow Mottle Virus" />
            <h3>Yellow Mottle Virus</h3>
            <p>Causes yellowing and mottling patterns on leaves, stunting plant growth.</p>
            <Link to="/disease-info" className="learn-more-link">Learn More</Link>
          </div>
        </div>
      </section>

      {/* CTA Section - Now with pattern background */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Protect Your Crops?</h2>
          <p>Use our AI-powered disease detection tool today and keep your black pepper plants healthy.</p>
          <Link to="/detect" className="cta-button">
            Start Detection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;