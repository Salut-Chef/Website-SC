import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
  if (!user) {
    navigate("/login");
    return null; // Empêche l'affichage avant la redirection
  }

  return (
    <div className="profile-container">
      <h1>Bienvenue sur votre profil</h1>
      <p>Email : {user.email}</p>
      <button
        onClick={() => {
          auth.signOut();
          navigate("/login");
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Profile;
