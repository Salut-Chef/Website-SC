import { doc, getDoc } from "firebase/firestore";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ScrollToTop from "../components/ScrollToTop";
import TopButton from "../components/TopButton";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import getImageFromStorage from "../utils/storage";
import RecipeSteps from "../components/RecipeSteps";
import { FaClock, FaCarrot, FaUtensils, FaUserFriends } from "react-icons/fa";

const initialRecipe = {
  id: '',
  title: '',
  imageUrl: '',
  timers: [{ type: '', time: 0, unit: '' }],
  ingredients: [{ name: '', quantity: 0, unit: '' }],
  steps: [''],
  created_at: null,
  category: '',
  people: ''
};

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(initialRecipe);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recettes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          let imageUrl = data.imageUrl || "";
          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = await getImageFromStorage(imageUrl);
          }

          setRecipe({
            id: docSnap.id,
            title: data.title || "",
            imageUrl,
            timers: data.timers || [{ type: "", time: 0, unit: "" }],
            ingredients: data.ingredients || [{ name: "", quantity: 0, unit: "" }],
            steps: data.steps || [""],
            created_at: data.created_at?.toDate() || null,
            category: data.category || "",
            people: data.people || 0,
          });
          setError("");
        } else {
          setError("Recette introuvable.");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la recette :", err);
        setError("Une erreur est survenue lors du chargement de la recette.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-framboise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">{error}</div>
    );
  }

  return (
    <div className="bg-customWhite min-h-screen text-customBlack font-bodyFont">
      <Header />
      <ScrollToTop />

      <main className="p-4 md:p-8 lg:p-12">
        <section id="recipe">
          <article className="space-y-8">
            {/* Image et titre */}
            <div className="relative w-full h-[250px] md:h-[350px] shadow-lg rounded-lg overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 w-full h-full backdrop-blur-[3px] bg-black bg-opacity-30 z-10"></div>
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite font-titleFont text-2xl md:text-4xl lg:text-5xl text-center z-20">
                {recipe.title}
              </h1>
            </div>

            {/* Informations */}
            <div className="p-2 md:p-4 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-center gap-6 md:gap-8">
                {/* Nombre de personnes */}
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="flex justify-center md:justify-start items-center gap-2 text-lg md:text-xl font-semibold text-framboise">
                    <FaUserFriends className="text-mandarine" />
                    Personnes
                  </h2>
                  <p>Pour <b>{recipe.people}</b> personnes</p>
                </div>

                {/* Temps */}
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="flex justify-center md:justify-start items-center gap-2 text-lg md:text-xl font-semibold text-framboise">
                    <FaClock className="text-citron" />
                    Temps
                  </h2>
                  <ul className="space-y-1">
                    {recipe.timers.map((timer, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {timer.type} : {timer.time} {timer.unit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingrédients */}
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="flex justify-center md:justify-start items-center gap-2 text-lg md:text-xl font-semibold text-framboise">
                    <FaCarrot className="text-mandarine" />
                    Ingrédients
                  </h2>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {ing.quantity} {ing.unit} {ing.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Étapes de la recette */}
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold text-framboise">
                  <FaUtensils className="text-citron" />
                  Description
                </h2>
                <RecipeSteps steps={recipe.steps} />
              </div>
            </div>
          </article>
        </section>

        <TopButton />
        <Footer />
      </main>
    </div>
  );
}

export default RecipeDetails;
