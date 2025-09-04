import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">StudySpot PH</span>
          </Link>

          {/* Desktop Navigation - Always visible on desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
            >
              Home
            </Link>
            <Link 
              to="/dashboard/my-bookings" 
              className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === "/dashboard/my-bookings" ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"}`}
            >
              My Bookings
            </Link>
            
            {user ? (
              <div className="flex items-center ml-4 pl-4 border-l border-gray-200">
                <span className="text-sm text-gray-700 mr-3">Hi, {user.name}</span>
                <button 
                  onClick={logout} 
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => login()} 
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Simulate Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button - Only visible on mobile */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu - Only visible on mobile when toggled */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 mt-2">
              <Link 
                to="/" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/dashboard/my-bookings" 
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookings
              </Link>
              
              {user ? (
                <div className="pt-3 mt-2 border-t border-gray-200">
                  <div className="px-4 py-2 text-sm text-gray-500">Logged in as</div>
                  <div className="px-4 py-2 font-medium text-gray-800">{user.name}</div>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="w-full text-left px-4 py-3 mt-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
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
                  className="w-full text-left px-4 py-3 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Simulate Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}