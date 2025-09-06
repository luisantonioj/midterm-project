import React from "react";
import { Link } from "react-router-dom";

export default function MobileNav({ 
  isMenuOpen, setIsMenuOpen, user, login, logout, isScrolled, isSolidPage, location 
}) {
  const activeLight = isScrolled || isSolidPage;

  return (
    <div
      className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen
          ? activeLight
            ? "max-h-96 pb-4 border-t border-slate-200 bg-white"
            : "max-h-96 pb-4 border-t border-white/20 bg-black/30 backdrop-blur-md"
          : "max-h-0"
      }`}
    >
      <div className="flex flex-col space-y-1 mt-2">
        <Link
          to="/"
          className={`px-4 py-3 rounded-lg transition-colors ${
            location.pathname === "/"
              ? activeLight
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "bg-white/20 text-white font-medium"
              : activeLight
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
              ? activeLight
                ? "bg-indigo-50 text-indigo-700 font-medium"
                : "bg-white/20 text-white font-medium"
              : activeLight
              ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
              : "text-white/90 hover:text-white hover:bg-white/10"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          My Bookings
        </Link>

        {user ? (
          <div
            className={`pt-3 mt-2 ${
              activeLight ? "border-t border-slate-200" : "border-t border-white/20"
            }`}
          >
            <div
              className={`px-4 py-2 text-sm ${
                activeLight ? "text-slate-500" : "text-white/70"
              }`}
            >
              Signed in as
            </div>
            <div className="flex items-center px-4 py-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mr-3 ${
                  activeLight
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-white/20 text-white"
                }`}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span
                className={`font-medium ${
                  activeLight ? "text-slate-800" : "text-white"
                }`}
              >
                {user.name}
              </span>
            </div>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 mt-2 rounded-lg border transition-colors ${
                activeLight
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
              activeLight
                ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800"
                : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            }`}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
