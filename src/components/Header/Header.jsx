import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import MobileMenuButton from "./MobileMenuButton";

export default function Header() {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      <div className="mx-auto px-10 py-0 sm:px-10 sm:py-2 lg:px-14 lg:py-2">
        <div className="flex justify-between items-center h-16">
          <Logo isScrolled={isScrolled} setIsMenuOpen={setIsMenuOpen} />

          <DesktopNav
            user={user}
            login={login}
            logout={logout}
            isScrolled={isScrolled}
            location={location}
          />

          <MobileMenuButton
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>

        <MobileNav
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
          login={login}
          logout={logout}
          isScrolled={isScrolled}
          location={location}
        />
      </div>
    </header>
  );
}