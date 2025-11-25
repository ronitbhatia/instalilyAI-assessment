/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'partselect-red': '#E31837',
        'partselect-dark': '#1a1a1a',
      },
    },
  },
  plugins: [],
}

