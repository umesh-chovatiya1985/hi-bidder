/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./Admin/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: "639px" },
      md: { max: "767px" },
      lg: { max: "1023px" },
      xl: { max: "1279px" },
    },
    fontFamily: {
      sans: ["Ubuntu", "Sans-serif"],
    },
    extend: {
      colors: {
        "aeliya-blue": "#00909E",
        "anchor-blue": "#1E2A78",
        "primary-color": "#040826",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require('@tailwindcss/line-clamp')],
};
