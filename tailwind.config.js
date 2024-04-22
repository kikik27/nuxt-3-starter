/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D82E1D",
        success: "#13D33D",
        form: {
          border: "#CFD9E0",
        },
        backgroundPage: "#D9D9D9",
        placeholder: "#67728A",
        red: {
          active: "#F3BEB9",
          100: "#FBEAE8",
          300: "#FC8181",
          400: "#F56565",
          500: "#D82E1D",
          600: "#C53030",
          700: "#9B2C2C",
        },
        blue: {
          100: "#BEE3F8",
          400: "#4299E1",
          500: "#3182CE",
          600: "#2B6CB0",
          700: "#2C5282",
        },
        black: {
          100: "#454545",
          800: "#333333",
          900: "#141414",
        },
        yellow: {
          100: "#FEFCBF",
          400: "#ECC94B",
          500: "#975A16",
        },
        purple: {
          100: "#E9D8FD",
          400: "#9F7AEA",
          700: "#553C9A",
        },
        green: {
          100: "#C6F6D5",
          400: "#48BB78",
          500: "#38A169",
          700: "#276749",
        },
        gray: {
          50: "#F2F2F2",
          100: "#CBD5E0",
          400: "#C2C2C2",
          500: "#718096",
          900: "#111928",
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        main: "0px 4px 40px 0 rgba(0,0,0,0.25)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
