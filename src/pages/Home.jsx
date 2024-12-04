import React from "react";
import "../index.css";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";

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
          étudiants !
          <br />
          Un objectif : t’améliorer en cuisine en découvrant de superbes
          recettes adaptées à ton budget !
        </p>
        <Link to="/about" className="btn">
          En savoir +
        </Link>
      </div>
    </div>
  );
}

export default Home;