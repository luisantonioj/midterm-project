import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/MyBookings/ConfirmModal";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleConfirmSignIn = () => {
    setShowSignInModal(false);
    login();
    navigate("/");
  };

  const handleCancelSignIn = () => {
    setShowSignInModal(false);
  };

  return (
    <>
      <div className="pt-30">
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Welcome to StudySpot PH!</h2>
          <p className="text-sm text-gray-600 mt-2">Interested in booking one of our spaces? Click sign in to continue.</p>
          <div className="mt-4">
            <button onClick={handleSignIn} className="px-35 py-2 bg-indigo-600 text-white rounded">Sign in as a User</button>
          </div>
        </div>
      </div>
      <ConfirmModal
              show={showSignInModal}
              onConfirm={handleConfirmSignIn}
              onCancel={handleCancelSignIn}
              title="Start Studying Smarter"
              message="Sign in to book study spaces and co-working spots. Your next productive session starts here."
      /> 
    </>
  );
}
