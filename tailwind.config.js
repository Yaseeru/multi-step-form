/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'], // override default
      },
      colors: {
        blue: {
          50: "hsl(231, 100%, 99%)",
          100: "hsl(218, 100%, 97%)",
          200: "hsl(206, 94%, 87%)",
          300: "hsl(228, 100%, 84%)",
          950: "hsl(213, 96%, 18%)"
        },
        red: {
          500: "hsl(354, 84%, 57%)"
        },
        purple: {
          200: "hsl(229, 24%, 87%)",
          600: "hsl(243, 100%, 62%)"
        },
        grey: {
          500: "hsl(231, 11%, 63%)"
        }
      }
    },
  },
  plugins: [],
}