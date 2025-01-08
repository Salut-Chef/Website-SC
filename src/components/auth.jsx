import React, { useState } from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth.currentUser.email);

  const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <div>
      <Header />

      <h1>Auth</h1>

      <input
        placeholder="Email..."
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Sign in</button>

      <Footer />
    </div>
  );
}

export default Auth;