/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ["'Poppins', sans-serif"],
      mono: ['Alegreya Sans SC'],
    },
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'dark-color': 'var(--dark-color)',
        'dark-mode': 'var(--dark-mode)',
        'secondary-color': 'var(--secondary-color)',
      },
    },
  },
  plugins: [],
};
