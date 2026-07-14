/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./explore/index.html",
    "./community/index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'dash': 'dash 15s linear infinite',
      },
      keyframes: {
        dash: {
          'to': {
            'stroke-dashoffset': '-100',
          },
        },
      },
    },
  },
  plugins: [],
}
