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
    time.sleep(4)
    if request.method == "POST" and "img_file" in request.files:
        img = request.files["img_file"]
        img_bytes = img.read()
        image = Image.open(io.BytesIO(img_bytes))

        if image.mode != 'RGB':
            image = image.convert('RGB')

        mode = request.form.get('mode')
        if mode == 'false':
            print("inte pretrained")
            pass #jump to trained

        else:
            transformed_image = transform(image).unsqueeze(0)
            class_name = predict(transformed_image)
            result = reformat_(class_name)
            return jsonify({"message": result}), 200
        
    
    return jsonify({"message": "Error"}), 400


def reformat_(class_name):
    cleaned_string = class_name.replace(',', '')
    words = cleaned_string.split()
    return words[-1]
    


def predict(img_to_predict):
    with torch.no_grad():
        output = model(img_to_predict)
        _, predicted = torch.max(output, 1)  
        predicted_class_index = predicted.item()
        class_name = idx2label.get(str(predicted_class_index), "Unknown")
        return class_name


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
