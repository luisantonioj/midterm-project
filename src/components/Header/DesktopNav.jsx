import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DesktopNav({ user, login, logout, isScrolled, isSolidPage, location }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const activeLight = isScrolled || isSolidPage;
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden md:flex items-center space-x-1 relative">
      <Link
        to="/"
        className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
          location.pathname === "/"
            ? activeLight
              ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
              : "bg-white/20 text-white font-medium"
            : activeLight
            ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        Home
      </Link>

      <Link
        to="/my-bookings"
        className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
          location.pathname.startsWith("/my-bookings")
            ? activeLight
              ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
              : "bg-white/20 text-white font-medium"
            : activeLight
            ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        My Bookings
      </Link>

      {!user ? (
        <button
          onClick={() => {
            login();
            navigate("/my-bookings");
          }}
          className={`px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
            activeLight
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          }`}
        >
          Sign In
        </button>
      ) : (
        <div className="relative ml-0" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200 ${
              activeLight
                ? "hover:bg-indigo-50 text-slate-700"
                : "hover:bg-white/10 text-white/90"
            }`}
          >
            <span className="font-medium">{user.name}</span>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
              activeLight ? "bg-indigo-100 text-indigo-700" : "bg-white/20 text-white"
            }`}>
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                user.name?.charAt(0).toUpperCase()
              )}
            </div>
          </button>

          {menuOpen && (
            <div
              className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden z-50 ${
                activeLight ? "bg-white border border-slate-200" : "bg-slate-800 border border-slate-700"
              }`}
            >
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                  navigate("/");
                }}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  activeLight
                    ? "text-slate-700 hover:bg-slate-50"
                    : "text-white hover:bg-slate-700"
                }`}
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}