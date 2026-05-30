/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fcfbf8',
          100: '#f8f5eb',
          200: '#eee8d5',
          300: '#e3d6b9',
          400: '#d5be96',
          500: '#c5a475',
          600: '#b78c5c',
          700: '#99714c',
          800: '#7f5f43',
          900: '#674d38',
        },
        ink: {
          900: '#1a1818',
          800: '#2d2a2a',
          700: '#403b3b',
        }
      },
      fontFamily: {
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Crimson Text"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'parchment-texture': "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
      }
    },
  },
  plugins: [],
}
