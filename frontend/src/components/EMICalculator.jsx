import Layout from "./Layout";
import { useState } from 'react';
import axios from 'axios';
import Seo from './Seo';

function EMICalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const loanAmount = parseFloat(amount);
    const interestRate = parseFloat(rate);
    const tenureMonths = parseInt(months);

    if (!loanAmount || !interestRate || !tenureMonths || loanAmount <= 0 || interestRate <= 0 || tenureMonths <= 0) {
      setError("Please fill all fields with valid positive values");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/calculator/emi', {
        amount: loanAmount,
        rate: interestRate,
        months: tenureMonths
      });

      const emiValue = typeof res.data.emi === 'string' 
        ? parseFloat(res.data.emi) 
        : res.data.emi;

      if (isNaN(emiValue)) throw new Error("Invalid EMI received");

      const totalPayable = emiValue * tenureMonths;
      const totalInterest = totalPayable - loanAmount;

      setResult({
        emi: emiValue,
        totalPayable,
        totalInterest
      });
    } catch (err) {
      setError(err.response?.data?.error || "Calculation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setAmount("");
    setRate("");
    setMonths("");
    setResult(null);
    setError("");
  };

  // Generic number formatting (with commas, no currency symbol)
  const formatNumber = (num) => {
    return Math.round(num).toLocaleString('en-US');
  };

  return (
    <Layout>
      <Seo 
        title="Free EMI Calculator - Calculate the monthly EMI for your loan easily."
        description="Wish to calculate the monthly EMI of your loan? Calculate the EMI that you would pay every month to repay your loan using our EMI Calculator."
        path="/emi-calculator"
      />
      <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
        <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Loan EMI Calculator
          </h1>

          <div className="bg-white p-6 rounded-2xl space-y-6 border border-gray-200">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (% per year)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  placeholder="e.g., 7.5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (Months)
                </label>
                <input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  placeholder="e.g., 60"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !amount || !rate || !months}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-medium transition shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? "Calculating..." : "Calculate EMI"}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                >
                  Clear
                </button>
              </div>
            </form>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center font-medium">
                {error}
              </div>
            )}

            {result && !error && (
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white text-center shadow-xl">
                <p className="text-lg opacity-90 mb-3">Monthly EMI</p>
                <p className="text-6xl font-bold mb-6">
                  {formatNumber(result.emi)}
                </p>

                <div className="grid grid-cols-2 gap-6 text-lg">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-80">Total Payable</p>
                    <p className="text-2xl font-bold">{formatNumber(result.totalPayable)}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-80">Total Interest</p>
                    <p className="text-2xl font-bold text-yellow-300">{formatNumber(result.totalInterest)}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center mt-6">
              Universal EMI calculator • Works with any currency • Updated {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EMICalculator;