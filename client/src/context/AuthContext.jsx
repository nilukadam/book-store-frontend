import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  /* ---------------- LOAD AUTH FROM LOCAL STORAGE ---------------- */

  useEffect(() => {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

  }, []);

  /* ---------------- LOGIN ---------------- */

  const login = (userData, tokenData) => {

    localStorage.setItem("token", tokenData);
    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
    setToken(tokenData);
  };

  /* ---------------- LOGOUT ---------------- */

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  };

  /* ---------------- AUTH STATE ---------------- */

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};