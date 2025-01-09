import React, { useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Header />
      <div className="p-[2em] bg-customWhite">

        {/* Menu container */}
        <div className="max-w-[800px] mx-auto p-[2em] bg-customWhite border rounded-[15px] shadow-shadowCustom">
          <div className="menu-header">
            <h1 className="text-center font-titleFont text-4xl">Nos Recettes</h1>
          </div>

          {/* Barre de recherche globale pour toutes les catégories */}
          <div className="text-center my-[1em]">
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[35em] p-[0.5em] border border-framboise rounded-[15px] shadow-shadow focus:outline-none focus:ring-2 focus:ring-framboise focus:border-transparent"
            />
          </div>

          {/* Sections */}
          <div className="text-center py-[1em]">
            <h2 className="font-titleFont font text-3xl">Apéritifs</h2>
            <Carousel category="Apéro" searchTerm={searchTerm} />
          </div>

          <hr className="border-t-2 border-framboise my-4 mx-auto w-2/3 rounded-full shadow-md" />

          <div className="text-center py-[1em]">
            <h2 className="font-titleFont font text-3xl">Entrées</h2>
            <Carousel category="Entrée" searchTerm={searchTerm} />
          </div>

          <hr className="border-t-2 border-framboise my-4 mx-auto w-2/3 rounded-full shadow-md" />

          <div className="text-center py-[1em]">
            <h2 className="font-titleFont font text-3xl">Plats principaux</h2>
            <Carousel category="Plat" searchTerm={searchTerm} />
          </div>

          <hr className="border-t-2 border-framboise my-4 mx-auto w-2/3 rounded-full shadow-md" />

          <div className="text-center py-[1em]">
            <h2 className="font-titleFont font text-3xl">Desserts</h2>
            <Carousel category="Dessert" searchTerm={searchTerm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
