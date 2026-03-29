import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  try {
    const decoded = jwtDecode(token);

    // 🔐 Chỉ admin mới được vào
    if (decoded.role !== "admin") {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  } catch (err) {
    localStorage.removeItem("admin_token");
    return <Navigate to="/admin/login" replace />;
  }
}

export default PrivateRoute;
