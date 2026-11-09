/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#0b0e2c',
        aurora1: '#7f5af0',
        aurora2: '#ff6ec7',
        aurora3: '#2cb1bc',
        aurora4: '#ffb84c',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(127, 90, 240, 0.45)',
        card: '0 8px 40px rgba(15, 12, 41, 0.35)',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-25px, 25px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
      },
      animation: {
        blob: 'blob 12s infinite ease-in-out',
        float: 'float 4s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
}
