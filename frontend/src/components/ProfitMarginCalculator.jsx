import Layout from "./Layout";
import { useState } from 'react';
import axios from 'axios';

function ProfitMarginCalculator() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    const costValue = parseFloat(cost);
    const revenueValue = parseFloat(revenue);

    if (!costValue || !revenueValue || costValue <= 0 || revenueValue <= 0) {
      setError("Please enter valid positive numbers");
      return;
    }

    if (revenueValue < costValue) {
      setError("Revenue must be greater than Cost");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/calculator/profitMargin', {
        cost: costValue,
        revenue: revenueValue
      });

      const margin = typeof res.data.profitMargin === 'string'
        ? parseFloat(res.data.profitMargin)
        : res.data.profitMargin;

      if (isNaN(margin)) throw new Error("Invalid result");

      const profit = revenueValue - costValue;
      const markup = ((revenueValue - costValue) / costValue) * 100;

      setResult({
        profitMargin: margin,
        profit,
        markup
      });
    } catch (err) {
      setError(err.response?.data?.error || "Calculation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCost("");
    setRevenue("");
    setResult(null);
    setError("");
  };

  const formatNumber = (num) => Math.round(num).toLocaleString('en-US');

  const getGradient = () => {
    if (!result) return "";
    if (result.profitMargin >= 50) return "from-emerald-500 to-teal-600";
    if (result.profitMargin >= 30) return "from-green-500 to-emerald-600";
    if (result.profitMargin >= 15) return "from-blue-500 to-cyan-600";
    if (result.profitMargin >= 5) return "from-yellow-500 to-orange-600";
    return "from-red-500 to-rose-600";
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-full bg-gray-100 py-10">
        <div className="bg-white shadow-md p-6 rounded-2xl w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Profit Margin Calculator
          </h1>

          <div className="bg-white p-6 rounded-2xl space-y-6 border border-gray-200">
            <form onSubmit={handleCalculate} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price
                </label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Revenue / Selling Price
                </label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g., 80000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-center text-lg"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading || !cost || !revenue}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 text-white py-3 rounded-lg font-medium transition shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? "Calculating..." : "Calculate Margin"}
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
              <div className={`p-8 rounded-2xl text-white text-center bg-gradient-to-br ${getGradient()} shadow-xl`}>
                <p className="text-lg opacity-90 mb-3">Your Profit Margin</p>
                <p className="text-7xl font-bold mb-4">
                  {result.profitMargin.toFixed(1)}%
                </p>

                <div className="grid grid-cols-2 gap-6 text-lg mt-6">
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-80">Total Profit</p>
                    <p className="text-2xl font-bold">{formatNumber(result.profit)}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                    <p className="text-sm opacity-80">Markup</p>
                    <p className="text-2xl font-bold text-yellow-300">
                      {result.markup.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center mt-6 bg-gray-50 p-4 rounded-lg">
              Profit Margin = ((Revenue − Cost) / Revenue) × 100 • 
              Markup = ((Revenue − Cost) / Cost) × 100 • 
              Universal & accurate
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfitMarginCalculator;