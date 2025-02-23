import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAuth, redirectTo }) => {
    if (!isAuth) return <Navigate to={redirectTo} replace />;
    return <Outlet />;
};

export const PublicRoute = ({ isAuth, redirectTo }) => {
    if (isAuth) return <Navigate to={redirectTo} replace />;
    return <Outlet />;
};
