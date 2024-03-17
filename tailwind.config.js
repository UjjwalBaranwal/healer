/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hoverColor: "#6BAACD",
        brightColor: "#dd8036",
        backgroundColor: "#0A749E",
      },
    },
  },
  plugins: [],
}

