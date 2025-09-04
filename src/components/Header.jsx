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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-10 py-0 sm:px-14 sm:py-10 lg:px-14 lg:py-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow ${
              isScrolled 
                ? "bg-gradient-to-br from-indigo-600 to-indigo-700" 
                : "bg-white/10 backdrop-blur-sm"
            }`}>
              <span className={`font-bold text-lg ${
                isScrolled ? "text-white" : "text-white"
              }`}>S</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}>
                StudySpot PH
              </span>
              <span className={`text-xs -mt-1 ${
                isScrolled ? "text-slate-500" : "text-white/80"
              }`}>
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
                  ? isScrolled 
                    ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm" 
                    : "bg-white/20 text-white font-medium"
                  : isScrolled 
                    ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard/my-bookings"
              className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
                location.pathname.startsWith("/dashboard")
                  ? isScrolled 
                    ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm" 
                    : "bg-white/20 text-white font-medium"
                  : isScrolled 
                    ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              My Bookings
            </Link>

            {user ? (
              <div className="flex items-center ml-4 pl-4 border-l border-slate-200">
                <div className="flex items-center mr-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mr-2 ${
                    isScrolled 
                      ? "bg-indigo-100 text-indigo-700" 
                      : "bg-white/20 text-white"
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`text-sm ${
                    isScrolled ? "text-slate-700" : "text-white"
                  }`}>
                    Hi, {user.name.split(' ')[0]}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className={`px-4 py-2 text-sm rounded-lg border transition-colors shadow-sm ${
                    isScrolled 
                      ? "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300" 
                      : "border-white/30 text-white hover:bg-white/10"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => login()}
                className={`ml-4 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                  isScrolled 
                    ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800" 
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                }`}
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`block absolute w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'rotate-45 bg-slate-700' : '-translate-y-1.5 bg-white'}`}></span>
              <span className={`block absolute w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0 bg-slate-700' : 'opacity-100 bg-white'}`}></span>
              <span className={`block absolute w-6 h-0.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 bg-slate-700' : 'translate-y-1.5 bg-white'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? isScrolled 
              ? 'max-h-96 pb-4 border-t border-slate-200 bg-white' 
              : 'max-h-96 pb-4 border-t border-white/20 bg-black/30 backdrop-blur-md'
            : 'max-h-0'
        }`}>
          <div className="flex flex-col space-y-1 mt-2">
            <Link
              to="/"
              className={`px-4 py-3 rounded-lg transition-colors ${
                location.pathname === "/"
                  ? isScrolled 
                    ? "bg-indigo-50 text-indigo-700 font-medium" 
                    : "bg-white/20 text-white font-medium"
                  : isScrolled 
                    ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard/my-bookings"
              className={`px-4 py-3 rounded-lg transition-colors ${
                location.pathname.startsWith("/dashboard")
                  ? isScrolled 
                    ? "bg-indigo-50 text-indigo-700 font-medium" 
                    : "bg-white/20 text-white font-medium"
                  : isScrolled 
                    ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50" 
                    : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              My Bookings
            </Link>

            {user ? (
              <div className={`pt-3 mt-2 ${
                isScrolled ? "border-t border-slate-200" : "border-t border-white/20"
              }`}>
                <div className={`px-4 py-2 text-sm ${
                  isScrolled ? "text-slate-500" : "text-white/70"
                }`}>
                  Signed in as
                </div>
                <div className="flex items-center px-4 py-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mr-3 ${
                    isScrolled 
                      ? "bg-indigo-100 text-indigo-700" 
                      : "bg-white/20 text-white"
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`font-medium ${
                    isScrolled ? "text-slate-800" : "text-white"
                  }`}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 mt-2 rounded-lg border transition-colors ${
                    isScrolled 
                      ? "border-slate-200 text-slate-700 hover:bg-slate-50" 
                      : "border-white/30 text-white hover:bg-white/10"
                  }`}
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
                className={`w-full text-left px-4 py-3 mt-2 rounded-lg transition-all duration-200 ${
                  isScrolled 
                    ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800" 
                    : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
                }`}
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