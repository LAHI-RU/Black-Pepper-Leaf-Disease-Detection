// frontend/src/pages/About.js
import React from "react";
import "../styles/About.css";
import sustainable_farming from "../components/images/sustainable_farming.png";

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
          <img src="/images/ai-tech.jpg" alt="AI technology" />
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

      <section className="team-section">
        <h2>Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="/images/team/member1.jpg" alt="Team member" />
            <h3>Dr. Maya Patel</h3>
            <p>Agricultural Scientist</p>
          </div>
          <div className="team-member">
            <img src="/images/team/member2.jpg" alt="Team member" />
            <h3>Alex Chen</h3>
            <p>Machine Learning Engineer</p>
          </div>
          <div className="team-member">
            <img src="/images/team/member3.jpg" alt="Team member" />
            <h3>Sara Nguyen</h3>
            <p>Web Developer</p>
          </div>
          <div className="team-member">
            <img src="/images/team/member4.jpg" alt="Team member" />
            <h3>Michael Okonjo</h3>
            <p>Agronomist</p>
          </div>
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