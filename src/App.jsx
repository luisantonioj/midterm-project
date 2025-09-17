import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SpaceDetail from "./pages/SpaceDetail";
import Bookings from "./pages/MyBookings";
import Login from "./pages/Login";
import Header from "./components/Header/Header";
import ProtectedRoute from "./utils/protectedRoute";
import { BookingProvider } from "./contexts/BookingContext";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Header />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space/:spaceId" element={<SpaceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/my-bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </BookingProvider>
  );
}
