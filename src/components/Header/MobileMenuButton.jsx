import React from "react";

export default function MobileMenuButton({ isMenuOpen, setIsMenuOpen }) {
  return (
    <button
      className="md:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center relative">
        <span
          className={`block absolute w-6 h-0.5 transition-all duration-300 ${
            isMenuOpen ? "rotate-45 bg-slate-700" : "-translate-y-1.5 bg-white"
          }`}
        ></span>
        <span
          className={`block absolute w-6 h-0.5 transition-all duration-300 ${
            isMenuOpen ? "opacity-0 bg-slate-700" : "opacity-100 bg-white"
          }`}
        ></span>
        <span
          className={`block absolute w-6 h-0.5 transition-all duration-300 ${
            isMenuOpen ? "-rotate-45 bg-slate-700" : "translate-y-1.5 bg-white"
          }`}
        ></span>
      </div>
    </button>
  );
}
