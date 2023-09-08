/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
       dark:  {
        100: '#DBFF00',
        200: 'B1CD03'
      }
       yellow: {
          100: '#DBFF00',
          200: 'B1CD03'
        }
      }
    }
  },
  plugins: []
};