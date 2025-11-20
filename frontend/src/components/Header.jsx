import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="w-full flex justify-between items-center">

        <h1 className="text-lg font-bold"><Link to="/">Tools Website</Link></h1>

        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/emi-calculator" className="hover:underline">EMI</Link>
          <Link to="/bmi-calculator" className="hover:underline">BMI</Link>
          <Link to="/age-calculator" className="hover:underline">Age</Link>
          <Link to="/base64-encoder" className="hover:underline">Base64</Link>
        </nav>

      </div>
    </header>
  );
}

export default Header;
