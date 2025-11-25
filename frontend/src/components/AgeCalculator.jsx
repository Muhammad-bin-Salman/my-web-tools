import Layout from "./Layout";
import { useState } from 'react';
import axios from 'axios';
import Seo from './Seo';

function AgeCalculator() {
  const [birthYear, setBirthYear] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");
    setAge(null);

    if (!birthYear || birthYear.length !== 4 || birthYear < 1900 || birthYear > new Date().getFullYear()) {
      setError("Please enter a valid year (e.g., 1995)");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/calculator/age', {
        birthYear: parseInt(birthYear)
      });
      setAge(res.data.age);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to calculate age. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBirthYear("");
    setAge(null);
    setError("");
  };

  return (
    <Layout>
      <Seo 
        title="Free Age Calculator - Calculate Your Exact Age in Years"
        description="Calculate your exact age in years by entering your birth year. Get instant and accurate results. 100% free, no sign-up required."
        path="/age-calculator"
      />
      <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
        <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Age Calculator
          </h1>

          <div className="bg-white p-6 rounded-2xl space-y-6 border border-gray-200">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Your Birth Year
                </label>
                <input
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="e.g., 1995"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg text-center"
                  min="1900"
                  max={new Date().getFullYear()}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !birthYear}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  {loading ? "Calculating..." : "Calculate Age"}
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

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center font-medium">
                {error}
              </div>
            )}

            {/* Result */}
            {age !== null && !error && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-center">
                <p className="text-gray-600 text-sm mb-1">Your Age Is</p>
                <p className="text-5xl font-bold text-blue-700">
                  {age}
                </p>
                <p className="text-gray-600 mt-2">years old</p>
              </div>
            )}

            {/* Info */}
            <div className="text-xs text-gray-500 text-center mt-6">
              Enter your birth year and get your exact age in years • Updated for {new Date().getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AgeCalculator;