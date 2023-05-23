/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: []
}
