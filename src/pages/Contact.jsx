import React, { useState } from "react";
import emailjs from "emailjs-com";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMsg("Tous les champs sont requis.");
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_dqmqowt",
        "template_rigmeqw",
        templateParams,
        "MOsPfTtguUjh6t9L-"
      )
      .then(
        (response) => {
          setSuccessMsg("Message envoyé avec succès !");
          setName("");
          setEmail("");
          setMessage("");
        },
        (err) => {
          setErrorMsg("Erreur lors de l'envoi de l'email. Réessayez.");
        }
      );
  };

  return (
    <div className="bg-customWhite text-customBlack font-bodyFont">
      <Header />
      <ScrollToTop />

      <main className="px-4 py-10 sm:px-6 md:px-10 flex justify-center">
        <div className="w-full max-w-2xl bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-shadowCustom">
          <h1 className="text-3xl font-titleFont mb-6 text-center">Contactez-nous</h1>

          {successMsg && <p className="text-green-600 text-center">{successMsg}</p>}
          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Nom</label>
              <input
                type="text"
                className="w-full p-3 border border-framboise rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-framboise rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                className="w-full p-3 border border-framboise rounded-lg"
                rows="5"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-framboise text-white rounded-lg shadow hover:bg-pink-700 transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
