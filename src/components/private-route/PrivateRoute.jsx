import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, userRole }) => {
  const token = localStorage.getItem("auth_token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "teacher") {
    const path = location.pathname.toLowerCase();
    const allowedEditPaths = [
      "/grades",
      "/grades/create",
      "/grade/edit",
      "/classrooms",
      "/classrooms/create",
      "/classroom/edit",
      "/subjects",
      "/subjects/create",
      "/subject/edit",
    ];
    const isEditRoute = path.includes("/edit") || path.includes("/create");
    const allowedForProf = allowedEditPaths.some((allowedPath) =>
      path.startsWith(allowedPath)
    );

    if (isEditRoute && !allowedForProf) {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
