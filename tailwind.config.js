/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18BC9C",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        'text-gradient': 'linear-gradient(180deg, #03BD5C 24.4%, #099F7A 84.42%)'
      },
      keyframes: {
        drive: {
          '0%': { transform: 'translateX(100px)' }, 
          '100%': { transform: 'translateX(-100px)' },
        },
      },
      animation: {
        drive: 'drive 0.9s linear infinite',
      },
    },
  },
  plugins: [],
};
