"use client"

import { createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const AuthContext = createContext()

/**
 * Authentication Context Provider
 * Manages user login state with localStorage persistence
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("studyspot_user", null)

  // Simulate login - in real app this would validate credentials
  const login = (userData) => {
    const userWithId = {
      id: 1,
      name: userData.name || "Demo User",
      email: userData.email || "demo@studyspot.ph",
    }
    setUser(userWithId)
  }

  const logout = () => {
    setUser(null)
  }

  const isAuthenticated = !!user

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
