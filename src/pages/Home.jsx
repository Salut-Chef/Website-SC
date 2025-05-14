import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import ScrollToTop from "../components/ScrollToTop";
import TopButton from "../components/TopButton";
import { collection, getDocs, query, orderBy, limit, doc, getDoc } from "firebase/firestore";
import getImageFromStorage from "../utils/storage";
import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

/**
 * @typedef {Object} Recette
 * @property {string} id
 * @property {string} titre
 * @property {string} description
 * @property {string} image
 */


const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  /** @type {[Recette[], Function]} */
  const [recettes, setRecettes] = useState([]);

  const { isAdmin, loading: authLoading } = useAuth();
  const [hasWelcomed, setHasWelcomed] = useState(false);

  useEffect(() => {
    const fetchLatestRecipes = async () => {
      try {
        const recettesRef = collection(db, "recettes");
        const q = query(recettesRef, orderBy("created_at", "desc"), limit(3));
        const querySnapshot = await getDocs(q);
        const recettesData = [];

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          let imageUrl = data.imageUrl || "";
          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = await getImageFromStorage(imageUrl);
          }
          recettesData.push({
            id: doc.id,
            titre: data.title || "Sans titre",
            description: data.description || "Aucune description",
            image: imageUrl,
          });
        }

        setRecettes(recettesData);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des recettes :", err);
        setError("Impossible de charger les recettes.");
        setLoading(false);
      }
    };

    fetchLatestRecipes();
  }, []);

  useEffect(() => {
    if (!authLoading && isAdmin && !hasWelcomed) {
      alert("Bienvenue administrateur 👑");
      setHasWelcomed(true);
    }
  }, [authLoading, isAdmin, hasWelcomed]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-framboise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <ScrollToTop />

      <div className="w-full h-[90vh] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full backdrop-blur-[10px] z-10"></div>
        <img
          src="../../images/home/home_fire.JPG"
          alt="Bannière"
          className="w-full h-full object-cover object-left-center block"
        />
        <h1 className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite text-shadow-lg font-[prenton-ultra-condensed] text-[10.5vw] text-center z-20">
          Salut Chef !
        </h1>
        <p className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite text-shadow-lg italic text-sm text-center z-20 px-4">
          Ici, une mini-révolution culinaire est en marche... Dans le monde des étudiants ! <br />
          Un objectif : t&apos;améliorer en cuisine en découvrant de superbes recettes adaptées à ton budget !
        </p>
        <Link
          to="/about"
          className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite font-[prenton-ultra-condensed] text-lg bg-[#d5074c] px-4 py-1 rounded-md transition-transform duration-500 ease-in-out hover:scale-125 z-20"
        >
          En savoir +
        </Link>
      </div>

      <div className="homeContainer bg-framboise pt-[1em] pb-[2em]">
        <h2 className="text-left text-[2.5em] md:text-[4em] font-[prenton-ultra-condensed] text-customWhite ml-[0.6em]">
          Nos dernières recettes
        </h2>

        <div className="relative w-full max-w-2xl mx-auto overflow-hidden px-2">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {recettes.map((recette, index) => (
              <div
                key={recette.id}
                className={`w-full flex-shrink-0 relative ${index === activeIndex ? "scale-100 z-10" : "scale-90 opacity-50 z-0"
                  } transition-all duration-500`}
              >
                <img
                  src={recette.image}
                  alt={`Recette ${index + 1}`}
                  className="w-full h-[350px] object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white rounded-b-lg">
                  <Typography variant="h5" color="white" className="text-lg">
                    {recette.titre}
                  </Typography>
                  <Typography variant="paragraph" color="white" className="text-sm">
                    {recette.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          {recettes.length > 1 && (
            <>
              <div className="absolute top-1/2 left-2 right-2 flex justify-between transform -translate-y-1/2">
                <button
                  onClick={() =>
                    setActiveIndex((prev) => (prev > 0 ? prev - 1 : recettes.length - 1))
                  }
                  className="bg-framboise hover:scale-125 p-2 rounded-full duration-300"
                >
                  &#10094;
                </button>
                <button
                  onClick={() =>
                    setActiveIndex((prev) => (prev < recettes.length - 1 ? prev + 1 : 0))
                  }
                  className="bg-framboise hover:scale-125 p-2 rounded-full duration-300"
                >
                  &#10095;
                </button>
              </div>

              <div className="flex justify-center mt-4">
                {recettes.map((_, index) => (
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

        <div className="flex flex-col lg:flex-row justify-center items-center mt-28 mx-4 lg:mx-48 gap-8 lg:gap-12">
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="text-customWhite font-[prenton-ultra-condensed] text-3xl lg:text-4xl underline">
              <i>Nos recettes</i>
            </h3>
            <p className="text-[20px] lg:text-[25px] mt-4 px-2">
              <i>
                « Et paf ! Ça fait des Chocapic ! » <br />
                De quoi vous métamorphoser en chef <br /> en quelques minutes !
              </i>
            </p>
          </div>
          <img
            src="../../images/home/canard.jpg"
            alt="Magret de canard"
            className="border-4 border-customWhite rounded-[10px] shadow-lg max-w-full h-auto"
          />
        </div>

        <div className="flex flex-col-reverse lg:flex-row justify-center items-center mt-28 mx-4 lg:mx-48 gap-8 lg:gap-12">
          <img
            src="../../images/home/bavette.jpg"
            alt="Bavette de boeuf"
            className="border-4 border-customWhite rounded-[10px] shadow-lg max-w-full h-auto"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="text-customWhite font-[prenton-ultra-condensed] text-3xl lg:text-4xl underline">
              <i>Tips et Astuces</i>
            </h3>
            <p className="text-[20px] lg:text-[25px] mt-4 px-2">
              <i>
                « Elle est pas belle la vie ? » <br />
                Un concentré d’astuces et de conseils <br /> en tous genres disponibles au même endroit !
              </i>
            </p>
          </div>
        </div>
      </div>

      <TopButton />
      <Footer />
    </div>
  );
};

export default Home;
