/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'chart': '300px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};

