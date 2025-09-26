import React from "react";

export default function MobileMenuButton({ isMenuOpen, setIsMenuOpen, activeLight }) {
  return (
    <button
      className={`md:hidden p-2.5 rounded-lg transition-colors ${
        activeLight ? "hover:bg-slate-100" : "hover:bg-white/10"
      }`}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center relative">
        <span
          className={`block absolute w-6 h-0.5 transition-all duration-300 ${
            isMenuOpen 
              ? "rotate-45 bg-slate-700" 
              : `-translate-y-1.5 ${activeLight ? "bg-slate-700" : "bg-white"}`
          }`}
        ></span>
        <span
          className={`block absolute w-6 h-0.5 transition-all duration-300 ${
            isMenuOpen 
              ? "opacity-0 bg-slate-700" 
              : `opacity-100 ${activeLight ? "bg-slate-700" : "bg-white"}`
          }`}
        ></span>
        <span
          className={`block absolute w-6 h-0.5 transition-all duration-300 ${
            isMenuOpen 
              ? "-rotate-45 bg-slate-700" 
              : `translate-y-1.5 ${activeLight ? "bg-slate-700" : "bg-white"}`
          }`}
        ></span>
      </div>
    </button>
  );
}