import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase.js";
import Header from "../layouts/Header";
import ScrollToTop from "../components/ScrollToTop.jsx";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // @ts-ignore
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <ScrollToTop />

      <div className="profile-container">
        <h1>Bienvenue sur votre profil</h1>
        <p>Email : {user.
          // @ts-ignore
          email}</p>
        <button
          onClick={() => {
            signOut(auth)
              .then(() => {
                navigate("/");
              })
              .catch((error) => {
                console.error("Erreur de déconnexion :", error.message);
              });

          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Profile;
