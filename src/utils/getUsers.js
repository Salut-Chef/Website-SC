import { getAuth } from "firebase-admin/auth";

const getUsers = async (req, res) => {
  try {
    const users = [];
    const listUsers = await getAuth().listUsers();
    listUsers.users.forEach((userRecord) => {
      users.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        role: userRecord.customClaims?.admin ? "Admin" : "Utilisateur",
      });
    });
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des utilisateurs." });
  }
};

export default getUsers;
