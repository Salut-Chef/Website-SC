import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../config/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      const fetchUsers = async () => {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersList);
      };

      const fetchRecipes = async () => {
        const recipesCollection = collection(db, "recettes");
        const recipesSnapshot = await getDocs(recipesCollection);
        const recipesList = recipesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecipes(recipesList);
      };

      fetchUsers();
      fetchRecipes();
      setLoading(false);
    }
  }, [isAdmin]);

  const handleDeleteRecipe = async (id) => {
    try {
      // Supprimer la recette dans Firestore
      const recipeDoc = doc(db, "recettes", id);
      await deleteDoc(recipeDoc);

      // Mettre à jour l'état local des recettes pour refléter la suppression
      setRecipes(recipes.filter(recipe => recipe.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de la recette : ", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-500 text-lg">Vous n'avez pas accès à ce tableau de bord.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Menu latéral */}
      <div className="w-64 h-screen bg-framboise text-white p-6">
        <div className="text-center mb-6">
          <Typography variant="h4" color="white" className="font-titleFont">
            Admin Dashboard
          </Typography>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-customWhite">Accueil Site</Link>
          </li>
          <li>
            <Link to="/admin" className="hover:text-customWhite">Accueil Admin</Link>
          </li>
          <li>
            <Link to="/admin/utilisateurs" className="hover:text-customWhite">Utilisateurs</Link>
          </li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <Typography variant="h5" color="black" className="font-titleFont">
            Bienvenue, {user?.displayName || "Admin"}
          </Typography>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Typography variant="h6" color="black" className="font-titleFont">
              Nombre d'Utilisateurs
            </Typography>
            <p className="text-3xl font-semibold mt-2">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Typography variant="h6" color="black" className="font-titleFont">
              Recettes Soumises
            </Typography>
            <p className="text-3xl font-semibold mt-2">{recipes.length}</p>
          </div>
        </div>

        {/* Tableau des recettes */}
        <div className="mt-12">
          <div className="mt-12 flex justify-between items-center">
            <Typography variant="h6" color="black" className="font-titleFont">
              Liste des Recettes
            </Typography>
            <button
              onClick={() => navigate('/admin/create')}
              className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 hover:shadow-[4px_4px_5px_0_rgba(0,0,0,0.75)] transition-shadow"
            >
              Créer
            </button>
          </div>
          <table className="min-w-full mt-4">
            <thead>
              <tr className="bg-framboise text-white">
                <th className="py-2 px-4 text-center">Titre</th>
                <th className="py-2 px-4 text-center">Catégorie</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 text-center">{recipe.title}</td>
                  <td className="py-2 px-4 text-center">{recipe.category}</td>
                  <td className="py-2 px-4 text-center">
                    <Link to={`/${recipe.id}`}>
                      <button className="bg-framboise text-white py-1 px-4 rounded-md hover:bg-[#d5074c] mx-auto hover:shadow-[4px_4px_5px_0_rgba(0,0,0,0.75)] transition-shadow">
                        Voir
                      </button>
                    </Link>
                    {/* Bouton de suppression */}
                    <button
                      onClick={() => handleDeleteRecipe(recipe.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 ml-2 hover:shadow-[4px_4px_5px_0_rgba(0,0,0,0.75)] transition-shadow"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
