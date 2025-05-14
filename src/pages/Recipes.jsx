import React, { useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ScrollToTop from "../components/ScrollToTop";
import TopButton from "../components/TopButton";

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Simuler un chargement (à retirer en production)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-customWhite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-framboise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-customWhite">
        <p className="text-center text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-customWhite text-customBlack font-bodyFont">
      <Header />
      <ScrollToTop />

      <main className="px-4 sm:px-6 md:px-10 py-8">
        <section className="max-w-5xl mx-auto bg-white p-4 sm:p-6 md:p-10 rounded-2xl shadow-shadowCustom">
          <div className="text-center mb-6">
            <h1 className="font-titleFont text-3xl sm:text-4xl">Nos Recettes</h1>
          </div>

          <div className="text-center mb-8">
            <input
              type="text"
              placeholder="Rechercher une recette..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-lg px-4 py-2 border border-framboise rounded-full shadow focus:outline-none focus:ring-2 focus:ring-framboise focus:border-transparent"
            />
          </div>

          <div className="mb-8">
            <h2 className="font-titleFont text-2xl sm:text-3xl text-center mb-4">Apéritifs</h2>
            <Carousel category="Apéro" searchTerm={searchTerm} />
          </div>

          <hr className="border-t-2 border-framboise my-6 mx-auto w-2/3 rounded-full shadow-md" />

          <div className="mb-8">
            <h2 className="font-titleFont text-2xl sm:text-3xl text-center mb-4">Entrées</h2>
            <Carousel category="Entrée" searchTerm={searchTerm} />
          </div>

          <hr className="border-t-2 border-framboise my-6 mx-auto w-2/3 rounded-full shadow-md" />

          <div className="mb-8">
            <h2 className="font-titleFont text-2xl sm:text-3xl text-center mb-4">Plats principaux</h2>
            <Carousel category="Plat" searchTerm={searchTerm} />
          </div>

          <hr className="border-t-2 border-framboise my-6 mx-auto w-2/3 rounded-full shadow-md" />

          <div>
            <h2 className="font-titleFont text-2xl sm:text-3xl text-center mb-4">Desserts</h2>
            <Carousel category="Dessert" searchTerm={searchTerm} />
          </div>
        </section>
      </main>

      <TopButton />
      <Footer />
    </div>
  );
};

export default Recipes;
