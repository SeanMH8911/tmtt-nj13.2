/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myOrange: "#F26419",
        myYellow: "#F6AE2D",
        myCharcoal: "#2F4858",
        myBlue: "#86BBD8",
        myRed: "#FF8484",
      },
    },
  },
  plugins: [],
};
