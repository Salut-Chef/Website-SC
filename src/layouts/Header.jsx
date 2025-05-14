import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // @ts-ignore
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Utilisateur déconnecté");
      })
      .catch((error) => {
        console.error("Erreur de déconnexion :", error.message);
      });
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <header className="sticky top-0 z-50 ">
      <nav className="bg-customWhite border-gray-200 px-4 lg:px-6 py-1.5 shadow-md bg-customWhite">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            to="/"
          >
            <img
              src="/images/Salut_Chef.png"
              alt="Logo Salut Chef"
              className="mr-3 h-10 sm:h-10"
            />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link
              to="/about"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              À propos
            </Link>
            <Link
              to="/recipes"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Nos recettes
            </Link>
            <Link
              to="#"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Tips et Astuces
            </Link>
            <Link
              to="/contact"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center lg:order-2 hidden lg:flex">
            {/* Afficher "Profil" si l'utilisateur est connecté */}
            {user ? (
              <Link
                to="/profile"
                className="text-[#191715] text-[16px] mr-2 hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
              >
                <img
                  src="/images/header/user.png"
                  alt="Profil utilisateur"
                  className="h-8 sm:h-8"
                />
              </Link>
            ) : (
              <Link
                to="/loginsignup"
                className="text-[#191715] text-[16px] mr-2 hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
              >
                <img
                  src="/images/header/login.png"
                  alt="Connexion / Inscription"
                  className="h-8 sm:h-8"
                />
              </Link>
            )}

            <Link
              to="/"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-framboise focus:ring-4 focus:ring-framboise font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              <img src="../../images/header/home.png" alt="Accueil" className="h-8 w-8" />
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
                <Link to="/about" className="block py-2 px-4 text-[#191715] hover:bg-framboise">À propos</Link>
              </li>
              <li>
                <Link to="/recipes" className="block py-2 px-4 text-[#191715] hover:bg-framboise">Nos recettes</Link>
              </li>
              <li>
                {user ? (
                  <Link to="/profile" className="block py-2 px-4 text-[#191715] hover:bg-framboise">Profil</Link>
                ) : (
                  <Link to="/loginsignup" className="block py-2 px-4 text-[#191715] hover:bg-framboise">Se connecter / S'inscrire</Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
