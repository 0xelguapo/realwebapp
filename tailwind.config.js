/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./shared/components/UI/CTA/**/*.js",
    "./shared/components/AddClient/AddClientModal.js"
  ],
  theme: {
    extend: {
      height: {
        '45vh': '45vh',
        '35rem': '30rem'
      },
      colors: {
        'bridal': '#FFFDF9',
        'ctablue': '#0071e3',
        'hoverctablue': '#0077ed',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
