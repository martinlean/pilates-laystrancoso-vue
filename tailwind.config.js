/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#f5f5f4',
          content: '#6b7280',
          theme: '#3b82f6',
          title: '#030712',
        },
      },
    },
  },
  plugins: [],
}
