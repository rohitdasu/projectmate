/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
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
        'box-color': 'var(--box-color)',
        'secondary-color': 'var(--secondary-color)',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
