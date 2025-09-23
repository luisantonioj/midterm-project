import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmModal from "../MyBookings/ConfirmModal"; 

export default function MobileNav({ isMenuOpen, setIsMenuOpen, user, login, logout, isScrolled, isSolidPage, location,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const activeLight = isScrolled || isSolidPage;

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleConfirmSignIn = () => {
    setShowSignInModal(false);
    login();
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleCancelSignIn = () => {
    setShowSignInModal(false);
  };

  const handleLogout = () => {
    setMenuOpen(false);
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    logout();
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
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
            to="/my-bookings"
            className={`px-4 py-3 rounded-lg transition-colors ${
              location.pathname.startsWith("/my-bookings")
                ? activeLight
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "bg-white/20 text-white font-medium"
                : activeLight
                ? "text-slate-700 hover:text-indigo-600 hover:bg-slate-50"
                : "text-white/90 hover:text-white hover:bg-white/10"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Bookings
          </Link>

          {!user ? (
            <button
              onClick={handleSignIn}
              className={`w-full text-left px-4 py-3 mt-2 rounded-lg transition-all duration-200 ${
                activeLight
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              }`}
            >
              Sign In
            </button>
          ) : (
            <div className="relative mt-3 px-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm ${
                  activeLight ? "bg-indigo-100 text-indigo-700" : "bg-white/20 text-white"
                }`}
              >
                {user.name?.charAt(0).toUpperCase()}
              </button>

              {menuOpen && (
                <div
                  className={`absolute left-4 mt-2 w-40 rounded-lg shadow-lg overflow-hidden z-20 ${
                    activeLight ? "bg-white" : "bg-slate-800"
                  }`}
                >
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-left px-4 py-2 text-sm ${
                      activeLight
                        ? "text-slate-700 hover:bg-slate-50"
                        : "text-white hover:bg-slate-700"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
          show={showSignInModal}
          onConfirm={handleConfirmSignIn}
          onCancel={handleCancelSignIn}
          title="Welcome to StudySpot PH!"
          message="Sign in to book study spaces and co-working spots. Your next productive session starts here."
      />

      <ConfirmModal
              show={showLogoutModal}
              onConfirm={handleConfirmLogout}
              onCancel={handleCancelLogout}
              title="Log Out"
              message="Are you sure you want to log out?"
            />
    </>
  );
}
