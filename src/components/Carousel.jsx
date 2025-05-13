import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import PropTypes from 'prop-types';
import getImageFromStorage from '../utils/storage';
import { Link } from "react-router-dom";

const initialRecipe = {
  id: '',
  title: '',
  imageUrl: '',
  created_at: null,
  category: ''
};

const Carousel = ({ category, searchTerm }) => {
  const [items, setItems] = useState([initialRecipe]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const q = query(
          collection(db, "recettes"),
          where("category", "==", category)
        );

        const querySnapshot = await getDocs(q);
        const recettesData = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            let imageUrl = data.imageUrl || "";
            if (imageUrl && !imageUrl.startsWith("http")) {
              imageUrl = await getImageFromStorage(imageUrl);
            }

            return {
              id: doc.id,
              title: data.title || "",
              imageUrl,
              created_at: data.created_at?.toDate() || null,
              category: data.category || "",
            };
          })
        );

        // Tri côté client
        recettesData.sort((a, b) => b.created_at - a.created_at);

        setItems(recettesData);
        setError("");
      } catch (err) {
        console.error("Détails de l'erreur :", {
          message: err.message,
          code: err.code,
          stack: err.stack
        });
        setError("Une erreur est survenue lors du chargement des recettes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [category]);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextItem = () => {
    setActiveIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const prevItem = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[350px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-framboise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      {filteredItems.length === 0 ? (
        <div className="text-center p-4">
          <p>Aucune recette trouvée pour &quot;{searchTerm}&quot;</p>
        </div>
      ) : (
        <>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`w-full flex-shrink-0 relative ${index === activeIndex ? "scale-100 z-10" : "scale-90 opacity-50 z-0"
                  } transition-all duration-500 mt-5`}
              >
                <Link to={`/${item.id}`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-[350px] object-cover rounded-xl"
                  />
                </Link>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white rounded-b-lg">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length > 1 && (
            <>
              <div className="absolute top-1/2 left-2 right-2 flex justify-between transform -translate-y-1/2">
                <button
                  onClick={prevItem}
                  className="bg-framboise hover:bg-framboise hover:scale-125 p-2 rounded-full duration-300"
                >
                  &#10094;
                </button>
                <button
                  onClick={nextItem}
                  className="bg-framboise hover:bg-framboise hover:scale-125 p-2 rounded-full duration-300"
                >
                  &#10095;
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
        </>
      )}
    </div>
  );
};

Carousel.propTypes = {
  category: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired
};

export default Carousel; 