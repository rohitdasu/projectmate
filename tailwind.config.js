/** @type {import('tailwindcss').Config}  */

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      lato: ['Lato'],
      inter: ['Inter'],
    },
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-background': 'var(--secondary-background)',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
};
