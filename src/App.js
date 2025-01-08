import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";  // Exemple de page
import Profile from "./pages/Profile";  // Votre page de profil
import Home from "./pages/Home";  // Page d'accueil
import NotFound from "./pages/NotFound";  // Page 404

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} /> {/* Page 404 */}
      </Routes>
    </Router>
  );
};

export default App;
