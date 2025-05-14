import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ScrollToTop from "../components/ScrollToTop";
import TopButton from "../components/TopButton";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        setNewEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    }, (err) => {
      setLoading(false);
      setError("Erreur lors de la récupération des données utilisateur.");
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdate = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      if (newEmail !== user.email) {
        await updateEmail(user, newEmail);
      }
      if (newPassword.length > 5) {
        await updatePassword(user, newPassword);
      }
      setSuccessMsg("Informations mises à jour avec succès.");
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      setErrorMsg("Erreur lors de la déconnexion : " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-customWhite">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-framboise"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-customWhite">
        <p className="text-center text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-customWhite text-customBlack font-bodyFont min-h-screen flex flex-col">
      <Header />
      <ScrollToTop />
      <main className="flex-grow px-4 py-10 flex justify-center items-center">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-shadowCustom p-6 sm:p-10">
          <h1 className="text-3xl font-titleFont mb-6 text-center">Mon Profil</h1>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Adresse Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-framboise rounded-xl focus:outline-none focus:ring-2 focus:ring-framboise"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Nouveau mot de passe</label>
              <input
                type="password"
                placeholder="Laissez vide pour ne pas changer"
                className="w-full px-4 py-2 border border-framboise rounded-xl focus:outline-none focus:ring-2 focus:ring-framboise"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {successMsg && <p className="text-green-600">{successMsg}</p>}
            {errorMsg && <p className="text-red-600">{errorMsg}</p>}

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
              <button
                onClick={handleUpdate}
                className="bg-framboise text-white py-2 px-6 rounded-xl shadow hover:bg-pink-700 transition"
              >
                Sauvegarder les modifications
              </button>

              <button
                onClick={handleLogout}
                className="bg-gray-300 text-customBlack py-2 px-6 rounded-xl shadow hover:bg-gray-400 transition"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </main>
      <TopButton />
      <Footer />
    </div>
  );
};

export default Profile;
