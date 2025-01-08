import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <Link
              to="/about"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c] focus:ring-4 focus:ring-[#d5074c] font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              À propos
            </Link>
            <Link
              to="/recipes"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c] focus:ring-4 focus:ring-[#d5074c] font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Nos recettes
            </Link>
            <Link
              to="/tips"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c] focus:ring-4 focus:ring-[#d5074c] font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Tips et Astuces
            </Link>
            <Link
              to="/workshops"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c] focus:ring-4 focus:ring-[#d5074c] font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Nos ateliers culinaires
            </Link>
            <Link
              to="/contact"
              className="text-[#191715] text-[16px] hover:text-white hover:bg-[#d5074c] focus:ring-4 focus:ring-[#d5074c] font-medium rounded-lg px-4 py-2 transition duration-500 ease-in-out"
            >
              Contact
            </Link>
          </div>

          {/* Boutons Rechercher et Accueil */}
          <div className="flex items-center lg:order-2 hidden lg:flex">
            <Link
              to="#"
              className="text-gray-800 hover:bg-[#d5074c] focus:ring-4 focus:ring-gray-300 font-medium rounded-full h-12 w-12 flex items-center justify-center transition duration-500 ease-in-out"
            >
              <img
                src="../../public/images/header/search.png"
                alt="Rechercher"
                className="h-8 w-8"
              />
            </Link>
            <Link
              to="/"
              className="text-white hover:bg-[#d5074c] focus:ring-4 focus:ring-red-300 font-medium rounded-full h-12 w-12 flex items-center justify-center ml-3 transition duration-500 ease-in-out"
            >
              <img
                src="../../public/images/header/home.png"
                alt="Accueil"
                className="h-8 w-8"
              />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Ouvrir le menu principal</span>
            <svg
              className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? "rotate-90" : ""
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <ul className="flex flex-col mt-4 space-y-4">
              <li>
                <Link
                  to="/about"
                  className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to="/recipes"
                  className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  Nos recettes
                </Link>
              </li>
              <li>
                <Link
                  to="/workshops"
                  className="block py-2 px-4 text-[#191715] hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  Nos ateliers culinaires
                </Link>
              </li>
              <li>
                <Link
                  to="/tips"
                  className="block py-2 px-4 text-gray-800 hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  Tips et Astuces
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 px-4 text-gray-800 hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  Contact
                </Link>
              </li>
              {/* Ajout des liens Rechercher et Accueil */}
              <li>
                <Link
                  to="#"
                  className="block py-2 px-4 text-gray-800 hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  <img
                    src="../../public/search.png"
                    alt="Rechercher"
                    className="h-6 w-6 inline-block mr-2"
                  />
                  Rechercher
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 px-4 text-gray-800 hover:bg-[#d5074c] hover:text-white rounded-lg"
                >
                  <img
                    src="../../public/home.png"
                    alt="Accueil"
                    className="h-6 w-6 inline-block mr-2"
                  />
                  Accueil
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
