import { Link } from "react-router-dom";
import { Home, Calculator, User, Timer, DollarSign, Code } from 'lucide-react';

function Sidebar() {
  return (
    <aside className="p-6 w-full md:w-auto">
      <h2 className="font-bold text-lg mb-4">Tools</h2>
      <ul className="space-y-3">
        <li><Link to="/" className="flex items-center gap-2 text-blue-600 hover:underline"><Home size={20} className="text-blue-600" /> Home</Link></li>
        <li><Link to="/emi-calculator" className="flex items-center gap-2 text-blue-600 hover:underline"><Calculator size={20} className="text-blue-600" /> Loan EMI Calculator</Link></li>
        <li><Link to="/bmi-calculator" className="flex items-center gap-2 text-blue-600 hover:underline"><User size={20} className="text-green-600" /> BMI Calculator</Link></li>
        <li><Link to="/age-calculator" className="flex items-center gap-2 text-blue-600 hover:underline"><Timer size={20} className="text-orange-600" /> Age Calculator</Link></li>
        <li><Link to="/profitMargin-calculator" className="flex items-center gap-2 text-blue-600 hover:underline"><DollarSign size={20} className="text-yellow-600" /> Profit Margin Calculator</Link></li>
        <li><Link to="/base64-encoder" className="flex items-center gap-2 text-blue-600 hover:underline"><Code size={20} className="text-purple-600" /> Base64 Encoder</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
