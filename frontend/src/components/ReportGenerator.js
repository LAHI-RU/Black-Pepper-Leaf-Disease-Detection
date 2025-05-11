// frontend/src/components/ReportGenerator.js
import React from "react";
import jsPDF from 'jspdf';

const ReportGenerator = ({ result, imagePreview, onExportSuccess, onExportError }) => {
  const generatePDF = () => {
    try {
      const pdf = new jsPDF();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      let currentY = 20;

      // Add header
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Black Pepper Leaf Disease Detection Report", pageWidth / 2, currentY, { align: "center" });
      currentY += 15;

      // Add date and time
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      
      pdf.text(`Report Generated: ${dateStr} at ${timeStr}`, 20, currentY);
      currentY += 10;

      // Add a horizontal line
      pdf.setLineWidth(0.5);
      pdf.line(20, currentY, pageWidth - 20, currentY);
      currentY += 10;

      // Add uploaded image if available
      if (imagePreview) {
        pdf.setFontSize(14);
        pdf.setFont("helvetica", "bold");
        pdf.text("Analyzed Leaf Image:", 20, currentY);
        currentY += 10;

        // Create an image object to get dimensions
        const img = new Image();
        img.src = imagePreview;
        
        // Add image to PDF (resize to fit)
        const maxWidth = 120;
        const maxHeight = 80;
        let imgWidth = maxWidth;
        let imgHeight = maxHeight;
        
        // Resize image if needed
        if (img.width && img.height) {
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
          imgWidth = img.width * ratio;
          imgHeight = img.height * ratio;
        }
        
        // Add image (center it)
        const imgX = (pageWidth - imgWidth) / 2;
        pdf.addImage(imagePreview, 'JPEG', imgX, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 15;
      }

      // Analysis Results Section
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text("Analysis Results", 20, currentY);
      currentY += 10;

      // Disease Diagnosis
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text("Disease Diagnosis:", 20, currentY);
      
      pdf.setFont("helvetica", "bold");
      let diagnosisColor;
      if (result.prediction === "Healthy") {
        diagnosisColor = [46, 125, 50]; // Green
      } else if (result.prediction === "Other Disease") {
        diagnosisColor = [198, 68, 0]; // Orange
      } else {
        diagnosisColor = [245, 124, 0]; // Orange for disease
      }
      
      pdf.setTextColor(...diagnosisColor);
      pdf.text(result.prediction, 60, currentY);
      pdf.setTextColor(0, 0, 0); // Reset to black
      currentY += 10;

      // Confidence Score
      pdf.setFont("helvetica", "normal");
      pdf.text("Confidence Score:", 20, currentY);
      pdf.setFont("helvetica", "bold");
      pdf.text(`${(result.confidence * 100).toFixed(1)}%`, 60, currentY);
      currentY += 10;

      // Confidence Level
      let confidenceLevel;
      if (result.confidence >= 0.85) {
        confidenceLevel = "High Confidence";
      } else if (result.confidence >= 0.65) {
        confidenceLevel = "Medium Confidence";
      } else {
        confidenceLevel = "Low Confidence";
      }
      
      pdf.setFont("helvetica", "normal");
      pdf.text("Confidence Level:", 20, currentY);
      pdf.setFont("helvetica", "bold");
      pdf.text(confidenceLevel, 60, currentY);
      currentY += 15;

      // Detection Probabilities
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Detection Probabilities:", 20, currentY);
      currentY += 8;

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      
      Object.entries(result.all_probabilities).forEach(([disease, probability]) => {
        pdf.text(`${disease}:`, 25, currentY);
        
        // Add probability bar
        const barWidth = 60;
        const barHeight = 5;
        const barX = 70;
        const barY = currentY - 4;
        
        // Background bar
        pdf.setFillColor(230, 230, 230);
        pdf.rect(barX, barY, barWidth, barHeight, 'F');
        
        // Probability bar
        const fillWidth = barWidth * probability;
        if (disease === result.prediction) {
          pdf.setFillColor(76, 175, 80); // Green for selected
        } else {
          pdf.setFillColor(66, 165, 245); // Blue for others
        }
        pdf.rect(barX, barY, fillWidth, barHeight, 'F');
        
        // Percentage text
        pdf.text(`${(probability * 100).toFixed(1)}%`, barX + barWidth + 5, currentY);
        currentY += 8;
      });
      currentY += 5;

      // Treatment Recommendations
      pdf.setFontSize(14);
      pdf.setFont("helvetica", "bold");
      pdf.text("Treatment Recommendations:", 20, currentY);
      currentY += 8;

      pdf.setFontSize(11);
      pdf.setFont("helvetica", "normal");
      
      // Split treatment text to fit within page width
      const treatmentLines = pdf.splitTextToSize(result.treatment, pageWidth - 40);
      treatmentLines.forEach(line => {
        if (currentY > pageHeight - 30) {
          pdf.addPage();
          currentY = 20;
        }
        pdf.text(line, 20, currentY);
        currentY += 6;
      });
      currentY += 5;

      // Add footer
      currentY = pageHeight - 20;
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "italic");
      pdf.setTextColor(128, 128, 128);
      pdf.text("Generated by Black Pepper Leaf Disease Detection System", pageWidth / 2, currentY, { align: "center" });
      pdf.text("© " + new Date().getFullYear() + " Black Pepper Health", pageWidth / 2, currentY + 5, { align: "center" });

      // Save the PDF
      const fileName = `black_pepper_leaf_analysis_${now.toISOString().slice(0,10)}_${now.getHours()}${now.getMinutes()}.pdf`;
      pdf.save(fileName);
      
      if (onExportSuccess) {
        onExportSuccess();
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      if (onExportError) {
        onExportError(error);
      }
    }
  };

  return (
    <button 
      className="export-report-button" 
      onClick={generatePDF}
      title="Export analysis results as PDF report"
    >
      <span className="export-icon">📄</span>
      Export Report
    </button>
  );
};

export default ReportGenerator;