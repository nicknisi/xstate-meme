const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'src/**/*{.tsx,.ts}'],
  theme: {
    extend: {
      backgroundSize: {
        full: '100%',
      },
      backgroundImage: {
        'jsdanger-abstract': 'url(/assets/jsparty-abstract-art.svg)',
        'gopanic-abstract': 'url(/assets/gotime-abstract-art.svg)',
        'jsdanger-logo': 'url(/assets/jsdanger-logo_3x.png)',
        'gopanic-logo': 'url(/assets/gopanic-logo_2x.png)',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      fontFamily: {
        sans: ['Pragati Narrow', 'sans-serif'],
        jsdanger: ['jsdanger', 'serif'],
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
