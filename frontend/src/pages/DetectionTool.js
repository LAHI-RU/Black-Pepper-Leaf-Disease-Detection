// frontend/src/pages/DetectionTool.js
import React, { useState, useRef, useCallback } from "react";
import axios from "axios";
import "../styles/DetectionTool.css";
import ConfidenceGauge from "../components/ConfidenceGauge";
import ReportGenerator from "../components/ReportGenerator";
import { FaSearch, FaCropAlt, FaLeaf, FaExclamationTriangle } from "react-icons/fa";
import "../styles/ReportGenerator.css";

function DetectionTool() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showHowTo, setShowHowTo] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    processFile(selectedFile);
  };

  // Process the selected file
  const processFile = (selectedFile) => {
    if (!selectedFile) return;
    
    // Check if file is an image
    if (!selectedFile.type.match('image.*')) {
      setError("Please select an image file (jpg, png, etc)");
      return;
    }
    
    setFile(selectedFile);
    setError("");
    setResult(null);
    setShowDetails(false);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  // Handle drag events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  // Trigger file input click
  const onButtonClick = () => {
    fileInputRef.current.click();
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
    setShowDetails(false);

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult({
          prediction: response.data.prediction,
          treatment: response.data.treatment,
          confidence: response.data.confidence,
          confidence_info: response.data.confidence_info,
          all_probabilities: response.data.all_probabilities,
          threshold: response.data.threshold
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
          <div 
            className={`upload-area ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              type="file" 
              accept="image/*"
              id="leaf-image" 
              onChange={handleFileChange}
              className="file-input"
              ref={fileInputRef}
            />
            
            {!preview ? (
              <div className="placeholder-container">
                <div className="upload-placeholder">
                  <div className="upload-icon">📷</div>
                  <p>Drag and drop a leaf image here or click to browse</p>
                  <div className="button-container">
                    <button 
                      className="file-label"
                      onClick={onButtonClick}
                    >
                      Select Leaf Image
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="preview-container">
                  <img 
                    src={preview} 
                    alt="Leaf preview" 
                    className="preview-image"
                  />
                </div>
                <button 
                  className="file-label"
                  onClick={onButtonClick}
                >
                  Change Image
                </button>
              </>
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
            <div className={`result-container ${result.prediction === "Healthy" ? "healthy" : 
                            result.prediction === "Other Disease" ? "other" : "disease"}`}>
              <h2 className="result-heading">Analysis Results</h2>
              <div className="diagnosis-container">
                <strong>Diagnosis:</strong> 
                <span className={`diagnosis-text ${result.prediction === "Healthy" ? "healthy-text" : 
                                result.prediction === "Other Disease" ? "other-text" : "disease-text"}`}>
                  {result.prediction}
                </span>
              </div>
              
              {/* Add confidence gauge component */}
              <ConfidenceGauge confidence={result.confidence} threshold={result.threshold} />
              
              <button onClick={toggleDetails} className="details-toggle">
                {showDetails ? "Hide Detailed Analysis" : "Show Detailed Analysis"}
              </button>
              
              {showDetails && (
                <div className="probability-details">
                  <h4>Detection Probabilities:</h4>
                  <div className="probability-bars">
                    {Object.entries(result.all_probabilities).map(([disease, probability]) => (
                      <div key={disease} className="probability-bar-container">
                        <div className="probability-label">{disease}:</div>
                        <div className="probability-bar-wrapper">
                          <div 
                            className={`probability-bar ${disease === result.prediction ? "selected" : ""}`}
                            style={{ width: `${probability * 100}%` }}
                          ></div>
                          <span className="probability-value">{(probability * 100).toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="threshold-info">
                    <small>Confidence threshold: {(result.threshold * 100).toFixed(0)}%. 
                    Results below this threshold are classified as "Other Disease".</small>
                  </div>
                </div>
              )}
              
              <div className="treatment-container">
                <strong>Recommended Treatment:</strong>
                <p className="treatment-text">{result.treatment}</p>
              </div>
              
              {/* Export Report Button */}
              <ReportGenerator 
                result={result}
                imagePreview={preview}
                onExportSuccess={() => {
                  // Optional: Show success message
                  console.log("Report exported successfully!");
                }}
                onExportError={(error) => {
                  // Optional: Show error message
                  console.error("Export failed:", error);
                }}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="detection-tips">
        <h3>Tips for Accurate Detection</h3>
        <div className="tips-grid">
          <div className="tips-card">
            <div className="tips-icon">
              <FaSearch />
            </div>
            <h4>Use Clear Images</h4>
            <p>Ensure your image is well-lit and in focus for the most accurate results.</p>
          </div>
          <div className="tips-card">
            <div className="tips-icon">
              <FaCropAlt />
            </div>
            <h4>Full Leaf View</h4>
            <p>Include the entire leaf in the frame to capture all possible symptoms.</p>
          </div>
          <div className="tips-card">
            <div className="tips-icon">
              <FaLeaf />
            </div>
            <h4>Fresh Samples</h4>
            <p>Use freshly picked leaves when possible for the best diagnosis.</p>
          </div>
          <div className="tips-card">
            <div className="tips-icon">
              <FaExclamationTriangle />
            </div>
            <h4>Uncertain Results</h4>
            <p>If confidence is low, try taking another photo or consult with an expert.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetectionTool;