/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config}  */

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

        'background-1': 'var(--clr-background-1)',
        'background-2': 'var(--clr-background-2)',
        'foreground-1': 'var(--clr-foreground-1)',
        'color-1': 'var(--border-color-1)',
        'filler-1': 'var(--clr-filler-1)',
        'primary-1': 'var(--clr-primary-1)',
        'color-border-1': 'var(--clr-border-1)',
        'gray-1': 'var(--clr-gray-1)',
      },
      boxShadow: {
        'border-shadow': 'var(--boxshadow-1)',
      },
    },
  },
  plugins: [require('flowbite/plugin'), require('@tailwindcss/line-clamp')],
};
