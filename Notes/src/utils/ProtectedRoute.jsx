import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../Helpers/auth";

const ProtectedRoute = ({ children }) => {

  // MUST CALL THE FUNCTION
  if (!isLoggedIn()) {  
    return <Navigate to="/login" replace />;
  }
  console.log(isLoggedIn());

  return children;  // MUST BE lowercase "children"
};

export default ProtectedRoute;

