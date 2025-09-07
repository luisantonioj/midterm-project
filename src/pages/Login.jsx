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
        <h2 className="text-xl font-semibold">Simulated Login</h2>
        <p className="text-sm text-gray-600 mt-2">This project uses a simulated login for demonstration. Click login to continue.</p>
        <div className="mt-4">
          <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">Login as Demo User</button>
        </div>
      </div>
    </div>
  );
}
