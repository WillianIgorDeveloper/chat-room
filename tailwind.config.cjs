/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "indigo-0": "#3e63dd",
      "indigo-1": "#5373e7",
      "indigo-2": "#849dff",
      "gray-white-0": "#f1f3f5",
      "gray-white-1": "#f8f9fa",
      "gray-white-2": "#fbfcfd",
      "gray-black-0": "#11181c",
      "gray-black-1": "#687076",
      "gray-black-2": "#7e868c",
    },
    fontFamily: {
      'sans': ['Rubik', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'home-undraw': "url('/home-undraw.svg')",
      },
    },
  },
  plugins: [],
}