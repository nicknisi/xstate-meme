import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: ['index.html', 'src/**/*{.tsx,.ts}'],
	theme: {
		extend: {
			colors: {
				gray: {
					50: '#F9FAFB',
					100: '#E3E3E5',
					200: '#C7C7CB',
					300: '#ABABB1',
					400: '#8F8F97',
					500: '#74747E',
					600: '#585864',
					700: '#3C3C4A',
					800: '#202030',
					900: '#050517',
				},
			},
			animation: {
				'spin-slow': 'spin 3s linear infinite',
			},
			backgroundSize: {
				full: '100%',
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			fontFamily: {
				sans: ['Atkinson Hyperlegible', 'sans-serif'],
				theramin: ['SF Theramin Gothic'],
				bebas: ['Bebas Neue'],
			},
		},
	},
	plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities(
				{
					'text-shadow': value => ({
						textShadow: value,
					}),
				},
				{ values: theme('textShadow') },
			);
		}),
	],
};

export default config;
