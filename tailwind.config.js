/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@fortawesome/fontawesome-free/**/*.css',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins : ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

