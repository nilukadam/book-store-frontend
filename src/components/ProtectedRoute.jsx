import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  /* -------------------- AUTH STATE -------------------- */
  const { isAuthenticated } = useAuth();

  /* -------------------- ACCESS CONTROL -------------------- */
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
