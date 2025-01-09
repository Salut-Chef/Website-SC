import React, { useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import "../style/Recipes.css";

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState(""); 

  return (
    <div>
      <Header />
    <div className="recipes-page">

      {/* Menu container */}
      <div className="menu-container">
        <div className="menu-header">
          <h1 className="restaurant-name">Carte Gastronomique</h1>
          <p className="restaurant-subtitle">Découvrez nos délices raffinés</p>
        </div>

        {/* Barre de recherche globale pour toutes les catégories */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Rechercher une recette..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>

        {/* Sections */}
        <div className="menu-category">
          <h2 className="menu-title">Apéritifs</h2>
          <Carousel category="Apéro" searchTerm={searchTerm} />
        </div>
        <hr className="menu-divider" />
        <div className="menu-category">
          <h2 className="menu-title">Entrées</h2>
          <Carousel category="Entrée" searchTerm={searchTerm} />
        </div>
        <hr className="menu-divider" />
        <div className="menu-category">
          <h2 className="menu-title">Plats principaux</h2>
          <Carousel category="Plat" searchTerm={searchTerm} />
        </div>
        <hr className="menu-divider" />
        <div className="menu-category">
          <h2 className="menu-title">Desserts</h2>
          <Carousel category="Dessert" searchTerm={searchTerm} />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
}
