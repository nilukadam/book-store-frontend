import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {

  /* -------------------- AUTH STATE -------------------- */
  const { user } = useAuth();

  /* -------------------- ACCESS CONTROL -------------------- */

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;

};

export default ProtectedRoute;