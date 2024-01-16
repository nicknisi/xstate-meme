import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
	content: ['index.html', 'src/**/*{.tsx,.ts}'],
	theme: {
		extend: {
			animation: {
				'spin-slow': 'spin 3s linear infinite',
			},
			backgroundSize: {
				full: '100%',
			},
			backgroundImage: {
				beef: 'url(/beef_nick.png)',
			},
			textShadow: {
				sm: '0 1px 2px var(--tw-shadow-color)',
				DEFAULT: '0 2px 4px var(--tw-shadow-color)',
				lg: '0 8px 16px var(--tw-shadow-color)',
			},
			fontFamily: {
				theramin: ['SF Theramin Gothic'],
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
