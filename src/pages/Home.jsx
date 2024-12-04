import React, { useState } from "react";
import "../index.css";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const images = [
    './canard.jpg',
    './orange.jpg',
    './bavette.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(1); // On commence par afficher l'image du centre

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

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
          Un objectif : t’améliorer en cuisine en découvrant de superbes
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

        <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto">
          <div className="transition-transform duration-700 ease-in-out transform">
            <img
              src={images[(currentIndex - 1 + images.length) % images.length]}
              alt="left-image"
              className="w-[300px] h-[300px] object-cover rounded-lg"
            />
          </div>

          <div className="transition-transform duration-700 ease-in-out transform">
            <img
              src={images[currentIndex]}
              alt="center-image"
              className="w-[350px] h-[350px] object-cover rounded-lg scale-110"
            />
          </div>

          <div className="transition-transform duration-700 ease-in-out transform">
            <img
              src={images[(currentIndex + 1) % images.length]}
              alt="right-image"
              className="w-[300px] h-[300px] object-cover rounded-lg"
            />
          </div>

          {/* Bouton précédent */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
            style={{ left: '-2em' }}
          >
            &#10094;
          </button>

          {/* Bouton suivant */}
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
            style={{ right: '-2em' }}
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
