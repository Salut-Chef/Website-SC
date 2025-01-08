import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ category, searchTerm }) => {
  const items = {
    Apéro: [
      { name: "Olives", image: "../../public/images/recipes/Olives.jpg", description: "Des olives fraîches et savoureuses." },
      { name: "Chips maison", image: "/path/to/chips.jpg", description: "Des chips maison croustillantes." },
      { name: "Cocktail de crevettes", image: "/path/to/cocktail.jpg", description: "Un cocktail de crevettes délicieux." }
    ],
    Entrée: [
      { name: "Soupe de potiron", image: "/path/to/soupe.jpg", description: "Une soupe veloutée et crémeuse." },
      { name: "Salade de chèvre chaud", image: "/path/to/salade.jpg", description: "Une salade fraîche avec du fromage de chèvre chaud." },
      { name: "Foie gras poêlé", image: "/path/to/foie_gras.jpg", description: "Un foie gras poêlé accompagné d'une compote d'oignons." }
    ],
    Plat: [
      { name: "Filet de bœuf", image: "../../public/images/recipes/filet-normand.jpg", description: "Un filet de bœuf tendre, cuit à la perfection." },
      { name: "Saumon rôti", image: "/path/to/saumon.jpg", description: "Du saumon rôti avec une sauce au beurre blanc." },
      { name: "Poulet fermier rôti", image: "/path/to/poulet.jpg", description: "Un poulet fermier rôti, doré et savoureux." }
    ],
    Dessert: [
      { name: "Tarte au chocolat", image: "/path/to/tarte.jpg", description: "Une tarte au chocolat fondante." },
      { name: "Crème brûlée", image: "/path/to/creme_brulee.jpg", description: "Une crème brûlée onctueuse." },
      { name: "Macarons", image: "/path/to/macarons.jpg", description: "Des macarons délicats et sucrés." }
    ]
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtrage selon le terme de recherche global
  const filteredItems = items[category].filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextItem = () => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevItem = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredItems.length - 1);
    }
  };

  return (
    <div className="carousel">
      {/* Afficher un message si la recherche ne trouve aucun résultat */}
      {filteredItems.length === 0 && (
        <div className="no-results-message">
          <p>Aucune recette trouvée pour "{searchTerm}"</p>
        </div>
      )}

      <button
        onClick={prevItem}
        className="carousel-button carousel-button-left"
        aria-label="Recette précédente"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <div className="carousel-item">
        {filteredItems.length > 0 ? (
          <div className="carousel-content">
            <img
              src={filteredItems[currentIndex].image}
              alt={filteredItems[currentIndex].name}
              className="carousel-image"
            />
            <h3>{filteredItems[currentIndex].name}</h3>
            <p>{filteredItems[currentIndex].description}</p> {/* Affichage de la description */}
          </div>
        ) : (
          <h3>Aucune recette trouvée</h3>
        )}
      </div>

      <button
        onClick={nextItem}
        className="carousel-button carousel-button-right"
        aria-label="Recette suivante"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      <div className="carousel-indicator">
        {filteredItems.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
