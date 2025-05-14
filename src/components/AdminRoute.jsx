import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <p>Chargement...</p>;
  return isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;