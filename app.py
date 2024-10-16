from flask import Flask, render_template, request
from flask_cors import CORS  # Import Flask-CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Apply CORS to allow all origins

model = joblib.load('model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    print("Request method:", request.method)
    if request.method == 'POST':
        try:
            data = [
                float(request.form['moisture']),
                float(request.form['temperature']),
                float(request.form['ph'])
            ]
            prediction = model.predict([np.array(data)])
            result = f"Predicted compost quality: {prediction[0]:.2f}"
            return render_template('result.html', prediction=result)
        except Exception as e:
            return render_template('result.html', prediction="Error: Invalid Input")
    else:
        return render_template('result.html', prediction="Error: Invalid Request Method")

if __name__ == "__main__":
    app.run(debug=True)
