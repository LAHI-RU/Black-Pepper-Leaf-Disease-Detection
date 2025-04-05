import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="app-title">Black Pepper Leaf Disease Detector</h1>
        <p className="app-subtitle">Upload a photo of a black pepper leaf to detect disease and get treatment suggestions</p>
        <ThemeToggle />
      </header>
      
      <main className="main-container">
        <div className="upload-container">
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
            Select Image
          </label>
          
          {preview && (
            <div className="preview-container">
              <img 
                src={preview} 
                alt="Leaf preview" 
                className="preview-image"
              />
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
      </main>
      
      <footer className="app-footer">
        <p>Black Pepper Leaf Disease Detection Project</p>
      </footer>
    </div>
  );
}

export default App;