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
      colors: {
        brand: {
          primary: '#D14836',
          accent: '#F97316',
          hover: '#EA580C',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        bg: {
          primary: '#0B0B0B',
          secondary: '#111111',
          card: '#181818',
          elevated: '#202020',
          input: '#141414',
          btnSec: '#1B1B1B',
        },
        border: {
          primary: '#2A2A2A',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#B0B0B0',
          muted: '#8A8A8A',
          disabled: '#5A5A5A',
        }
      },
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
