/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./explore/index.html",
    "./js/explore.jsx",
    "./components/pathfinder/PathFinder.tsx"
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
