import React from "react";
import { Link } from "react-router-dom";

export default function Logo({ isScrolled, setIsMenuOpen }) {
  return (
    <Link
      to="/"
      onClick={() => setIsMenuOpen(false)}
      className="flex items-center space-x-3 group"
    >
      <div className="flex flex-col">
        <span
          className={`text-2xl font-bold tracking-tight ${
            isScrolled ? "gradient-text" : "text-white"
          }`}
        >
          StudySpot PH
        </span>
      </div>
    </Link>
  );
}
