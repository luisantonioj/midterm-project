import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, login, logout } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">StudySpot PH</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/dashboard/my-bookings" className="hover:underline">My Bookings</Link>
          {user ? (
            <>
              <span className="text-sm">Hi, {user.name}</span>
              <button onClick={logout} className="ml-2 px-3 py-1 border rounded">Logout</button>
            </>
          ) : (
            <button onClick={() => login()} className="px-3 py-1 bg-blue-600 text-white rounded">Simulate Login</button>
          )}
        </nav>
      </div>
    </header>
  );
}
