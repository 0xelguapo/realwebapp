/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./shared/components/UI/CTA/**/*.js",
    "./shared/components/UI/Modal/**/*.js",
    "./shared/components/AddClient/**/*.js",
    "./shared/components/UI/Layouts/**/*.js"

  ],
  theme: {
    extend: {
      height: {
        "45vh": "45vh",
        "35rem": "30rem",
      },
      colors: {
        bridal: "#FFFDF9",
        ctablue: "#0071e3",
        buttonblue: "#026bff",
        hoverctablue: "#0077ed",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
