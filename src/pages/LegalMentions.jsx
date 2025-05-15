import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

export default function LegalMentions() {
  return (
    <div>
      <Header />
      <main className="bg-customWhite text-customBlack font-bodyFont px-6 py-10 md:px-20">
        <section className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-titleFont text-framboise font-bold mb-4">
            Mentions Légales
          </h1>

          <p>
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004
            pour la confiance dans l'économie numérique, il est précisé aux
            utilisateurs du site <strong>Salut Chef !</strong> l'identité des
            différents intervenants dans le cadre de sa réalisation et de son
            suivi.
          </p>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              Édition du site
            </h2>
            <p>
              Le site, accessible à l’URL{" "}
              <a
                href="https://salut-chef-bcc43.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-framboise underline hover:text-citron"
              >
                https://salut-chef-bcc43.web.app/
              </a>{" "}
              est édité par l’association <strong>Salut Chef !</strong>, enregistrée auprès de la
              préfecture/sous-préfecture de 35 - Sous-Préfecture Redon sous le numéro
              <strong> W352006301</strong>, ayant son siège situé au{" "}
              <strong>7 rue du Patis du Bourg 35580 RENNES</strong>, représentée par
              Hénan Noël dûment habilité.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">Hébergement</h2>
            <p>
              Le site est hébergé par la société <strong>Autre</strong>, située{" "}
              <strong>188 King ST San Fransisco CA 94107 United States</strong>, contact :{" "}
              <strong>+33 6 79 11 36 08</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              Directeur de publication
            </h2>
            <p>Le directeur de publication du site est : [à compléter]</p>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">Nous contacter</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Téléphone : +33 6 79 11 36 08</li>
              <li>Email : salutchefbzh@gmail.com</li>
              <li>Adresse postale : 7 rue du Patis du Bourg 35580 RENNES</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-titleFont text-mandarine mb-2">
              Données personnelles
            </h2>
            <p>
              Le traitement de vos données à caractère personnel est régi par notre
              Charte du respect de la vie privée, disponible depuis la section{" "}
              <strong>"Charte de Protection des Données Personnelles"</strong>,
              conformément au Règlement Général sur la Protection des Données
              2016/679 du 27 avril 2016 (« RGPD »).
            </p>
          </div>

          <footer className="pt-6 text-sm text-customBlack">
            <p>
              Génération des mentions légales par{" "}
              <a
                href="https://www.legalstart.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-framboise underline hover:text-citron"
              >
                Legalstart.fr
              </a>
            </p>
          </footer>
        </section>
      </main>
      <Footer />
    </div>
  );
}