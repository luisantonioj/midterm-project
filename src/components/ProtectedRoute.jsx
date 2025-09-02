"use client"
import { useAuth } from "../contexts/AuthContext"

/**
 * Protected Route Component
 * Redirects unauthenticated users to login
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
          <a href="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Go to Homepage
          </a>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute
