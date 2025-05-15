import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-customWhite">
      <div className="w-full max-w-screen-xl mx-auto p-4 pt-5">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="../images/Salut_Chef.png" className="h-12" alt="Logo de Salut Chef !" />
          </div>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">A propos</Link>
            </li>
            <li>
              <Link to="/mentions" className="hover:underline me-4 md:me-6">Mentions légales</Link>
            </li>
            {/* <li>
              <Link to="#" className="hover:underline me-4 md:me-6">Licensing</Link>
            </li> */}
            <li>
              <Link to="/contact" className="hover:underline">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center">© 2023 Salut Chef ! Tous droits réservés.</span>
      </div>
    </footer>
  );
}

export default Footer;