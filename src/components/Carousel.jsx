import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ category, searchTerm }) => {
  const items = {
    Apéro: [
      { name: "Olives", image: "../../public/images/recipes/Olives.jpg", description: "Des olives fraîches et savoureuses." },
      { name: "Chips maison", image: "", description: "Des chips maison croustillantes." },
      { name: "Cocktail de crevettes", image: "", description: "Un cocktail de crevettes délicieux." }
    ],
    Entrée: [
      { name: "Soupe de potiron", image: "", description: "Une soupe veloutée et crémeuse." },
      { name: "Salade de chèvre chaud", image: "", description: "Une salade fraîche avec du fromage de chèvre chaud." },
      { name: "Foie gras poêlé", image: "", description: "Un foie gras poêlé accompagné d'une compote d'oignons." }
    ],
    Plat: [
      { name: "Filet de bœuf", image: "../../public/images/recipes/filet-normand.jpg", description: "Un filet de bœuf tendre, cuit à la perfection." },
      { name: "Saumon rôti", image: "", description: "Du saumon rôti avec une sauce au beurre blanc." },
      { name: "Poulet fermier rôti", image: "", description: "Un poulet fermier rôti, doré et savoureux." }
    ],
    Dessert: [
      { name: "Tarte au chocolat", image: "", description: "Une tarte au chocolat fondante." },
      { name: "Crème brûlée", image: "", description: "Une crème brûlée onctueuse." },
      { name: "Macarons", image: "", description: "Des macarons délicats et sucrés." }
    ]
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const filteredItems = items[category]?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const nextItem = () => {
    setActiveIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const prevItem = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {filteredItems.length === 0 ? (
        <div className="text-center p-4">
          <p>Aucune recette trouvée pour "{searchTerm}"</p>
        </div>
      ) : (
        <>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 relative ${index === activeIndex ? "scale-100 z-10" : "scale-90 opacity-50 z-0"
                  } transition-all duration-500`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[350px] object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white rounded-b-lg">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 left-2 right-2 flex justify-between transform -translate-y-1/2">
            <button
              onClick={prevItem}
              className="bg-[#fcf7f7] p-2 rounded-full"
              aria-label="Recette précédente"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              onClick={nextItem}
              className="bg-[#fcf7f7] p-2 rounded-full"
              aria-label="Recette suivante"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="flex justify-center mt-4">
            {filteredItems.map((_, index) => (
              <span
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 mx-1 rounded-full cursor-pointer ${index === activeIndex ? "bg-white w-8" : "bg-white/50 w-4"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
