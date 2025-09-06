import React from "react";
import { Link } from "react-router-dom";

export default function DesktopNav({ user, login, logout, isScrolled, isSolidPage, location }) {
  return (
    <nav className="hidden md:flex items-center space-x-1">
      <Link
        to="/"
        className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${
          location.pathname === "/"
            ? (isScrolled || isSolidPage)
              ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
              : "bg-white/20 text-white font-medium"
            : (isScrolled || isSolidPage)
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
            ? (isScrolled || isSolidPage)
              ? "bg-indigo-50 text-indigo-700 font-medium shadow-sm"
              : "bg-white/20 text-white font-medium"
            : (isScrolled || isSolidPage)
            ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50/80"
            : "text-white/90 hover:text-white hover:bg-white/10"
        }`}
      >
        My Bookings
      </Link>

      {user ? (
        <div className="flex items-center ml-4 pl-4 border-l border-slate-200">
          <div className="flex items-center mr-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm mr-2 ${
                isScrolled || isSolidPage
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-white/20 text-white"
              }`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span
              className={`text-sm ${
                isScrolled || isSolidPage ? "text-slate-700" : "text-white"
              }`}
            >
              Hi, {user.name.split(" ")[0]}
            </span>
          </div>
          <button
            onClick={logout}
            className={`px-4 py-2 text-sm rounded-lg border transition-colors shadow-sm ${
              isScrolled || isSolidPage
                ? "border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                : "border-white/30 text-white hover:bg-white/10"
            }`}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          className={`ml-4 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
            isScrolled || isSolidPage
              ? "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800"
              : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
          }`}
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
