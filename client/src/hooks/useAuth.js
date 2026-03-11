import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/*
  Custom Hook: useAuth

  Purpose:
  Provides easy access to authentication state
  and functions stored inside AuthContext.

  This allows any component to access:
  - user
  - login()
  - logout()

  without importing AuthContext directly.
*/

export const useAuth = () => {
  return useContext(AuthContext);
};