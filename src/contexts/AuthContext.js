import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";

/** @typedef {{ user: import("firebase/auth").User | null, isAdmin: boolean, loading: boolean }} AuthContextType */

const AuthContext = createContext(
  /** @type {AuthContextType} */ ({
    user: null,
    isAdmin: false,
    loading: true,
  })
);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const token = await getIdTokenResult(firebaseUser, true);
          setIsAdmin(!!token.claims.admin);
        } catch (err) {
          console.error("Erreur lors de la récupération des claims :", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
