import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import Header from './components/Header';
import Home from './pages/Home';
import SpaceDetail from './pages/SpaceDetail';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
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
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}

export default App;