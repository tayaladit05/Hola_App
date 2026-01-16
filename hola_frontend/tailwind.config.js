/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'instagram-blue': '#0095f6',
        'instagram-dark': '#262626',
        'instagram-gray': '#8e8e8e',
        'instagram-border': '#dbdbdb',
      }
    },
  },
  plugins: [],
}
