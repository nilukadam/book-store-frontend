import { useCallback } from "react";

const AUTH_KEYS = {
  IS_LOGGED_IN: "isLoggedIn",
  USER: "user",
  AUTH_USER: "authUser",
};

export const useAuth = () => {
  const isAuthenticated =
    localStorage.getItem(AUTH_KEYS.IS_LOGGED_IN) === "true";

  const user = JSON.parse(localStorage.getItem(AUTH_KEYS.USER));

  const login = useCallback((userData) => {
    localStorage.setItem(AUTH_KEYS.USER, JSON.stringify(userData));
    localStorage.setItem(AUTH_KEYS.AUTH_USER, JSON.stringify({ email: userData.email }));
    localStorage.setItem(AUTH_KEYS.IS_LOGGED_IN, "true");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEYS.IS_LOGGED_IN);
    localStorage.removeItem(AUTH_KEYS.USER);
    localStorage.removeItem(AUTH_KEYS.AUTH_USER);
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
