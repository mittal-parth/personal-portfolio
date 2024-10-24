/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        lightTeal: "rgb(128, 203, 196)", //teal-200
        darkGray: "rgb(97, 97, 97)", //gray-700
        lightGray: "rgb(229, 231, 235)", //Gray-200
        silverGray: "rgb(209, 213, 219)", //Gray-300
        mediumGray: "rgb (75, 85, 99)", //Gray-600
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};