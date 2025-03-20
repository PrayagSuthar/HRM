// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const role = localStorage.getItem("role");

    if (!role) {
        return <Navigate to="/login" />;
    }

    return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
