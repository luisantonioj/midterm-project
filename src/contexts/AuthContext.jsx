import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // simple simulated user object or null
  const [user, setUser] = useLocalStorage("studyspot_user", null);

  const login = (email = "student@example.com") => {
    // simulation: set a user
    setUser({ id: 1, name: "Student User", email });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
