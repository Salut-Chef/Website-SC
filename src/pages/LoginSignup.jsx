import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate pour la redirection
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig.js"; 
import "../style/loginsignup.css";

const LoginSignup = () => {
  const navigate = useNavigate(); // Hook de React Router pour la redirection
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Gestion de l'authentification
  const [isSignupMode, setIsSignupMode] = useState(false); // Etat pour changer entre connexion et inscription

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur connecté:", user);
      setIsAuthenticated(true);

      // Redirection vers la page d'accueil ou une autre page après la connexion
      navigate("/"); 
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError(err.message);
      setIsAuthenticated(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur créé:", user);
      // Optionnel : rediriger vers la page de connexion ou la page d'accueil après l'inscription
      navigate("/"); 
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError(err.message);
    }
  };

  return (
    <div className="login-signup-container">
      <h2>{isSignupMode ? "Créer un compte" : "Se connecter"}</h2>

      {isAuthenticated ? (
        <p style={{ color: 'green' }}>Vous êtes maintenant connecté !</p>
      ) : (
        <form onSubmit={isSignupMode ? handleSignup : handleLogin}>
          <div>
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">{isSignupMode ? "S'inscrire" : "Se connecter"}</button>
        </form>
      )}

      <div className="toggle">
        {isSignupMode ? (
          <p>
            Vous avez déjà un compte ?{" "}
            <button onClick={() => setIsSignupMode(false)}>Se connecter</button>
          </p>
        ) : (
          <p>
            Vous n'avez pas de compte ?{" "}
            <button onClick={() => setIsSignupMode(true)}>S'inscrire</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
