import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ScrollToTop from "../components/ScrollToTop";
import TopButton from "../components/TopButton";

export default function PrivacyPolicy() {
  return (
    <div>
      <Header />
      <ScrollToTop />
      <main className="bg-customWhite text-customBlack font-bodyFont px-6 py-10 md:px-20">
        <section className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-titleFont text-framboise font-bold mb-6">
            Charte de Protection des Données Personnelles
          </h1>

          <p>
            Cette charte a pour objectif d’informer les utilisateurs du site{" "}
            <strong>Salut Chef !</strong> sur la manière dont leurs données
            personnelles sont collectées, utilisées, stockées et protégées,
            conformément au Règlement Général sur la Protection des Données
            (RGPD) 2016/679 du 27 avril 2016.
          </p>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              1. Données collectées
            </h2>
            <p>
              Nous pouvons collecter les données suivantes :
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Données de connexion et de navigation</li>
              <li>Historique d’utilisation du site</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              2. Finalités du traitement
            </h2>
            <p>
              Les données sont utilisées pour :
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Fournir l’accès au contenu du site</li>
              <li>Améliorer l’expérience utilisateur</li>
              <li>Envoyer des communications par email si vous y avez consenti</li>
              <li>Assurer la sécurité du site</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              3. Conservation des données
            </h2>
            <p>
              Les données sont conservées pour une durée strictement nécessaire
              aux finalités mentionnées ci-dessus et conformément à la législation
              en vigueur.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              4. Partage des données
            </h2>
            <p>
              Vos données ne sont jamais vendues à des tiers. Elles peuvent être
              transmises uniquement aux prestataires techniques pour le bon
              fonctionnement du site, dans le respect du RGPD.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              5. Vos droits
            </h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Droit d’accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l’effacement (droit à l’oubli)</li>
              <li>Droit d’opposition au traitement</li>
              <li>Droit à la portabilité des données</li>
            </ul>
            <p className="mt-2">
              Pour exercer ces droits, contactez-nous à{" "}
              <a
                href="mailto:salutchefbzh@gmail.com"
                className="text-framboise underline hover:text-citron"
              >
                salutchefbzh@gmail.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              6. Sécurité des données
            </h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et
              organisationnelles appropriées pour protéger vos données contre la
              perte, la modification ou l’accès non autorisé.
            </p>
          </div>

          <footer className="pt-6 text-sm text-customBlack">
            <p>
              Dernière mise à jour : 15 mai 2025
            </p>
          </footer>
        </section>
      </main>
      <TopButton />
      <Footer />
    </div>
  );
}
