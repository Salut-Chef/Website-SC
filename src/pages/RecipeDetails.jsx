import { doc, getDoc } from "firebase/firestore";
import Header from "../layouts/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import getImageFromStorage from "../utils/storage";
import RecipeSteps from "../components/RecipeSteps";
import { FaClock, FaCarrot, FaUtensils } from "react-icons/fa";

const initialRecipe = {
  id: '',
  title: '',
  imageUrl: '',
  timers: [{ type: '', time: 0, unit: '' }],
  ingredients: [{ name: '', quantity: 0, unit: '' }],
  steps: [''],
  created_at: null,
  category: ''
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
      <div className="flex justify-center items-center h-screen">
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
    <div className="bg-customWhite min-h-screen text-customBlack font-bodyFont">
      <Header />
      <main className="p-6 md:p-12">
        <section id="recipe">
          <article className="space-y-8">
            <div className="relative w-full h-[350px] shadow-lg rounded-lg overflow-hidden">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 w-full h-full backdrop-blur-[3px] bg-black bg-opacity-30 z-10"></div>
              <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-customWhite font-titleFont text-3xl md:text-5xl text-center z-20">
                {recipe.title}
              </h1>
            </div>

            <div className="p-4 space-y-6">
              {/* Temps de préparation */}
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-framboise">
                  <FaClock className="text-citron" />
                  Temps
                </h2>
                <ul className="list-none space-y-1">
                  {recipe.timers.map((timer, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {timer.type} : {timer.time} {timer.unit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingrédients */}
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-framboise">
                  <FaCarrot className="text-mandarine" />
                  Ingrédients
                </h2>
                <ul className="list-none space-y-1">
                  {recipe.ingredients.map((ing, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {ing.quantity} {ing.unit} {ing.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Étapes de la recette */}
              <div className="space-y-2">
                <h2 className="flex items-center gap-2 text-xl font-semibold text-framboise">
                  <FaUtensils className="text-citron" />
                  Étapes
                </h2>
                <RecipeSteps steps={recipe.steps} />
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default RecipeDetails;
