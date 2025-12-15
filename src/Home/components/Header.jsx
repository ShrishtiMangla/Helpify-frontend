import { Link } from "react-router-dom";
import { useState } from "react"; // For mobile menu toggle

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto max-w-4xl w-full mx-6">
        <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-full shadow-lg px-8 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            Helpify
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
            <Link to="/" className="hover:text-gray-900 transition">
              Home
            </Link>
            <Link to="/ngos" className="hover:text-gray-900 transition">
              NGOs
            </Link>
            <Link to="/track" className="hover:text-gray-900 transition">
              Track
            </Link>
            <Link to="/about" className="hover:text-gray-900 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-900 transition">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="px-5 py-2.5 text-gray-700 rounded-full hover:bg-white/60 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl shadow-lg p-6">
            <div className="flex flex-col gap-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-gray-900 transition">Home</Link>
              <Link to="/ngos" className="hover:text-gray-900 transition">NGOs</Link>
              <Link to="/track" className="hover:text-gray-900 transition">Track</Link>
              <Link to="/about" className="hover:text-gray-900 transition">About</Link>
              <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
              <div className="border-t border-gray-300 pt-6 flex flex-col gap-4">
                <Link to="/login" className="text-center px-5 py-2.5 text-gray-700 rounded-full hover:bg-white/60 transition">
                  Login
                </Link>
                <Link to="/register" className="text-center px-5 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;