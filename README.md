# Loan Default Prediction Web Application

## 📌 Overview
This project is a **Loan Default Prediction Web Application** that helps predict whether a loan applicant is likely to default based on various input features. The application consists of a **React.js frontend** for user input and a **Flask backend** that processes data through a trained machine learning model.

## 🚀 Features
- 🏦 **User-friendly loan application form** to collect user details.
- 🔍 **Machine Learning model** to predict loan approval or rejection.
- 📡 **Flask API integration** to process input and return predictions.
- 🎨 **Modern UI with Tailwind CSS** for a clean and interactive design.
- 🔄 **Cross-Origin Resource Sharing (CORS) enabled** for seamless frontend-backend communication.

## 🛠️ Tech Stack
### Frontend:
- **React.js** (for UI and form handling)
- **Axios** (for API calls)
- **Tailwind CSS** (for styling)

### Backend:
- **Flask** (for API & model inference)
- **pandas & NumPy** (for data handling)
- **Scikit-learn** (for ML model training & prediction)
- **Pickle** (for model serialization)

## 📂 Project Structure
```
loan-default-prediction/
│── deploy-frontend/              # React.js Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputDetails.jsx  # Loan input form
│   │   ├── App.js
│   │   ├── index.js
│   |   |── package.json           # Frontend dependencies
│── deploy-project/               # Flask Backend
│   ├── ml-model/
│   │   ├── model.pkl       # Trained ML model
│   │   ├── preprocessor.pkl # Data preprocessor
│   ├── app.py             # Flask API
│   |── README.md              # Project Documentation
│   |── requirements.txt       # Backend dependencies
```

## 🔧 Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/nicolaiedith1891/loan-default-prediction.git
cd loan-default-prediction
```
### 2️⃣ Backend Setup (Flask API)
```sh
cd deploy-project
python -m venv venv   # Create a virtual environment
venv\Scripts\activate  # Activate virtual environment (Windows)
pip install -r requirements.txt  # Install dependencies
python app.py  # Run Flask server
```
API runs on: `http://127.0.0.1:5000/predict`

### 3️⃣ Frontend Setup (React.js)
```sh
cd deploy-frontend
npm install  # Install dependencies
npm run dev  # Start React app
```
React app runs on: `http://localhost:3000`

## 📡 API Endpoint
- **POST /predict**  
  **Request:**
  ```json
  {
  "loan_limit": "cf",
  "Gender": "Female",
  "loan_type": "type1",
  "business_or_commercial": "nob/c",
  "loan_amount": 100000,
  "rate_of_interest": 3.5,
  "Interest_rate_spread": 0.1,
  "income": 50000,
  "credit_type": "EXP",
  "Credit_Score": 800,
  "age": "35-44"
}
  ```
  **Response:**
  ```json
  {
    "prediction": "Reject"
  }
  ```

## 🧪 Testing
- Test the Flask API using **Postman** or **cURL**.
- Submit loan applications via the frontend form.

## 🏗️ Future Enhancements
- 📊 **Improve Model Accuracy** with more advanced ML techniques.
- 📌 **Add Database Support** to store application history.
- 🌍 **Deploy on Cloud** using AWS/GCP.

## 🤝 Contributing
Contributions are welcome! Feel free to **fork** the repository and submit a **pull request**.

## 📜 License
This project is licensed under the **MIT License**.

---
📌 **Author:** *Dasun Wijekumara*  
💻 **GitHub:** [nicolaiedith1891](https://github.com/nicolaiedith1891)  
✉️ **Contact:** tharushwijekumara@example.com

