from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd

# Load ML model and preprocessor
with open("ml-model/model.pkl", "rb") as file:
    model = pickle.load(file)

with open("ml-model/preprocessor.pkl", "rb") as file:
    preprocessor = pickle.load(file)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

feature_names = ['loan_limit', 'Gender', 'loan_type', 'business_or_commercial', 'loan_amount', 
                 'rate_of_interest', 'Interest_rate_spread', 'income', 'credit_type', 'Credit_Score', 'age']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Get JSON request from React

        # Convert data to list format
        user_input = [data.get(feature, 0) for feature in feature_names]

        # Convert numerical values
        num_indices = [4, 5, 6, 7, 9]  # Indices of numerical fields
        for i in num_indices:
            user_input[i] = float(user_input[i])

        # Convert to DataFrame
        input_df = pd.DataFrame([user_input], columns=feature_names)

        # Transform input data
        transformed_input = preprocessor.transform(input_df)

        # Make prediction
        prediction = model.predict(transformed_input)
        result = "Approve" if prediction[0] == 1 else "Reject"

        return jsonify({"prediction": result})  # Return JSON response

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
