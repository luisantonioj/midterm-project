import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ isScrolled, setIsMenuOpen }) {
  return (
    <Link
      to="/"
      className="flex items-center space-x-3 group"
      onClick={() => setIsMenuOpen(false)}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow ${
          isScrolled
            ? "bg-gradient-to-br from-indigo-600 to-indigo-700"
            : "bg-white/10 backdrop-blur-sm"
        }`}
      >
        <span
          className={`font-bold text-lg ${
            isScrolled ? "text-white" : "text-white"
          }`}
        >
          S
        </span>
      </div>
      <div className="flex flex-col">
        <span
          className={`text-xl font-bold tracking-tight ${
            isScrolled ? "text-slate-900" : "text-white"
          }`}
        >
          StudySpot PH
        </span>
        <span
          className={`text-xs -mt-1 ${
            isScrolled ? "text-slate-500" : "text-white/80"
          }`}
        >
          Co-working Space Booker
        </span>
      </div>
    </Link>
  );
}
