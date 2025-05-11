// frontend/src/pages/About.js
import React from "react";
import "../styles/About.css";
import sustainable_farming from "../components/images/sustainable_farming.png";
import ai_tech from "../components/images/ai_tech.png";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About Black Pepper Health</h1>
        <p>AI-powered disease detection for sustainable farming</p>
      </div>

      <section className="about-section">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            Empowering farmers with AI technology to detect plant diseases early. 
            We help reduce crop losses and minimize chemical usage through smart, 
            eco-friendly solutions.
          </p>
        </div>
        <div className="about-image">
          <img src={sustainable_farming} alt="Sustainable farming" />
        </div>
      </section>

      <section className="about-section reverse">
        <div className="about-image">
          <img src={ai_tech} alt="AI technology" />
        </div>
        <div className="about-content">
          <h2>Our Technology</h2>
          <p>
            Advanced ResNet neural network trained on thousands of leaf images. 
            Instant disease diagnosis with high accuracy, accessible from any device.
          </p>
        </div>
      </section>

      <section className="vision-section">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            Building a future where AI and sustainable farming unite. 
            Making disease detection accessible globally to enhance food security 
            and strengthen farming communities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;