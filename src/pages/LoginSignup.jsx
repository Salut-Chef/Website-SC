import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ParticleBackground from "../components/Particle.tsx";
import ScrollToTop from "../components/ScrollToTop.jsx";

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <ScrollToTop />
      <ParticleBackground />

      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg p-8">
            <div>
              <ul className="flex justify-center mb-6 border-b border-gray-200">
                <li className="mr-4">
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${!isSignupMode
                      ? "text-[#E76F51] border-b-2 border-[#E76F51]"
                      : "text-gray-500 hover:text-[#E76F51]"
                      }`}
                    onClick={() => setIsSignupMode(false)}
                  >
                    Se connecter
                  </button>
                </li>
                <li>
                  <button
                    className={`px-4 py-2 text-sm font-medium transition-colors ${isSignupMode
                      ? "text-[#E76F51] border-b-2 border-[#E76F51]"
                      : "text-gray-500 hover:text-[#E76F51]"
                      }`}
                    onClick={() => setIsSignupMode(true)}
                  >
                    S'inscrire
                  </button>
                </li>
              </ul>
            </div>

            <div>
              {isAuthenticated ? (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                  Vous êtes maintenant connecté !
                </div>
              ) : (
                <form onSubmit={isSignupMode ? handleSignup : handleLogin}>
                  {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
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
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#E76F51] transition-all"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#E76F51] transition-all"
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#E76F51] text-white rounded-lg hover:bg-[#e85d3b] transition-colors"
                    >
                      {isSignupMode ? "S'inscrire" : "Se connecter"}
                    </button>
                  </div>
                </form>
              )}

              <div className="mt-6 text-center text-sm text-gray-600">
                {isSignupMode ? (
                  <p>
                    Vous avez déjà un compte ?{" "}
                    <button
                      onClick={() => setIsSignupMode(false)}
                      className="text-[#E76F51] hover:text-[#e85d3b] transition-colors"
                    >
                      Se connecter
                    </button>
                  </p>
                ) : (
                  <p>
                    Vous n'avez pas de compte ?{" "}
                    <button
                      onClick={() => setIsSignupMode(true)}
                      className="text-[#E76F51] hover:text-[#e85d3b] transition-colors"
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

      <div className="relative z-10 bg-white w-full">
        <Footer />
      </div>
    </div>
  );
};

export default LoginSignup;