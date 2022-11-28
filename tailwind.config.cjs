/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "indigo-0": "#4338ca",
      "indigo-1": "#4f46e5",
      "indigo-2": "#6366f1",
      "white-0": "#D8DEE9",
      "white-1": "#E5E9F0",
      "white-2": "#ECEFF4",
      "black-0": "#2E3440",
      "black-1": "#3B4252",
      "black-2": "#434C5E",
      "red": "#BF616A",
      "orange": "#D08770",
      "yellow": "#EBCB8B",
      "green": "#A3BE8C",
    },
    fontFamily: {
      'sans': ['Rubik', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}