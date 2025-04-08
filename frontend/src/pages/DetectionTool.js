// frontend/src/pages/DetectionTool.js
import React, { useState } from "react";
import axios from "axios";
import "../styles/DetectionTool.css";

function DetectionTool() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showHowTo, setShowHowTo] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setError("");
    setResult(null);

    // Create preview
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select an image!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult({
          prediction: response.data.prediction,
          treatment: response.data.treatment
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.detail || 
        "Error processing image. Please ensure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleHowTo = () => {
    setShowHowTo(!showHowTo);
  };

  return (
    <div className="detection-tool-page">
      <div className="detection-header">
        <h1>Black Pepper Leaf Disease Detector</h1>
        <p>Upload a photo of a black pepper leaf to detect disease and get eco-friendly treatment suggestions</p>
      </div>
      
      <div className="detector-container">
        <div className="how-to-section">
          <button className="how-to-button" onClick={toggleHowTo}>
            {showHowTo ? "Hide Instructions" : "How to Use"}
          </button>
          
          {showHowTo && (
            <div className="how-to-content">
              <h3>How to Take the Best Photo</h3>
              <ol>
                <li>Choose a well-lit area, preferably natural daylight</li>
                <li>Place the leaf against a plain background</li>
                <li>Ensure the entire leaf is visible in the frame</li>
                <li>Avoid shadows across the leaf surface</li>
                <li>Take a clear, focused image of the leaf</li>
              </ol>
            </div>
          )}
        </div>
        
        <div className="upload-container">
          <div className="upload-area">
            <input 
              type="file" 
              accept="image/*"
              id="leaf-image" 
              onChange={handleFileChange}
              className="file-input"
            />
            <label 
              htmlFor="leaf-image"
              className="file-label"
            >
              {preview ? "Change Image" : "Select Leaf Image"}
            </label>
            
            {preview ? (
              <div className="preview-container">
                <img 
                  src={preview} 
                  alt="Leaf preview" 
                  className="preview-image"
                />
              </div>
            ) : (
              <div className="placeholder-container">
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <p>Upload a clear image of a black pepper leaf</p>
                </div>
              </div>
            )}
            
            <button 
              onClick={handleSubmit}
              disabled={!file || loading}
              className={`analyze-button ${(!file || loading) ? 'disabled' : ''}`}
            >
              {loading ? "Processing..." : "Analyze Leaf"}
            </button>
            
            {error && (
              <div className="error-container">
                {error}
              </div>
            )}
          </div>
          
          {result && (
            <div className={`result-container ${result.prediction === "Healthy" ? "healthy" : "disease"}`}>
              <h2 className="result-heading">Analysis Results</h2>
              <div className="diagnosis-container">
                <strong>Diagnosis:</strong> 
                <span className={`diagnosis-text ${result.prediction === "Healthy" ? "healthy-text" : "disease-text"}`}>
                  {result.prediction}
                </span>
              </div>
              <div className="treatment-container">
                <strong>Recommended Treatment:</strong>
                <p className="treatment-text">{result.treatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="detection-tips">
        <h3>Tips for Accurate Detection</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">🔍</div>
            <h4>Use Clear Images</h4>
            <p>Ensure your image is well-lit and in focus for the most accurate results.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📏</div>
            <h4>Full Leaf View</h4>
            <p>Include the entire leaf in the frame to capture all possible symptoms.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🌱</div>
            <h4>Fresh Samples</h4>
            <p>Use freshly picked leaves when possible for the best diagnosis.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetectionTool;