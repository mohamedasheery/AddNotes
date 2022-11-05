import React from "react";

import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  if (sessionStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
