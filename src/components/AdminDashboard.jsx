import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getUsers");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des utilisateurs", err);
        setError("Une erreur est survenue lors de la récupération des utilisateurs.");
      } finally {
        setLoadingUsers(false);
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

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
            <Link to="/admin/utilisateurs" className="hover:text-customWhite">Utilisateurs</Link>
          </li>
          <li>
            <Link to="/admin/recettes" className="hover:text-customWhite">Recettes</Link>
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
            <p className="text-3xl font-semibold mt-2">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Typography variant="h6" color="black">Recettes Soumises</Typography>
            <p className="text-3xl font-semibold mt-2">58</p>
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
              {loadingUsers ? (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center">Chargement des utilisateurs...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center text-red-500">{error}</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.uid} className="border-b">
                    <td className="py-2 px-4">{user.displayName}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">
                      <button className="bg-framboise text-white py-1 px-4 rounded-md hover:bg-[#d5074c]">Modifier</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
