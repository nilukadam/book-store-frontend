import { Children } from "react";
import { Navigate, replace } from "react-router-dom";

const ProtectedRoute =({ Children}) => {
    const isAuthenticated = localStorage.getItem('user');

    if (!isAuthenticated) {
        return <Navigate to="login" replace/>
    }

    return Children;
}

export default ProtectedRoute;