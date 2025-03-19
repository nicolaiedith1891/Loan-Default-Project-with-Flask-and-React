import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
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

# Define classifiers
classifiers = {
    "Logistic Regression": LogisticRegression(),
    "K-Nearest Neighbors": KNeighborsClassifier(),
    "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
    "Decision Tree": DecisionTreeClassifier(),
    "Naive Bayes": GaussianNB()
}

# Train, evaluate, and store results
results = {}

for name, model in classifiers.items():
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_pred)
    
    results[name] = {"accuracy": accuracy, "roc_auc": roc_auc, "model": model}
    print(f"{name} → Accuracy: {accuracy:.4f}, ROC AUC: {roc_auc:.4f}")

# Select the best model based on ROC AUC (or accuracy if tied)
best_model_name = max(results, key=lambda x: results[x]["roc_auc"])
best_model = results[best_model_name]["model"]

print(f"\n Best Model: {best_model_name} → ROC AUC: {results[best_model_name]['roc_auc']:.4f}")

# Save the best model and preprocessor
with open("ml-model/model.pkl", "wb") as file:
    pickle.dump(best_model, file)

with open("ml-model/preprocessor.pkl", "wb") as file:
    pickle.dump(full_pipeline, file)
