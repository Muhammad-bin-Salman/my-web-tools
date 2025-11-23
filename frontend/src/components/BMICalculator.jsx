import Layout from "./Layout";
import { useState } from 'react';
import axios from 'axios';

function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);  // ← Can be number OR string
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");
    setBmi(null);
    setCategory("");

    if (!weight || !height || weight <= 0 || height <= 0) {
      setError("Please enter valid weight and height");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/calculator/bmi', {
        weight: parseFloat(weight),
        height: parseFloat(height)
      });

      // ←←← THIS IS THE FIX ←←←
      const bmiValue = typeof res.data.bmi === 'string' 
        ? parseFloat(res.data.bmi) 
        : res.data.bmi;

      if (isNaN(bmiValue)) throw new Error("Invalid BMI value");

      setBmi(bmiValue);
      setCategory(res.data.category || getBMICategory(bmiValue));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to calculate BMI. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Normal weight";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const getCategoryColor = () => {
    if (!bmi) return "";
    if (bmi < 18.5) return "from-blue-400 to-blue-600";
    if (bmi < 25) return "from-green-400 to-green-600";
    if (bmi < 30) return "from-yellow-400 to-orange-500";
    return "from-red-500 to-red-700";
  };

  const handleClear = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory("");
    setError("");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
        <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            BMI Calculator
          </h1>

          <div className="bg-white p-6 rounded-2xl space-y-6 border border-gray-200">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g., 70"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g., 170"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !weight || !height}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  {loading ? "Calculating..." : "Calculate BMI"}
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

            {/* Error */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center font-medium">
                {error}
              </div>
            )}

            {/* Result */}
            {bmi !== null && !error && (
              <div className={`p-8 rounded-2xl text-white text-center bg-gradient-to-br ${getCategoryColor()} shadow-lg`}>
                <p className="text-lg opacity-90 mb-2">Your BMI is</p>
                <p className="text-6xl font-bold mb-3">
                  {Number(bmi).toFixed(1)}  {/* ← Safe toFixed */}
                </p>
                <p className="text-2xl font-semibold">{category}</p>
              </div>
            )}

            {/* BMI Reference */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-1">
              <p className="font-semibold text-center text-gray-700 mb-2">BMI Categories:</p>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-blue-100 p-2 rounded">{"< 18.5"} → Underweight</div>
                <div className="bg-green-100 p-2 rounded">18.5 – 24.9 → Normal</div>
                <div className="bg-yellow-100 p-2 rounded">25 – 29.9 → Overweight</div>
                <div className="bg-red-100 p-2 rounded">≥ 30 → Obese</div>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center mt-6">
              Body Mass Index (BMI) = weight (kg) ÷ height² (m) • Accurate & instant
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BMICalculator;