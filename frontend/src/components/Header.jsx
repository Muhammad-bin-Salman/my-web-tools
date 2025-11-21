import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-lg font-bold">
          <Link to="/">Tools Website</Link>
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/emi-calculator" className="hover:underline">EMI</Link>
          <Link to="/bmi-calculator" className="hover:underline">BMI</Link>
          <Link to="/age-calculator" className="hover:underline">Age</Link>
          <Link to="/profitMargin-calculator" className="hover:underline">Profit</Link>
          <Link to="/base64-encoder" className="hover:underline">Base64</Link>
          <Link to="/url-encoder-decoder" className="hover:underline">URL Encode</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-blue-700 p-4 space-y-3">
          <Link to="/" className="block">Home</Link>
          <Link to="/emi-calculator" className="block">EMI Calculator</Link>
          <Link to="/bmi-calculator" className="block">BMI Calculator</Link>
          <Link to="/age-calculator" className="block">Age Calculator</Link>
          <Link to="/profitMargin-calculator" className="block">Profit Margin</Link>
          <Link to="/base64-encoder" className="block">Base64 Encoder</Link>
          <Link to="/url-encoder-decoder" className="block">URL Encoder</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
