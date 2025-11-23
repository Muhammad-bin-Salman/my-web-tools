import Layout from "./Layout";
import { Link } from 'react-router-dom';
import { Calculator, Activity, Timer, DollarSign, Code, Link2 } from 'lucide-react';

function Home() {
  return (
    <Layout>
    <div className="min-h-full bg-gray-100 p-8">
      
      {/* Dashboard Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        All Web Tools
      </h1>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* EMI Calculator */}
        <Link
          to="/emi-calculator"
          className="bg-white hover:bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center transition"
        >
          <Calculator size={40} className="text-blue-600 mb-4" />
          <h2 className="text-lg font-semibold">Loan EMI Calculator</h2>
        </Link>

        {/* BMI Calculator */}
        <Link
          to="/bmi-calculator"
          className="bg-white hover:bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center transition"
        >
          <Activity size={40} className="text-red-600 mb-4" />
          <h2 className="text-lg font-semibold">BMI Calculator</h2>
        </Link>

        {/* Age Calculator */}
        <Link
          to="/age-calculator"
          className="bg-white hover:bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center transition"
        >
          <Timer size={40} className="text-orange-600 mb-4" />
          <h2 className="text-lg font-semibold">Age Calculator</h2>
        </Link>

        {/* Profit Margin Calculator */}
        <Link
          to="/profitMargin-calculator"
          className="bg-white hover:bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center transition"
        >
          <DollarSign size={40} className="text-emerald-600 mb-4" />
          <h2 className="text-lg font-semibold">Profit Margin Calculator</h2>
        </Link>

        {/* Base64 Encoder */}
        <Link
          to="/base64-encoder"
          className="bg-white hover:bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center transition"
        >
          <Code size={40} className="text-purple-600 mb-4" />
          <h2 className="text-lg font-semibold">Base64 Encoder</h2>
        </Link>
        
        {/* URL Encoder Decoder */}
        <Link
          to="/url-encoder-decoder"
          className="bg-white hover:bg-gray-50 shadow-md rounded-2xl p-6 flex flex-col items-center transition"
        >
          <Link2 size={40} className="text-indigo-600 mb-4" />
          <h2 className="text-lg font-semibold">URL Encoder Decoder</h2>
        </Link>

      </div>

    </div>
    </Layout>
  );
}

export default Home;
