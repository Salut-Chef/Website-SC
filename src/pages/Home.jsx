// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const recettes = [
    {
      image: "../../images/home/canard.jpg",
      titre: "Recette 1",
      description: "Découvrez notre première délicieuse recette"
    },
    {
      image: "../../images/home/orange.jpg",
      titre: "Recette 2",
      description: "Une recette simple et savoureuse"
    },
    {
      image: "../../images/home/bavette.jpg",
      titre: "Recette 3",
      description: "La recette qui va transformer votre cuisine"
    }
  ];
  return (
    <div>
      <Header />

      <div className="w-full h-[90vh] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full backdrop-blur-[10px] z-10"></div>
        <div className="w-full h-full">
          <img
            src="../../images/home/home_fire.JPG"
            alt="Test"
            className="w-full h-full object-cover object-left-center block"
          />
        </div>
        <h1 className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite text-shadow-lg font-[prenton-ultra-condensed] text-[10.5vw] text-center z-20">
          Salut Chef !
        </h1>
        <p className="absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite text-shadow-lg italic text-sm text-center z-20">
          Ici, une mini-révolution culinaire est en marche... Dans le monde des étudiants ! <br />
          Un objectif : t&apos;améliorer en cuisine en découvrant de superbes recettes adaptées à ton budget !
        </p>
        <Link
          to="/about"
          className="absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite font-[prenton-ultra-condensed] text-lg bg-[#d5074c] px-4 py-1 rounded-md transition-transform duration-500 ease-in-out shadow-sm hover:shadow-inset z-20"
        >
          En savoir +
        </Link>
      </div>


      <div className="homeContainer bg-framboise pt-[1em] pb-[2em]">
        <h2 className="text-left text-[4em] font-[prenton-ultra-condensed] text-customWhite ml-[0.6em]">
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
              className="bg-framboise hover:bg-framboise hover:scale-125 p-2 rounded-full duration-300"
            >
              &#10094;
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev < recettes.length - 1 ? prev + 1 : 0))}
              className="bg-framboise hover:bg-framboise hover:scale-125 p-2 rounded-full duration-300"
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

        <div className="flex justify-center items-center mt-28 mx-48 gap-12">
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="text-customWhite font-[prenton-ultra-condensed] text-4xl mt-1.5 underline">
              <i>Nos recettes</i>
            </h3>
            <br />
            <p className="text-[25px]">
              <i>
                « Et paf ! Ça fait des Chocapic ! » <br />
                De quoi vous métamorphoser en chef <br /> en quelques minutes !
              </i>
            </p>
          </div>
          <img
            src="../../images/home/canard.jpg"
            alt="Magret de canard"
            className="border-5 border-customWhite rounded-[10px] shadow-[4px_4px_2px_rgba(25,23,21,0.5)] max-w-full h-auto"
          />
        </div>

        <div className="flex justify-center items-center mt-28 mx-48 gap-12">
          <img
            src="../../images/home/bavette.jpg"
            alt="Bavette de boeuf"
            className="border-5 border-customWhite rounded-[10px] shadow-[4px_4px_2px_rgba(25,23,21,0.5)] max-w-full h-auto"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <h3 className="text-customWhite font-[prenton-ultra-condensed] text-4xl mt-1.5 underline">
              <i>Tips et Astuces</i>
            </h3>
            <br />
            <p className="text-[25px]">
              <i>
                « Elle est pas belle la vie ? » <br />
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