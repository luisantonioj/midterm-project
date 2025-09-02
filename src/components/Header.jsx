import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">StudySpot PH</Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard/my-bookings" className="hover:underline">Dashboard</Link>
              <button onClick={logout} className="hover:underline">Logout</button>
              <span>Hello, {user.name}</span>
            </>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}