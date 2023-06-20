/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        lora: ['Lora', 'san-serif'],
      },
      boxShadow: {
        full_white: '0px 0px 5px 1px rgba(212,245,196,0.3)',
      },
    },
  },
  plugins: [],
};
