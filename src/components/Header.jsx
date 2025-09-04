import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80" 
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                StudySpot PH
              </span>
              <span className="text-xs text-slate-500 -mt-1">
                Co-working Space Booker
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname === "/"
                  ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard/my-bookings"
              className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname.startsWith("/dashboard")
                  ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80"
              }`}
            >
              My Bookings
            </Link>

            {user ? (
              <div className="flex items-center ml-4 pl-4 border-l border-slate-200">
                <div className="flex items-center mr-4">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-medium text-sm mr-2">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-slate-700">
                    Hi, {user.name.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className="ml-4 px-4 py-2 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`block absolute w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
              <span className={`block absolute w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block absolute w-6 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 pb-4 border-t border-slate-200' : 'max-h-0'}`}>
          <div className="flex flex-col space-y-1 mt-2">
            <Link
              to="/"
              className={`px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/spaces"
              className={`px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/spaces"
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Spaces
            </Link>
            <Link
              to="/dashboard/my-bookings"
              className={`px-4 py-3 rounded-lg transition-colors ${
                location.pathname.startsWith("/dashboard")
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Bookings
            </Link>

            {user ? (
              <div className="pt-3 mt-2 border-t border-slate-200">
                <div className="px-4 py-2 text-sm text-slate-500">
                  Signed in as
                </div>
                <div className="flex items-center px-4 py-2">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-medium text-sm mr-3">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-800">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 mt-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  login();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 mt-2 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}