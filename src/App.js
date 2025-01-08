import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import { getAuth } from "firebase/auth";

const App = () => {
  const auth = getAuth();

  // Fonction pour vérifier si l'utilisateur est connecté
  const isAuthenticated = !!auth.currentUser;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
