/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': 'rgba(17, 25, 40, 0.5)',
      },
      fontSize: {
        'custom-size': '13px',
      },
    },
  },
  plugins: [],
}