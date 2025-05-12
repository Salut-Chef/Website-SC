import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import getImageFromStorage from "../utils/storage";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const collection = doc(db, "recettes", id);
        const collecSnap = await getDoc(collection);

        if (collecSnap.exists()) {
          const data = collecSnap.data();
          let imageUrl = data.imageUrl || "";
          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = await getImageFromStorage(imageUrl);
          }

          setRecipe({ ...data, imageUrl });
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
    <>
      <main>

      </main>
    </>
  )
}

export default RecipeDetails