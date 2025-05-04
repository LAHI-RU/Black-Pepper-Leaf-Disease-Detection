# Black Pepper Leaf Disease Detection

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.68+-blue.svg)
![React](https://img.shields.io/badge/react-18.0+-61DAFB.svg)

A web-based application that leverages deep learning to detect and classify diseases in black pepper leaves while providing eco-friendly treatment recommendations. This project combines state-of-the-art machine learning with a user-friendly interface to help farmers and agriculturists maintain healthy black pepper crops.

## 🌟 Features

- **Accurate Disease Detection**: Utilizes ResNet18 architecture for reliable disease classification
- **Real-time Analysis**: Instant processing and results for uploaded leaf images
- **Eco-friendly Treatments**: Provides organic and sustainable treatment recommendations
- **User-friendly Interface**: Clean, responsive web interface for easy access
- **Confidence Scoring**: Transparent prediction confidence levels
- **Multiple Disease Classification**:
  - Healthy Leaves
  - Leaf Blight
  - Yellow Mottle Virus

## 🛠️ Technology Stack

### Backend
- Python 3.8+
- FastAPI
- PyTorch
- Pillow (PIL)
- Torchvision

### Frontend
- React 18+
- React Router
- Modern JavaScript (ES6+)
- CSS3

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 14.0 or higher
- npm or yarn
- Git

## 🚀 Installation

### Clone the Repository
```bash
git clone https://github.com/LAHI-RU/Black-Pepper-Leaf-Disease-Detection.git
cd Black-Pepper-Leaf-Disease-Detection
```

### Backend Setup
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Download model (if not included in repository)
mkdir -p models
# Place the black_pepper_model.pth in the models directory
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

## 🎯 Running the Application

### Start Backend Server
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend Development Server
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## 📖 Usage

1. Access the web interface at http://localhost:3000
2. Navigate to the Detection Tool
3. Upload an image of a black pepper leaf
4. Receive instant analysis including:
   - Disease classification
   - Confidence score
   - Eco-friendly treatment recommendations

## 🔍 API Endpoints

### POST `/predict/`
Upload an image for disease detection.

**Response Format:**
```json
{
    "prediction": "Disease Name",
    "confidence": 0.95,
    "confidence_info": "Confidence: 0.95",
    "treatment": "Recommended treatment description",
    "all_probabilities": {
        "Healthy": 0.05,
        "Leaf Blight": 0.95,
        "Yellow Mottle Virus": 0.00
    },
    "threshold": 0.65
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **LAHI-RU** - *Initial work* - [GitHub Profile](https://github.com/LAHI-RU)

## 🙏 Acknowledgments

- ResNet18 architecture for the base model
- FastAPI for the efficient backend framework
- React community for the frontend tools and libraries

---

Last updated: 2025-05-04

Made with ❤️ for sustainable agriculture
