import { getStorage, ref, getDownloadURL } from "firebase/storage";

/**
 * Récupère une URL de téléchargement depuis Firebase Storage
 * @param {string} imagePath - Chemin relatif de l'image dans Firebase Storage
 * @returns {Promise<string>} - URL de l'image
 */
async function getImageFromStorage(imagePath) {
  try {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, imagePath));
    return url;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'image depuis Firebase Storage :",
      error
    );
    return "";
  }
}

export default getImageFromStorage;
