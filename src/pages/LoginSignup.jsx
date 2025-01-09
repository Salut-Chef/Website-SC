import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";

const LoginSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Utilisateur connecté:", user);
      setIsAuthenticated(true);
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
      navigate("/");
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-lg rounded-lg p-6">
            {/* Tabs */}
            <div>
              <ul className="flex justify-center mb-6 border-b border-gray-200">
                <li className="mr-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      !isSignupMode
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => setIsSignupMode(false)}
                  >
                    Se connecter
                  </button>
                </li>
                <li>
                  <button
                    className={`px-4 py-2 text-sm font-medium ${
                      isSignupMode
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-500"
                    }`}
                    onClick={() => setIsSignupMode(true)}
                  >
                    S'inscrire
                  </button>
                </li>
              </ul>
            </div>

            {/* Form */}
            <div>
              {isAuthenticated ? (
                <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
                  Vous êtes maintenant connecté !
                </div>
              ) : (
                <form onSubmit={isSignupMode ? handleSignup : handleLogin}>
                  {error && (
                    <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
                      {error}
                    </div>
                  )}
                  <div className="mb-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      {isSignupMode ? "S'inscrire" : "Se connecter"}
                    </button>
                  </div>
                </form>
              )}

              {/* Toggle Message */}
              <div className="mt-4 text-center text-sm text-gray-600">
                {isSignupMode ? (
                  <p>
                    Vous avez déjà un compte ?{" "}
                    <button
                      onClick={() => setIsSignupMode(false)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Se connecter
                    </button>
                  </p>
                ) : (
                  <p>
                    Vous n'avez pas de compte ?{" "}
                    <button
                      onClick={() => setIsSignupMode(true)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      S'inscrire
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;