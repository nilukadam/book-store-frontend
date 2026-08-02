import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  // Get current authenticated user
  const { user } = useAuth();

  // Redirect unauthenticated users to the login page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Restrict admin-only routes
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // User is authorized
  return children;
};

export default ProtectedRoute;