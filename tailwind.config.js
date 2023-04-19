/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        player2: ["Player2"],
      },
      colors: {
        "primary": "#D74526",
        "accent": "#F9A826",
        "background": "#2E382E",
      },
      screens: {
        'tall': { 'raw': '(min-height: 720px)' },
      }
    },
  },
  plugins: [],
}

