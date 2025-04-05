// frontend/src/pages/DiseaseInfo.js
import React, { useState } from "react";
import "../styles/DiseaseInfo.css";

const DiseaseInfo = () => {
  const [activeTab, setActiveTab] = useState("blight");

  const diseases = {
    blight: {
      name: "Leaf Blight",
      scientificName: "Phytophthora capsici",
      symptoms: [
        "Dark brown to black lesions on leaves",
        "Yellow margins surrounding the lesions",
        "Rapid wilting and leaf drop",
        "Can spread to stems and berries in severe cases"
      ],
      causes: [
        "Fungal pathogen spread by water splash",
        "High humidity and poor air circulation",
        "Prolonged leaf wetness",
        "Poor drainage in cultivation areas"
      ],
      treatments: [
        "Apply organic fungicides like neem oil or copper-based products",
        "Improve air circulation by proper spacing between plants",
        "Reduce overhead irrigation and water at soil level",
        "Remove and destroy infected plant parts promptly",
        "Maintain clean cultivation area by removing fallen leaves"
      ],
      prevention: [
        "Plant resistant varieties when available",
        "Ensure proper drainage in growing areas",
        "Apply balanced fertilization to strengthen plant defenses",
        "Use raised beds in areas with heavy rainfall",
        "Implement crop rotation practices"
      ],
      image: "/images/diseases/leaf-blight-detail.jpg"
    },
    yellowMottle: {
      name: "Yellow Mottle Virus",
      scientificName: "Black pepper yellow mottle virus (BPYMV)",
      symptoms: [
        "Yellow mottling patterns on leaves",
        "Leaf curling and distortion",
        "Stunted growth of new shoots",
        "Reduced yield and smaller berries",
        "Progressive decline in plant vigor"
      ],
      causes: [
        "Viral infection primarily spread by aphids",
        "Can also spread through contaminated tools",
        "Infected planting material",
        "Whiteflies as secondary vectors"
      ],
      treatments: [
        "No direct cure for viral infections",
        "Remove and destroy severely infected plants",
        "Control insect vectors using organic insecticides",
        "Apply neem oil or insecticidal soaps",
        "Boost plant immunity with biostimulants"
      ],
      prevention: [
        "Use certified disease-free planting material",
        "Implement regular checks for early detection",
        "Control potential insect vectors",
        "Disinfect tools between plants",
        "Create physical barriers like reflective mulches to deter aphids"
      ],
      image: "/images/diseases/yellow-mottle-detail.jpg"
    },
    healthy: {
      name: "Healthy Leaf Characteristics",
      scientificName: "Piper nigrum (Black Pepper)",
      symptoms: [
        "Deep green coloration throughout the leaf",
        "Smooth, glossy leaf surface",
        "No spots, lesions or discoloration",
        "Natural leaf shape without deformities",
        "Consistent color from leaf base to tip"
      ],
      maintenance: [
        "Regular but moderate watering",
        "Balanced NPK fertilization",
        "Adequate spacing for air circulation",
        "Partial shade in very hot climates",
        "Regular pruning to maintain plant structure"
      ],
      optimalConditions: [
        "Temperature: 23-32°C (73-90°F)",
        "Humidity: 60-95%",
        "Rainfall: 1500-3000mm annually",
        "Soil pH: 5.5-6.5 (slightly acidic)",
        "Well-draining organic-rich soil"
      ],
      image: "/images/diseases/healthy-leaf-detail.jpg"
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const activeDisease = diseases[activeTab];

  return (
    <div className="disease-info-page">
      <div className="disease-info-header">
        <h1>Black Pepper Leaf Disease Information</h1>
        <p>Learn about common diseases affecting black pepper plants and how to identify and treat them</p>
      </div>

      <div className="disease-tabs">
        <button 
          className={`tab-button ${activeTab === "blight" ? "active" : ""}`}
          onClick={() => handleTabChange("blight")}
        >
          Leaf Blight
        </button>
        <button 
          className={`tab-button ${activeTab === "yellowMottle" ? "active" : ""}`}
          onClick={() => handleTabChange("yellowMottle")}
        >
          Yellow Mottle Virus
        </button>
        <button 
          className={`tab-button ${activeTab === "healthy" ? "active" : ""}`}
          onClick={() => handleTabChange("healthy")}
        >
          Healthy Leaf
        </button>
      </div>

      <div className="disease-content">
        <div className="disease-header">
          <div className="disease-text">
            <h2>{activeDisease.name}</h2>
            <p className="scientific-name">{activeDisease.scientificName}</p>
          </div>
        </div>

        <div className="disease-details">
          <div className="disease-image">
            <img src={activeDisease.image} alt={activeDisease.name} />
          </div>

          <div className="disease-info-cards">
            {activeTab !== "healthy" ? (
              <>
                <div className="info-card symptoms">
                  <h3>Symptoms</h3>
                  <ul>
                    {activeDisease.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card causes">
                  <h3>Causes</h3>
                  <ul>
                    {activeDisease.causes.map((cause, index) => (
                      <li key={index}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card treatments">
                  <h3>Treatments</h3>
                  <ul>
                    {activeDisease.treatments.map((treatment, index) => (
                      <li key={index}>{treatment}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card prevention">
                  <h3>Prevention</h3>
                  <ul>
                    {activeDisease.prevention.map((prevention, index) => (
                      <li key={index}>{prevention}</li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="info-card characteristics">
                  <h3>Characteristics</h3>
                  <ul>
                    {activeDisease.symptoms.map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card maintenance">
                  <h3>Maintenance</h3>
                  <ul>
                    {activeDisease.maintenance.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card optimal">
                  <h3>Optimal Conditions</h3>
                  <ul>
                    {activeDisease.optimalConditions.map((condition, index) => (
                      <li key={index}>{condition}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseInfo;