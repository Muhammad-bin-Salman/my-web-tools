import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="h-16 bg-blue-600 text-white shadow-lg flex items-center px-6 shrink-0">
      <div className="flex-1 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold">
          <Link to="/">Tools Website</Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/emi-calculator" className="hover:underline">EMI</Link>
          <Link to="/bmi-calculator" className="hover:underline">BMI</Link>
          <Link to="/age-calculator" className="hover:underline">Age</Link>
          <Link to="/profitMargin-calculator" className="hover:underline">Profit</Link>
          <Link to="/base64-encoder" className="hover:underline">Base64</Link>
          <Link to="/url-encoder-decoder" className="hover:underline">URL Encode</Link>
          {/* add more as needed */}
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-blue-700 p-4 space-y-3 z-50">
          <Link to="/" className="block hover:underline" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/emi-calculator" className="block hover:underline" onClick={() => setOpen(false)}>EMI Calculator</Link>
          <Link to="/bmi-calculator" className="block hover:underline" onClick={() => setOpen(false)}>BMI Calculator</Link>
          <Link to="/age-calculator" className="block hover:underline" onClick={() => setOpen(false)}>Age Calculator</Link>
          <Link to="/profitMargin-calculator" className="block hover:underline" onClick={() => setOpen(false)}>Profit Margin</Link>
          <Link to="/base64-encoder" className="block hover:underline" onClick={() => setOpen(false)}>Base64 Encoder</Link>
          <Link to="/url-encoder-decoder" className="block hover:underline" onClick={() => setOpen(false)}>URL Encoder</Link>
          {/* ... */}
        </div>
      )}
    </header>
  );
}

export default Header;