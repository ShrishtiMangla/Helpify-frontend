import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto max-w-3xl w-full mx-6">
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

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 backdrop-blur-md bg-white/70 border border-white/20 rounded-3xl shadow-lg p-6">
            <div className="flex flex-col gap-6 text-gray-700 font-medium">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <Link to="/ngos" onClick={() => setIsMobileMenuOpen(false)}>NGOs</Link>
              <Link to="/track" onClick={() => setIsMobileMenuOpen(false)}>Track</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
