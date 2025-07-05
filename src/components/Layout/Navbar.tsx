import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold tracking-tight">
            📚 LibrarySys
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/books" className="hover:text-blue-400 transition">
              All Books
            </Link>
            <Link to="/create-book" className="hover:text-blue-400 transition">
              Add Book
            </Link>
            <Link to="/borrow-summary" className="hover:text-blue-400 transition">
              Borrow Summary
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-gray-800">
          <Link
            to="/books"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:bg-gray-700 rounded px-2"
          >
            All Books
          </Link>
          <Link
            to="/create-book"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:bg-gray-700 rounded px-2"
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            onClick={() => setMenuOpen(false)}
            className="block py-2 hover:bg-gray-700 rounded px-2"
          >
            Borrow Summary
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
