from flask import Flask, render_template, request
import joblib  # Use joblib to load the model
import numpy as np

app = Flask(__name__)

# Load the trained model using joblib
model = joblib.load('model.pkl')  # Update this line to use joblib

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from form
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

if __name__ == "__main__":
    app.run(debug=True)


