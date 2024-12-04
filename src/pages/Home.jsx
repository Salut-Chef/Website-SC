import React, { useState } from "react";
import "../index.css";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import { Carousel } from "@material-tailwind/react";

const Home = () => {

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

        <Carousel
          // @ts-ignore
          Carousel
          className="rounded-xl"
          navigation={({ setActiveIndex, activeIndex, length }) => (
            <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
              {new Array(length).fill("").map((_, i) => (
                <span
                  key={i}
                  className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                    }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          )}
        >
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
