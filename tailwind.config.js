const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
    "./storage/framework/views/*.php",
    "./resources/views/**/*.blade.php",
    "./resources/js/**/*.tsx",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {},
  },

  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#e29578",
            foreground: "#000000",
          },
          success: {
            DEFAULT: "#52b788",
          }
        }
      },
      dark: {
        colors: {
          primary: {
            DEFAULT: "#e29578",
            foreground: "#ffffff",
          },
          success: {
            DEFAULT: "#52b788",
          }
        }
      }
    }
  })],
}
