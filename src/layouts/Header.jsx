import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";  // Importer 'signOut'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Variable d'état pour l'utilisateur
  const [loading, setLoading] = useState(true); // Pour savoir si Firebase est prêt

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);  // L'utilisateur est chargé
    });

    // Nettoyer l'abonnement lorsque le composant est démonté
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)  // Déconnecter l'utilisateur
      .then(() => {
        console.log("Utilisateur déconnecté");
      })
      .catch((error) => {
        console.error("Erreur de déconnexion :", error.message);
      });
  };

  if (loading) {
    return <div>Chargement...</div>;  // Afficher un message de chargement
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-1.5 shadow-md bg-[#fcf7f7]">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <img
            src="../../public/images/Salut_Chef.png"
            alt="Logo Salut Chef"
            className="mr-3 h-10 sm:h-10"
          />

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link to="/about" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
              À propos
            </Link>
            <Link to="/recipes" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
              Nos recettes
            </Link>
            <Link to="/tips" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
              Tips et Astuces
            </Link>
            <Link to="/workshops" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
              Nos ateliers culinaires
            </Link>
            <Link to="/contact" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
              Contact
            </Link>

            {/* Afficher "Profil" si l'utilisateur est connecté */}
            {user ? (
              <Link to="/profile" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
                Profil
              </Link>
            ) : (
              <Link to="/loginsignup" className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c]">
                Se connecter / S'inscrire
              </Link>
            )}
          </div>

          <div className="flex items-center lg:order-2 hidden lg:flex">
            <Link to="/" className="text-white hover:bg-[#d5074c]">
              <img src="../../public/images/header/home.png" alt="Accueil" className="h-8 w-8" />
            </Link>
          </div>

          {/* Menu mobile */}
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Ouvrir le menu</span>
            <svg className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? "rotate-90" : ""}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <ul className="flex flex-col mt-4 space-y-4">
              <li>
                <Link to="/about" className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c]">À propos</Link>
              </li>
              <li>
                <Link to="/recipes" className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c]">Nos recettes</Link>
              </li>
              <li>
                <Link to="/profile" className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c]">Profil</Link>
              </li>
              <li>
                <Link to="/loginsignup" className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c]">Se connecter / S'inscrire</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
