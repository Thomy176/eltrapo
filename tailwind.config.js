/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0e1a',
          800: '#0d1225',
          700: '#111830',
          600: '#161f3d',
        },
        neon: {
          green: '#00ff87',
          blue: '#0066ff',
        },
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.4 },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 1.5s ease-in-out infinite',
        'slide-in': 'slide-in 0.2s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
