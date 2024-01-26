// import { GameProvider } from '../src/GameProvider';
import { withThemeByClassName } from '@storybook/addon-styling';

import '../src/index.css';
export const parameters = {
	// actions: { argTypesRegex: '^on[A-Z].*' },
	// controls: {
	// 	matchers: {
	// 		color: /(background|color)$/i,
	// 		date: /Date$/,
	// 	},
	// },
};

export const decorators = [
	// (Story) => (
	//   <GameProvider>
	//     <Story />
	//   </GameProvider>
	// ),
	// Story => (
	// 	<div style={{ backgroundColor: '#101820', margin: '3em', padding: '3em' }}>
	// 		<Story />
	// 	</div>
	// ), // Adds theme switching support.
	// NOTE: requires setting "darkMode" to "class" in your tailwind config
	// withThemeByClassName({
	// 	themes: {
	// 		light: 'light',
	// 		dark: 'dark',
	// 	},
	// 	defaultTheme: 'dark',
	// }),
];
