/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Serif"', 'serif'],
        serif: ['"Slabo 27px"', 'serif'],
        heading: ['"Slabo 27px"', 'serif'],
        body: ['"Noto Serif"', 'serif'],
      },
    },
  },
  plugins: [],
}