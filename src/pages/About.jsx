import React from "react";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

const About = () => {
    const teamMembers = [
        { name: 'Hénan', description: "Gamer de cœur, ancien cuisinier, avec moi vous deviendrez des chefs pour vos nuits de tryhard !", photo: '/images/about/Henan.jpg' },
        { name: 'Mathis', description: "Supporter de cœur, cuisinier de passion : je cuisine avec la même intensité qu'un ultra en tribune. Des saveurs fortes pour des moments de partage uniques !", photo: '/images/about/Mathis.JPG' },
        {
            name: 'Svetlana',
            description: "Moi, c'est Svet ou Svety pour les intimes. La cuisine, c'est comme un langage d'amour qui sait te réconforter. Sinon, mon passe-temps favori, c'est faire des combats de MMA avec mes courges quand il s'agit de les éplucher. Mon objectif à Salut Chef ? Faire en sorte que chaque bouchée soit un orgasme.",
            photo: '/images/about/Svetlana.jpg'
        },
        { name: 'Audrey', description: "Qu'importe ce que je trouve dans le jardin de mes grands-parents, j'en fais un bon petit plat !", photo: '/images/about/Audrey.jpg' },
        { name: 'Toma', description: "Avec mon œil affûté, je transforme chaque instant en chef-d'œuvre visuel. En audiovisuel comme en cuisine, chaque détail compte pour créer l'exceptionnel !", photo: '/images/about/toma.png' },
        { name: 'Orlane', description: "Que ce soit en vidéo ou en cuisine, je donne vie aux idées avec passion et rigueur, pour offrir une expérience unique à chaque fois.", photo: '/images/about/orlane.png' },
    ];

    return (
        <div className="aboutPage bg-customWhite">
            <Header />

            {/* Team Section Title */}
            <div className="bgImgAbout"></div>
            <div className="titleAbout">
                <h2 className="text-5xl text-center text-customWhite">
                    L'équipe
                </h2>
            </div>

            {/* Team Grid */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 gap-y-16 px-8 max-w-7xl mx-auto">
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="w-48 h-48 bg-gray-200 rounded-full mb-6">
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="w-full h-full rounded-full object-cover"
                            />
                        </div>
                        <h3 className="text-2xl font-bold italic mb-4">
                            {member.name}
                        </h3>
                        <p className="italic">
                            {member.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Video Section */}
            <div className="mt-20 my-32 px-8">
                <h2 className="text-xl font-black italic text-center mb-16">
                    Maintenant que vous connaissez l'équipe, découvrons pourquoi Salut Chef est le choix parfait pour les étudiants !
                </h2>
                <div className="flex items-center justify-center">
                    <div className="instagram-embed">
                        <iframe
                            title="Instagram Reel"
                            className="instagram-iframe"
                            src="https://www.instagram.com/reel/DC6DeTBMReV/embed"
                            width="400"
                            height="480"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>

            {/* Food Images Section */}
            <div className="max-w-6xl mx-auto px-8 mb-32">
                <div className="flex flex-col md:flex-row items-center justify-between mb-24">
                    <img
                        src="/images/about/SC_Lyon1.jpg"
                        alt="Svetlana et Hénan"
                        className="w-96 h-64 object-cover object-top rounded-lg shadow-lg mb-8 md:mb-0"
                    />
                    <p className="md:ml-16 text-lg italic max-w-xl text-center md:text-left">
                        Salut Chef ! a émergé des idées d’Hénan lors d’un brainstorming en octobre 2023, en études supérieures, consistant a créé un projet entrepreneurial. Lors du pitch de base, ce projet a attiré l’attention de Svetlana, qui a décidé de prendre part à Salut Chef !. C’est ainsi qu’une révolution culinaire s’est mise en marche : de l’envie de Svetlana et Hénan d’aider les étudiants à mieux manger, à comprendre comment mieux manger, et à changer leurs habitudes alimentaires.
                    </p>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                    <p className="md:mr-16 text-lg italic max-w-xl text-center md:text-left mt-8 md:mt-0">
                        Aujourd’hui, Salut Chef ! est en pleine expansion. Après 1 année complète passée sur la conceptualisation du projet, c’est désormais comme association que se définit Salut Chef !. Une association à destination de tous les étudiants désireux d’apprendre à cuisiner, une association pour les étudiants, par les étudiants.
                    </p>
                    <img
                        src="/images/about/Team.jpg"
                        alt="Salut Chef en concertation"
                        className="w-96 h-64 object-cover object-top rounded-lg shadow-lg"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default About;