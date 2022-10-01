/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js, ts, jsx, tsx}",
    "./shared/components/Subscribe/SubscribeInput.js"
  ],
  theme: {
    extend: {
      height: {
        '45vh': '45vh',
        '35rem': '30rem'
      },
      colors: {
        'bridal': '#FFFDF9'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
