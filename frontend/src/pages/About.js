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
        <p>Using technology to support sustainable black pepper farming</p>
      </div>

      <section className="about-section">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
            PepperHealth aims to empower black pepper farmers with accessible technology 
            to identify plant diseases early and apply eco-friendly treatments. By combining 
            artificial intelligence with agricultural expertise, we help farmers reduce crop 
            losses and minimize chemical usage.
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
            We've developed a deep learning model trained on thousands of images of 
            black pepper leaves. Our ResNet-based neural network can identify common 
            diseases with high accuracy, providing farmers with instant diagnosis 
            and treatment recommendations directly from their smartphones or computers.
          </p>
        </div>
      </section>

      

      <section className="vision-section">
        <div className="vision-content">
          <h2>Our Vision</h2>
          <p>
            We envision a future where technology and sustainable farming practices 
            work hand in hand. By making disease detection accessible to farmers 
            worldwide, we hope to contribute to food security, sustainable agriculture, 
            and the economic wellbeing of farming communities.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;