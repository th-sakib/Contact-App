/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'Protest-Guerrilla': ['Protest Guerrilla', 'sans-serif'],
    },
    extend: {
      colors: {
        gray: "#5A5959",
        yellow: "#FFEAAE",
        "dark-yellow": "#FCCA3F",
        orange: "#F7820C",
        purple: "#5F00D9"
      }
    },
  },
  plugins: [],
}