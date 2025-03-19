import { useState } from "react";
import axios from "axios";

function InputDetails() {
  const [formData, setFormData] = useState({
    loan: "",
    gender: "",
    type: "",
    financial: "",
    credit_type: "",
    loan_amount: "",
    interest_rate: "",
    rate_spread: "",
    income: "",
    credit_score: "",
    age: "",
  });

  const [prediction, setPrediction] = useState(null); // Store prediction result

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted Data:", formData);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(response.data.prediction); // Store prediction result
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

        {/* Loan Amount */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Loan Amount:
          </label>
          <select
            name="loan"
            value={formData.loan}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Loan Type</option>
            <option value="CF">CF (Confirming Loan)</option>
            <option value="Canceling">Canceling</option>
          </select>
          <p className="mt-1 text-[10px] text-gray-900 dark:text-gray-200">CF: Conforming Loan, NCF: Non-Conforming Loan</p>
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Gender:
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Select the applicant's gender.</p>
        </div>

        {/* Loan Type */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Loan Type:
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select Loan Type</option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Different loan categories.</p>
        </div>

        {/* Business or Commercial */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Business or Commercial:
          </label>
          <select
            name="financial"
            value={formData.financial}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200"> Is the loan for a business or commercial purpose?</p>
        </div>

        {/* Credit Type */}
        <div className="mb-5">
          <label
            htmlFor="credit_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Credit Type :
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
            name="interest_rate"
            value={formData.interest_rate}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Enter the interest rate percentage</p>
        </div>

        {/* Rate Spread */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Interest Rate Spread:
          </label>
          <input
            type="number"
            step="0.01"
            name="rate_spread"
            value={formData.rate_spread}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200"> Difference between loan rate and benchmark rate.</p>
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
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200"> Enter the borrower's annual income in USD.</p>
        </div>

        {/* Credit Score */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white">
            Credit Score:
          </label>
          <input
            type="number"
            name="credit_score"
            value={formData.credit_score}
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
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          <p className="mb-2 text-[10px] text-gray-900 dark:text-gray-200">Enter the applicant's age.</p>
        </div>

        {/* Loan Status */}
        <div className="flex justify-between">
          <h1 className="text-3xl text-white">
            Loan Status:{" "}
            {prediction || "Awaiting Submission"}
          </h1>
        </div>
      </form>
    </div>
  );
}

export default InputDetails;