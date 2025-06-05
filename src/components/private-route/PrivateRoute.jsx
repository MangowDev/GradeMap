import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, userRole }) => {
  const token = localStorage.getItem("auth_token");
  const location = useLocation();
  const userId = localStorage.getItem("user_id");
  const path = location.pathname.toLowerCase();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "student") {
    const allowedExactPaths = [
      "/home",
      `/user/edit/${userId}`,
      `/user/grades/${userId}`,
      "/unauthorized",
    ];

    const isExactAllowed = allowedExactPaths.includes(path);
    const isGradeReadPath = path.startsWith("/grade/read/");

    if (!isExactAllowed && !isGradeReadPath) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  if (userRole === "teacher") {
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
      `/user/edit/${userId}`,
    ];
    const isEditRoute = path.includes("/edit") || path.includes("/create");
    const allowedForTeacher = allowedEditPaths.some((allowedPath) =>
      path.startsWith(allowedPath)
    );

    if (isEditRoute && !allowedForTeacher) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
