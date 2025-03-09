from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model path handling
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "black_pepper_model.pth")

# Load the trained model if it exists, otherwise handle gracefully
try:
    model = models.resnet18()
    model.fc = torch.nn.Linear(model.fc.in_features, 3)  # 3 categories
    model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device("cpu")))
    model.eval()
    model_loaded = True
except FileNotFoundError:
    print(f"Warning: Model file not found at {MODEL_PATH}")
    model_loaded = False

# Load the trained model
model = models.resnet18()
model.fc = torch.nn.Linear(model.fc.in_features, 3)  # 3 categories
model.load_state_dict(torch.load("../models/black_pepper_model.pth", map_location=torch.device("cpu")))
model.eval()

# Define class names
class_names = ["Healthy", "Leaf Blight", "Yellow Mottle Virus"]

# Define eco-friendly treatments
treatments = {
    "Leaf Blight": "Use organic fungicides like neem oil and increase air circulation around plants.",
    "Yellow Mottle Virus": "Remove infected leaves, improve soil quality, and introduce resistant plant varieties.",
    "Healthy": "Your plant is healthy! Maintain proper watering and nutrition.",
    "Other Disease": "Consult an agricultural expert for further analysis."
}

# Define transformation
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5])
])

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    if not model_loaded:
        return {"error": "Model not loaded. Please ensure the model file exists."}
    
    # Read image
    image = Image.open(io.BytesIO(await file.read()))

    # Preprocess the image
    image = transform(image).unsqueeze(0)

    # Predict
    with torch.no_grad():
        output = model(image)
        _, predicted = torch.max(output, 1)
        predicted_label = class_names[predicted.item()]

    # Get treatment recommendation
    treatment = treatments.get(predicted_label, "Other Disease")

    return {"prediction": predicted_label, "treatment": treatment}

# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
