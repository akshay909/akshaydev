/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 

  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d6efd', 
          dark: '#0d6efd',
          light: '#0d6efd'
        }
      }
    }
  },

  plugins: []
}
