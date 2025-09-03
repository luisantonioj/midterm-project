import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SpaceDetail from "./pages/SpaceDetail";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Header from "./components/Header";
import ProtectedRoute from "./utils/protectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/space/:spaceId" element={<SpaceDetail />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/my-bookings"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
