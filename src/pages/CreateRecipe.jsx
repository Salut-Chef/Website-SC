import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    people: 1,
    ingredients: [{ name: "", quantity: 0, unit: "" }],
    timers: [{ type: "", time: 0, unit: "" }],
    steps: [""],
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = value;
    setFormData((prev) => ({ ...prev, [arrayName]: updatedArray }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = value;
    setFormData((prev) => ({ ...prev, steps: updatedSteps }));
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!imageFile) {
      alert("Veuillez ajouter une image.");
      setLoading(false);
      return;
    }

    try {
      const imagePath = `images/recettes/${Date.now()}_${imageFile.name}`;
      const imageRef = ref(storage, imagePath);

      await uploadBytes(imageRef, imageFile);

      const gsUrl = `gs://${storage.app.options.storageBucket}/${imagePath}`;

      await addDoc(collection(db, "recettes"), {
        ...formData,
        imagePath: gsUrl,
        created_at: Timestamp.now(),
      });

      alert("Recette ajoutée avec succès !");
      navigate("/admin");

    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-customWhite min-h-screen">
      <h2 className="text-3xl font-titleFont text-customBlack mb-6">Créer une nouvelle recette</h2>
      <form onSubmit={handleSubmit} className="space-y-4 font-bodyFont">
        {/* Les champs classiques */}
        <div>
          <label className="block">Titre</label>
          <input type="text" name="title" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label className="block">Catégorie</label>
          <input type="text" name="category" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label className="block">Nombre de personnes</label>
          <input type="number" name="people" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>

        {/* Image */}
        <div>
          <label className="block">Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
        </div>

        {/* Ingrédients */}
        <div>
          <label className="block">Ingrédients</label>
          {formData.ingredients.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" placeholder="Nom" className="border p-1 w-1/3" onChange={(e) => handleArrayChange("ingredients", idx, "name", e.target.value)} />
              <input type="number" placeholder="Quantité" className="border p-1 w-1/3" onChange={(e) => handleArrayChange("ingredients", idx, "quantity", e.target.value)} />
              <input type="text" placeholder="Unité" className="border p-1 w-1/3" onChange={(e) => handleArrayChange("ingredients", idx, "unit", e.target.value)} />
            </div>
          ))}
        </div>

        {/* Temps */}
        <div>
          <label className="block">Temps</label>
          {formData.timers.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input type="text" placeholder="Type" className="border p-1 w-1/3" onChange={(e) => handleArrayChange("timers", idx, "type", e.target.value)} />
              <input type="number" placeholder="Temps" className="border p-1 w-1/3" onChange={(e) => handleArrayChange("timers", idx, "time", e.target.value)} />
              <input type="text" placeholder="Unité" className="border p-1 w-1/3" onChange={(e) => handleArrayChange("timers", idx, "unit", e.target.value)} />
            </div>
          ))}
        </div>

        {/* Étapes */}
        <div>
          <label className="block">Étapes</label>
          {formData.steps.map((step, idx) => (
            <textarea key={idx} className="border p-2 w-full mb-2" placeholder={`Étape ${idx + 1}`} onChange={(e) => handleStepChange(idx, e.target.value)} />
          ))}
        </div>

        {/* Bouton submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-framboise text-white px-6 py-2 rounded-md shadow-[4px_4px_5px_rgba(25,23,21,0.75)] hover:bg-mandarine transition"
        >
          {loading ? "Ajout en cours..." : "Ajouter la recette"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
