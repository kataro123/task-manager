/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      colors: {
        brand: {
          'dark-blue': '#35383e',
          primary: '#00adb5',
          'dark-gray': '#818181',
          'text-gray': '#9a9c9f',
          'light-gray': '#eeeeee',
          white: '#ffffff',
          background: '#f8f8f8',
          border: '#f4f4f5',
          process: '#ffaa04',
          danger: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
