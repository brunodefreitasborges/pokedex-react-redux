/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "frame": "url('/src/assets/frame.png')",
      },
      fontFamily: {
        visitor: ["Visitor", "display"],
      }
    },
  },
  plugins: [],
}

