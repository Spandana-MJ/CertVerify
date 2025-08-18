



import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar({ account, connectWallet }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300
     hover:after:w-full
     ${isActive ? "text-blue-600 after:w-full" : "text-gray-700 hover:text-blue-600"}`;

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white to-blue-50 shadow-md backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              CertVerify
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/verify" className={linkClasses}>
              Verify
            </NavLink>
            <NavLink to="/admin/dashboard" className={linkClasses}>
              Admin
            </NavLink>
            <NavLink to="/student/dashboard" className={linkClasses}>
              Student
            </NavLink>
          </div>

          {/* Wallet */}
          <div className="hidden md:block">
            {account ? (
              <span className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-blue-200 text-blue-700 font-medium shadow-sm text-sm">
                {account.slice(0, 6)}...{account.slice(-4)}
              </span>
            ) : (
              <button
                onClick={connectWallet}
                className="px-5 py-2 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4 bg-white/90 backdrop-blur-lg shadow-md">
          <NavLink to="/" className={linkClasses} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/verify" className={linkClasses} onClick={() => setMenuOpen(false)}>
            Verify
          </NavLink>
          <NavLink to="/admin/dashboard" className={linkClasses} onClick={() => setMenuOpen(false)}>
            Admin
          </NavLink>
          <NavLink to="/student/dashboard" className={linkClasses} onClick={() => setMenuOpen(false)}>
            Student
          </NavLink>

          {account ? (
            <span className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-blue-200 text-blue-700 font-medium shadow-sm text-sm">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <button
              onClick={connectWallet}
              className="px-5 py-2 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

