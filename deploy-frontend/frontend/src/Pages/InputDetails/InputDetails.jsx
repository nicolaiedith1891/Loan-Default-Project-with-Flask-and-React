import { useState } from "react";
import axios from "axios";

function InputDetails() {
  const [formData, setFormData] = useState({
    loan_limit: "",
    Gender: "",
    loan_type: "",
    business_or_commercial: "",
    credit_type: "",
    loan_amount: "",
    rate_of_interest: "",
    Interest_rate_spread: "",
    income: "",
    Credit_Score: "",
    age: "",
  });

  const [prediction, setPrediction] = useState(null); // Store prediction result

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted Data:", formData);
  
    // Convert numerical fields to numbers
    const payload = {
      ...formData,
      loan_amount: parseFloat(formData.loan_amount),
      rate_of_interest: parseFloat(formData.rate_of_interest),
      Interest_rate_spread: parseFloat(formData.Interest_rate_spread),
      income: parseFloat(formData.income),
      Credit_Score: parseFloat(formData.Credit_Score),
    };
  
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", payload);
      setPrediction(response.data.prediction === "Approve" ? 0 : 1); // Update prediction state
    } catch (error) {
      console.error("Error submitting form:", error);
      setPrediction("Error processing request");
    }
  };

  return (
    <div className="flex items-center justify-between gap-x-5 h-screen bg-gray-800">
      {/* Left Side Form */}
      <form onSubmit={handleSubmit} className="mx-auto w-[400px]">
        <div className="mb-5">
          <h1 className="text-4xl text-white font-semibold text-center tracking-normal">
            Loan Default Prediction
          </h1>
        </div>

        {/* Loan Limit */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Loan Limit:
          </label>
          <select
            name="loan_limit"
            value={formData.loan_limit}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Loan Limit</option>
            <option value="cf">CF (Confirming Loan)</option>
            <option value="ncf">NCF (Non-Confirming Loan)</option>
          </select>
          <p className="mt-1 text-[10px] text-gray-900 dark:text-gray-200">CF: Conforming Loan, NCF: Non-Conforming Loan</p>
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Gender:
          </label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Joint">Joint</option>
            <option value="Sex Not Available">Sex Not Available</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Select the applicant's gender.</p>
        </div>

        {/* Loan Type */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Loan Type:
          </label>
          <select
            name="loan_type"
            value={formData.loan_type}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Loan Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Different loan categories.</p>
        </div>

        {/* Business or Commercial */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Business or Commercial:
          </label>
          <select
            name="business_or_commercial"
            value={formData.business_or_commercial}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select</option>
            <option value="b/c">Yes</option>
            <option value="nob/c">No</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Is the loan for a business or commercial purpose?</p>
        </div>

        {/* Credit Type */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Credit Type:
          </label>
          <select
            name="credit_type"
            value={formData.credit_type}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select</option>
            <option value="CIB">CIB</option>
            <option value="CRIF">CRIF</option>
            <option value="EXP">EXP</option>
            <option value="EQUI">EQUI</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">CIB: Credit Information Bureau, CRIF: CRIF Credit Solutions, EXP: Experian, EQUI: Equifax.</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-9">
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-700 text-white font-medium py-2 px-12 rounded-full"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Right Side Form */}
      <form className="mx-auto w-[400px]">
        {/* Loan Amount */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Loan Amount:
          </label>
          <input
            type="number"
            step="0.01"
            name="loan_amount"
            value={formData.loan_amount}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Enter the total loan amount in USD.</p>
        </div>

        {/* Interest Rate */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Rate of Interest:
          </label>
          <input
            type="number"
            step="0.01"
            name="rate_of_interest"
            value={formData.rate_of_interest}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Enter the interest rate percentage.</p>
        </div>

        {/* Rate Spread */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Interest Rate Spread:
          </label>
          <input
            type="number"
            step="0.01"
            name="Interest_rate_spread"
            value={formData.Interest_rate_spread}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Difference between loan rate and benchmark rate.</p>
        </div>

        {/* Income */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Income:
          </label>
          <input
            type="number"
            step="0.01"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Enter the borrower's annual income in USD.</p>
        </div>

        {/* Credit Score */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Credit Score:
          </label>
          <input
            type="number"
            name="Credit_Score"
            value={formData.Credit_Score}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            required
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">A numerical representation of creditworthiness.</p>
        </div>

        {/* Age */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Age:
          </label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Age</option>
            <option value="25-34">25-34</option>
            <option value="35-44">35-44</option>
            <option value="45-54">45-54</option>
            <option value="55-64">55-64</option>
          </select>
          <p className="mt-1 text-[10px] text-gray-900 dark:text-gray-200">Customer Age</p>
        </div>

        {/* Loan Status */}
        <div className="flex justify-between">
            <h1 className="text-3xl text-white">
              Loan Status:{" "}
              {prediction === 0 ? "Approved" : prediction === 1 ? "Rejected" : "Awaiting Submission"}
            </h1>
        </div>
      </form>
    </div>
  );
}

export default InputDetails;