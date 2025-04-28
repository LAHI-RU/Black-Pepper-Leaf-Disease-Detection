// frontend/src/components/ConfidenceGauge.js
import React from "react";
import "../styles/ConfidenceGauge.css";

const ConfidenceGauge = ({ confidence, threshold }) => {
  // Convert confidence to percentage
  const confidencePercent = Math.round(confidence * 100);
  
  // Determine segment based on confidence level
  let segment;
  if (confidence < threshold) {
    segment = "low";
  } else if (confidence >= threshold && confidence < 0.85) {
    segment = "medium";
  } else {
    segment = "high";
  }

  // Calculate the rotation angle for the needle (0 to 180 degrees)
  const needleRotation = confidence * 180;
  
  // Get display text based on confidence level
  const getConfidenceText = () => {
    if (segment === "low") return "Low Confidence";
    if (segment === "medium") return "Medium Confidence";
    return "High Confidence";
  };

  return (
    <div className="confidence-gauge-container">
      <div className="confidence-label">
        <span>Detection Confidence</span>
        <span className="confidence-percentage">{confidencePercent}%</span>
      </div>
      
      <div className="gauge">
        <div className="gauge-body">
          <div className="gauge-fill" style={{ transform: `rotate(${needleRotation}deg)` }}></div>
          <div className="gauge-cover"></div>
        </div>
        
        <div className="gauge-segments">
          <div className="segment low"></div>
          <div className="segment medium"></div>
          <div className="segment high"></div>
        </div>
        
        <div className="threshold-marker" style={{ left: `${threshold * 100}%` }}></div>
      </div>
      
      <div className="confidence-text">
        <span className={`confidence-level ${segment}`}>{getConfidenceText()}</span>
        {segment === "low" && (
          <span className="confidence-note">
            Consider taking another photo or consulting an expert
          </span>
        )}
      </div>
    </div>
  );
};

export default ConfidenceGauge;