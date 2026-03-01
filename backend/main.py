from collections import defaultdict, deque
import io
import os
import time

from fastapi import FastAPI, File, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import torch
import torch.nn.functional as F
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image

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

# Define confidence threshold
CONFIDENCE_THRESHOLD = 0.65  # Adjust this value based on your model's performance

# Basic in-memory rate limiting (per-client IP)
RATE_LIMIT_REQUESTS = 60
RATE_LIMIT_WINDOW_SECONDS = 60
request_times = defaultdict(deque)

# Load the trained model if it exists, otherwise handle gracefully
try:
    model = models.resnet18()
    model.fc = torch.nn.Linear(model.fc.in_features, 3)  # 3 categories
    model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device("cpu")))
    model.eval()
    model_loaded = True
except Exception as e:
    print(f"Warning: Model could not be loaded from {MODEL_PATH}: {e}")
    model_loaded = False

# Define class names
class_names = ["Healthy", "Leaf Blight", "Yellow Mottle Virus"]

# Define eco-friendly treatments
treatments = {
    "Leaf Blight": "Use organic fungicides like neem oil and increase air circulation around plants. Apply compost tea as a natural fungicide and ensure proper spacing between plants.",
    "Yellow Mottle Virus": "Remove infected leaves, improve soil quality with organic matter, and introduce resistant plant varieties. Consider using beneficial insects to control virus vectors.",
    "Healthy": "Your plant is healthy! Maintain proper watering and nutrition. Apply organic compost every 2-3 months to maintain soil health.",
    "Other Disease": "Unable to confidently identify the specific disease. Consider: 1) Isolate affected plants, 2) Improve air circulation, 3) Apply neem oil as a preventative treatment, and 4) Consult an agricultural expert for further analysis."
}

# Define transformation (must match evaluation-time preprocessing used in training)
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()
    bucket = request_times[client_ip]

    while bucket and now - bucket[0] > RATE_LIMIT_WINDOW_SECONDS:
        bucket.popleft()

    if len(bucket) >= RATE_LIMIT_REQUESTS:
        return JSONResponse(
            status_code=429,
            content={
                "error": "Rate limit exceeded. Please retry later.",
                "limit": RATE_LIMIT_REQUESTS,
                "window_seconds": RATE_LIMIT_WINDOW_SECONDS,
            },
        )

    bucket.append(now)
    return await call_next(request)


@app.get("/health/")
async def health():
    return {
        "status": "ok",
        "model_loaded": model_loaded,
    }


@app.get("/info/")
async def info():
    return {
        "model": "ResNet18",
        "classes": class_names,
        "confidence_threshold": CONFIDENCE_THRESHOLD,
        "preprocessing": {
            "resize": 256,
            "center_crop": 224,
            "normalize_mean": [0.485, 0.456, 0.406],
            "normalize_std": [0.229, 0.224, 0.225],
        },
    }


@app.get("/treatments/")
async def get_treatments():
    return {"treatments": treatments}


@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    if not model_loaded:
        return {"error": "Model not loaded. Please ensure the model file exists."}
    
    # Read image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    
    # Convert to RGB to ensure 3 channels (fixes issues with RGBA images)
    image = image.convert('RGB')

    # Preprocess the image
    image = transform(image).unsqueeze(0)

    # Predict
    with torch.no_grad():
        output = model(image)
        probabilities = F.softmax(output, dim=1)[0]
        confidence, predicted = torch.max(probabilities, 0)
        
        confidence_score = confidence.item()
        prediction_index = predicted.item()
        
        # Check if confidence is below threshold
        if confidence_score < CONFIDENCE_THRESHOLD:
            predicted_label = "Other Disease"
            confidence_info = f"Low confidence: {confidence_score:.2f}"
        else:
            predicted_label = class_names[prediction_index]
            confidence_info = f"Confidence: {confidence_score:.2f}"
        
        # Get all class probabilities for display
        all_probabilities = {class_names[i]: probabilities[i].item() for i in range(len(class_names))}

    # Get treatment recommendation
    treatment = treatments.get(predicted_label)

    return {
        "prediction": predicted_label, 
        "treatment": treatment,
        "confidence": confidence_score,
        "confidence_info": confidence_info,
        "all_probabilities": all_probabilities,
        "threshold": CONFIDENCE_THRESHOLD
    }

# Run server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
