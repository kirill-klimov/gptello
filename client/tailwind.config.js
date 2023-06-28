/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E5DCEF",
          100: "#DACDE9",
          200: "#C3ADDB",
          300: "#A98ACC",
          400: "#916ABE",
          500: "#794CAD",
          600: "#633E8E",
          700: "#4D306E",
          800: "#392452",
          900: "#231632",
        },
        text: {
          50: "#DCE1EA",
          100: "#C9D1DE",
          200: "#A3B0C7",
          300: "#7D90B0",
          400: "#5B7095",
          500: "#44546F",
          600: "#38455C",
          700: "#2D3749",
          800: "#212936",
          900: "#151A23",
        },
      },
    },
  },
  plugins: [],
}

