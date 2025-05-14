import { getAuth } from "firebase/auth";

export async function isUserAdmin() {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return false;

  try {
    const idTokenResult = await user.getIdTokenResult();
    return !!idTokenResult.claims.admin;
  } catch (error) {
    console.error("Erreur lors de la vérification du rôle admin :", error);
    return false;
  }
}
