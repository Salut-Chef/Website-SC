import { useCallback } from "react";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import { type Container } from "tsparticles-engine";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles loaded", container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "#fed766",
          },
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 75, // Quantité d'icônes de fruits de base
            density: {
              enable: true,
              value_area: 900
            }
          },
          color: {
            value: "#E76F51"
          },
          shape: {
            type: "char",
            character: [
              {
                value: "🍋", 
                font: "Verdana",
                style: "",
                weight: "400",
                fill: true
              },
              {
                value: "🍊", 
                font: "Verdana",
                style: "",
                weight: "400",
                fill: true
              },
              {
                value: "🫐", 
                font: "Verdana",
                style: "",
                weight: "400",
                fill: true
              },
              {
                value: "🍓", 
                font: "Verdana",
                style: "",
                weight: "400",
                fill: true
              }
            ]
          },
          opacity: {
            value: 1
          },
          size: {
            value: 25,
            animation: {
              enable: true,
              speed: 3,
              minimumValue: 20,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "bounce"
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#191715",
            opacity: 0.8,
            width: 3
          },
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "repulse"
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 150,
              duration: 0.4
            },
            push: {
              quantity: 5
            }
          }
        },
        detectRetina: true
      }}
      className="absolute inset-0 -z-10"
    />
  );
};

export default ParticleBackground;