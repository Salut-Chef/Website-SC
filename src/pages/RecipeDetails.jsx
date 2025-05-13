import { doc, getDoc } from "firebase/firestore";
import Header from "../layouts/Header";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import getImageFromStorage from "../utils/storage";
import RecipeSteps from "../components/RecipeSteps";

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
    <div>
      <Header />
      <main className="p-[2em] bg-customWhite">
        <section id="recipe">
          <article>
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-[350px] object-cover opacity-50"
            />
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

              <h2 className="text-xl font-semibold mt-4 mb-2">Ingrédients</h2>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ing, index) => (
                  <li key={index}>
                    {ing.quantity} {ing.unit} {ing.name}
                  </li>
                ))}
              </ul>

              <RecipeSteps steps={recipe.steps} />

              <h2 className="text-xl font-semibold mt-4 mb-2">Temps</h2>
              <ul>
                {recipe.timers.map((timer, index) => (
                  <li key={index}>
                    {timer.type} : {timer.time} {timer.unit}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default RecipeDetails;
