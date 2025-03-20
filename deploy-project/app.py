from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Load ML model and preprocessor
with open("ml-model/model.pkl", "rb") as file:
    model = pickle.load(file)
    logger.debug("Model loaded successfully")

with open("ml-model/preprocessor.pkl", "rb") as file:
    preprocessor = pickle.load(file)
    logger.debug("Preprocessor loaded successfully")

# Initialize Flask app
app = Flask(__name__)
CORS(app)

feature_names = ['loan_limit', 'Gender', 'loan_type', 'business_or_commercial', 'loan_amount', 
                 'rate_of_interest', 'Interest_rate_spread', 'income', 'credit_type', 'Credit_Score', 'age']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Log incoming request data
        data = request.get_json()
        logger.debug(f"Received request data: {data}")

        # Convert data to list format
        user_input = [data.get(feature, 0) for feature in feature_names]
        logger.debug(f"Processed user input: {user_input}")

        # Convert numerical values
        num_indices = [4, 5, 6, 7, 9]  # Indices of numerical fields
        for i in num_indices:
            user_input[i] = float(user_input[i])
        logger.debug(f"Converted numerical values: {user_input}")

        # Convert to DataFrame
        input_df = pd.DataFrame([user_input], columns=feature_names)
        logger.debug(f"Input DataFrame:\n{input_df}")

        # Transform input data
        transformed_input = preprocessor.transform(input_df)
        logger.debug(f"Transformed input data: {transformed_input}")

        # Make prediction
        prediction = model.predict(transformed_input)
        result = "Approve" if prediction[0] == 1 else "Reject"
        logger.debug(f"Prediction result: {result}")

        return jsonify({"prediction": result})  # Return JSON response

    except Exception as e:
        logger.error(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    logger.info("Starting Flask app")
    app.run(debug=True)