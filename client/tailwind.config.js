const tailwindcss = require("tailwindcss");

module.exports = {
  content: ["./src/components/**/*.js"],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        Lobster: ["Lobster", "cursive"]
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/aspect-ratio")
  ],
}