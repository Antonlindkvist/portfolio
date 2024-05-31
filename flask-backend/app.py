from flask import Flask, request, jsonify
from flask_cors import CORS
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image
import io
import torch
import json
import time


with open('imagenet_class_index.json') as f:
    idx2label = json.load(f)

model = models.resnet50(pretrained=True)
model.eval()

#what types of changes to do to the picture
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))
])


app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload():
    if request.method == "POST" and "img_file" in request.files:
        img = request.files["img_file"]
        img_bytes = img.read()
        image = Image.open(io.BytesIO(img_bytes))
        if image.mode != 'RGB':
            image = image.convert('RGB')
        transformed_image = transform(image).unsqueeze(0)
        result = predict(transformed_image)
        time.sleep(4)
        return jsonify({"message": result}), 200
    else:
        return jsonify({"message": "Error"}), 400


def predict(img_to_predict):
    with torch.no_grad():
        output = model(img_to_predict)
        _, predicted = torch.max(output, 1)  
        predicted_class_index = predicted.item()
        return idx2label.get(str(predicted_class_index), "Unknown")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
