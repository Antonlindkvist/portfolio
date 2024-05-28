from flask import Flask, request, jsonify
from flask_cors import CORS
import torch


app = Flask(__name__)
CORS(app)
@app.route('/upload', methods=['POST'])

def upload():
    if request.method == "POST" and "img_file" in request.files:
        print("Hello")
        return jsonify({"message": "File received!"}), 200
    else:
        return jsonify({"message": "Error"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
