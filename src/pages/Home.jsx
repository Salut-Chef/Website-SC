// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../style/index.css";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const recettes = [
    {
      image: "./canard.jpg",
      titre: "Recette 1",
      description: "Découvrez notre première délicieuse recette"
    },
    {
      image: "./orange.jpg",
      titre: "Recette 2",
      description: "Une recette simple et savoureuse"
    },
    {
      image: "./bavette.jpg",
      titre: "Recette 3",
      description: "La recette qui va transformer votre cuisine"
    }
  ];
  return (
    <div>
      <Header />

      <div className="landingPage">
        <div className="landingOverlay"></div>
        <div className="landingImage">
          <img src="../../public/home_fire.JPG" alt="Test" />
        </div>
        <h1>Salut Chef !</h1>
        <p>
          Ici, une mini-révolution culinaire est en marche... Dans le monde des
          étudiants ! <br />
          Un objectif : t&apos;améliorer en cuisine en découvrant de superbes
          recettes adaptées à ton budget !
        </p>
        <Link to="/about" className="btn">
          En savoir +
        </Link>
      </div>

      <div className="homeContainer bg-[#d5074c] pt-[1em]">
        <h2 className="text-[4em] font-[prenton-ultra-condensed] text-[#fcf7f7] ml-[0.6em]">
          Nos dernières recettes
        </h2>

        <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {recettes.map((recette, index) => (
              <div
                key={index}
                className={`w-full flex-shrink-0 relative ${index === activeIndex
                  ? "scale-100 z-10"
                  : "scale-90 opacity-50 z-0"
                  } transition-all duration-500`}
              >
                <img
                  src={recette.image}
                  alt={`Recette ${index + 1}`}
                  className="w-full h-[350px] object-cover rounded-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white rounded-b-lg">
                  <Typography
                    // @ts-ignore
                    Typography variant="h5" color="white" className="text-lg">
                    {recette.titre}
                  </Typography>
                  <Typography
                    // @ts-ignore
                    Typography variant="paragraph" color="white" className="text-sm">
                    {recette.description}
                  </Typography>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 left-2 right-2 flex justify-between transform -translate-y-1/2">
            <button
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : recettes.length - 1))}
              className="bg-[#fcf7f7] p-2 rounded-full"
            >
              &#10094;
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev < recettes.length - 1 ? prev + 1 : 0))}
              className="bg-[#fcf7f7] p-2 rounded-full"
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
        </div>

        <div className="recipes">
          <div className="recipesPres">
            <h3>
              <i>Nos recettes</i>
            </h3>
            <br />
            <p>
              <i>
                « Et paf ! Ça fait des Chocapic ! »
                <br />
                De quoi vous métamorphoser en chef <br /> en quelques minutes !
              </i>
            </p>
          </div>
          <img src="../../public/canard.jpg" alt="Magret de canard" />
        </div>

        <div className="tips">
          <img src="../../public/bavette.jpg" alt="Bavette de boeuf" />
          <div className="tipsPres">
            <h3><i>Tips et Astuces</i></h3>
            <br />
            <p>
              <i>
                « Elle est pas belle la vie ? »
                <br />
                Un concentré d’astuces et de conseils <br /> en tous genres
                disponibles au même endroit !
              </i>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;