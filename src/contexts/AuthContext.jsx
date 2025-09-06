import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

/**
 * The AuthProvider stores a "user" object in localStorage under the key "studyspot_user".
 * It also exports isAuthenticated for convenience.
 * You may adapt login() to accept real credentials in the future.
 */
export function AuthProvider({ children }) {
  // store user or null
  const [user, setUser] = useLocalStorage("studyspot_user", null);

  const login = (email = "student@example.com", extra = {}) => {
    // normalize user shape so other code can rely on it
    const newUser = {
      id: 1,
      name: "Student User",
      email,
      ...extra,
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
