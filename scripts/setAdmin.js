import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Charger le fichier JSON manuellement
const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve("firebaseServiceAccountKey.json"), "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const emailToMakeAdmin = "ukiuki35@gmail.com";

admin
  .auth()
  .getUserByEmail(emailToMakeAdmin)
  .then((user) => {
    return admin.auth().setCustomUserClaims(user.uid, { admin: true });
  })
  .then(() => {
    console.log("✅ Admin role assigned successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error assigning admin role:", error);
    process.exit(1);
  });
