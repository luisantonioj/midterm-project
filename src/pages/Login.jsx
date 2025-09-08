import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard/my-bookings");
  };

  return (
    <div className="pt-30">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold">Welcome, user!</h2>
        <p className="text-sm text-gray-600 mt-2">Interested in booking one of our spaces? Click sign in to continue.</p>
        <div className="mt-4">
          <button onClick={handleLogin} className="px-35 py-2 bg-indigo-600 text-white rounded">Sign in as a User</button>
        </div>
      </div>
    </div>
  );
}
