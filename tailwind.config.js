/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          'cormorant': ['Cormorant Garamond', 'serif'],
        },
        animation: {
          'fade-in': 'fadeIn 1.2s ease-out forwards',
          'fade-in-delay-1': 'fadeIn 1.2s ease-out 0.3s forwards',
          'fade-in-delay-2': 'fadeIn 1.2s ease-out 0.6s forwards',
          'fade-in-delay-3': 'fadeIn 1.2s ease-out 0.9s forwards',
        },
        keyframes: {
          fadeIn: {
            'from': { opacity: '0', transform: 'translateY(20px)' },
            'to': { opacity: '1', transform: 'translateY(0)' },
          }
        },
      },
    },
    plugins: [],
  }