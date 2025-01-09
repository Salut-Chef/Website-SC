/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path/to/node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path/to/node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        titleFont: ["prenton-ultra-condensed", "sans-serif"],
        bodyFont: ["haboro-soft", "sans-serif"],
      },
      colors: {
        framboise: "#D5074C",
        customWhite: "#FCF7F7",
        customBlack: "#191715",
        citron: "#FED766",
        mandarine: "#ED583F",
      },
      boxShadow: {
        shadowCustom: "4px 4px 2px rgba(25, 23, 21, 0.5)",
      },
    },
  },
  plugins: [],
};
