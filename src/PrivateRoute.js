import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If there's a token, render the children (UsersPage in this case)
  return children;
};

export default PrivateRoute;
