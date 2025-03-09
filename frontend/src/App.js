import React, { useState } from "react";
import axios from "axios";
import "./App.css";

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
        <h1>Black Pepper Leaf Disease Detector</h1>
        <p>Upload a photo of a black pepper leaf to detect disease and get treatment suggestions</p>
      </header>
      
      <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ 
          border: "2px dashed #ccc", 
          padding: "20px", 
          borderRadius: "8px",
          marginBottom: "20px"
        }}>
          <input 
            type="file" 
            accept="image/*"
            id="leaf-image" 
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label 
            htmlFor="leaf-image"
            style={{
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              borderRadius: "4px",
              cursor: "pointer",
              display: "inline-block",
              marginBottom: "10px"
            }}
          >
            Select Image
          </label>
          
          {preview && (
            <div style={{ marginTop: "15px" }}>
              <img 
                src={preview} 
                alt="Leaf preview" 
                style={{ 
                  maxWidth: "100%", 
                  maxHeight: "300px",
                  border: "1px solid #ddd",
                  borderRadius: "4px"
                }} 
              />
            </div>
          )}
          
          <button 
            onClick={handleSubmit}
            disabled={!file || loading}
            style={{
              padding: "10px 15px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: file && !loading ? "pointer" : "not-allowed",
              marginTop: "15px",
              opacity: file && !loading ? 1 : 0.7
            }}
          >
            {loading ? "Processing..." : "Analyze Leaf"}
          </button>
          
          {error && (
            <div style={{ 
              color: "red", 
              margin: "15px 0", 
              padding: "10px", 
              backgroundColor: "#ffebee",
              borderRadius: "4px" 
            }}>
              {error}
            </div>
          )}
        </div>
        
        {result && (
          <div style={{ 
            border: "1px solid #ddd", 
            borderRadius: "8px", 
            padding: "20px",
            backgroundColor: result.prediction === "Healthy" ? "#e8f5e9" : "#fff3e0"
          }}>
            <h2 style={{ marginTop: 0 }}>Analysis Results</h2>
            <div style={{ marginBottom: "15px" }}>
              <strong>Diagnosis:</strong> 
              <span style={{ 
                fontWeight: "bold", 
                color: result.prediction === "Healthy" ? "green" : "#f57c00"
              }}>
                {result.prediction}
              </span>
            </div>
            <div>
              <strong>Recommended Treatment:</strong>
              <p>{result.treatment}</p>
            </div>
          </div>
        )}
      </main>
      
      <footer style={{ 
        marginTop: "40px", 
        padding: "20px", 
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #ddd",
        textAlign: "center"
      }}>
        <p>Black Pepper Leaf Disease Detection Project</p>
      </footer>
    </div>
  );
}

export default App;