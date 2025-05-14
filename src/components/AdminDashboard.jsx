import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();

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
          <Typography variant="h4" color="white">Admin Dashboard</Typography>
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/statistiques" className="hover:text-customWhite">Statistiques</Link>
          </li>
          <li>
            <Link to="/admin/utilisateurs" className="hover:text-customWhite">Utilisateurs</Link>
          </li>
          <li>
            <Link to="/admin/recettes" className="hover:text-customWhite">Recettes</Link>
          </li>
          <li>
            <Link to="/admin/settings" className="hover:text-customWhite">Paramètres</Link>
          </li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <Typography variant="h5" color="black">Bienvenue, {user?.displayName || "Admin"}</Typography>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Typography variant="h6" color="black">Nombre d'Utilisateurs</Typography>
            <p className="text-3xl font-semibold mt-2">320</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Typography variant="h6" color="black">Recettes Soumises</Typography>
            <p className="text-3xl font-semibold mt-2">58</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Typography variant="h6" color="black">Commentaires</Typography>
            <p className="text-3xl font-semibold mt-2">127</p>
          </div>
        </div>

        {/* Tableau des utilisateurs */}
        <div className="mt-12">
          <Typography variant="h6" color="black">Liste des Utilisateurs</Typography>
          <table className="min-w-full mt-4">
            <thead>
              <tr className="bg-framboise text-white">
                <th className="py-2 px-4">Nom</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Rôle</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple d'utilisateur */}
              <tr className="border-b">
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">john@example.com</td>
                <td className="py-2 px-4">Utilisateur</td>
                <td className="py-2 px-4">
                  <button className="bg-framboise text-white py-1 px-4 rounded-md hover:bg-[#d5074c]">Modifier</button>
                </td>
              </tr>
              {/* Ajouter d'autres utilisateurs ici */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
