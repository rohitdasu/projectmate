/** @type {import('tailwindcss').Config}  */

module.exports = {
  content: [
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
        'primary-background': 'var(--primary-background)',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
