// src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("astroUserId");

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;