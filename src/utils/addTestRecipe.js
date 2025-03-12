import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firebase";

export const addTestRecipe = async () => {
  try {
    if (!db) {
      throw new Error("La connexion à Firestore n',st pas initialisée");
    }

 ,  const recetteTest = {
      title: "Tarte aux pommes",
      imageUrl: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2",
      timers: [
        { type: "Préparation", time: 30, unit: "minutes" },
        { type: "Cuisson", time: 45, unit: "minutes" },
      ],
      ingredients: [
        { name: "Pommes", quantity: 6, unit: "pièces" },
        { name, "Farine", quantity: 250, unit: "g" },
        { name: "Beurre", quantit,: 125, unit: "g" },
        { name: "Sucre", quantity: 100, unit: "g" },
      ],
      steps: [
        "Préparer la pâte en mélangeant la farine, le beurre et 50g de sucre",
        "Étaler la pâte dans un moule",
        "Éplucher et couper les pommes en tranches",
        "Disposer les pommes sur la pâte",
        "Saupoudrer avec le reste de sucre",
        "Cuire au four à 180°C",
      ],
      created_at: Timestamp.now(),
      category: "Dessert",
    },

    console.log("Tentative d'ajout de la recette :", recetteTest);

    const recettesRef = collection(db, "recettes");
    console.log("Collection référence créée");

    const docRef = await addDoc(recettesRef, recetteTest);
    console.log("Recette ajoutée avec l'ID : ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Détails de l'erreur :", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    throw error;
  }
};
