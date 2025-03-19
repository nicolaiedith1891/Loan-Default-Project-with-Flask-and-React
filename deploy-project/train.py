import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, roc_auc_score

# Load dataset
df = pd.read_csv('Loan_Default.csv')

# Select relevant features
df = df[['loan_limit', 'Gender', 'loan_type', 'business_or_commercial', 
         'loan_amount', 'rate_of_interest', 'Interest_rate_spread', 'income', 
         'credit_type', 'Credit_Score', 'age', 'Status']]

# Remove duplicates
df.drop_duplicates(inplace=True)

# Fill missing values in numerical columns with their mean
df['rate_of_interest'].fillna(df['rate_of_interest'].mean(), inplace=True)
df['Interest_rate_spread'].fillna(df['Interest_rate_spread'].mean(), inplace=True)

# Define numerical & categorical features
num_features = ['loan_amount', 'rate_of_interest', 'Interest_rate_spread', 'income', 'Credit_Score']
cat_features = ['loan_limit', 'Gender', 'loan_type', 'business_or_commercial', 'credit_type', 'age']

# Numerical pipeline
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),  
    ('scaler', StandardScaler())  
])

# Categorical pipeline
cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# Full transformation pipeline
full_pipeline = ColumnTransformer([
    ('num', num_pipeline, num_features),
    ('cat', cat_pipeline, cat_features)
])

# Prepare features and target
X = df.drop('Status', axis=1)
y = df['Status']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Apply transformations
X_train = full_pipeline.fit_transform(X_train)
X_test = full_pipeline.transform(X_test)

# Train the KNN model
knn_model = KNeighborsClassifier()
knn_model.fit(X_train, y_train)

# Evaluate the KNN model
y_pred = knn_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
roc_auc = roc_auc_score(y_test, y_pred)

print(f"KNN → Accuracy: {accuracy:.4f}, ROC AUC: {roc_auc:.4f}")

# Save the KNN model and preprocessor using pickle
with open("ml-model/model.pkl", "wb") as file:
    pickle.dump(knn_model, file)

with open("preprocessor.pkl", "wb") as file:
    pickle.dump(full_pipeline, file)

print("KNN model and preprocessor saved successfully!")