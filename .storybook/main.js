import { mergeConfig } from 'vite';
export default {
	async viteFinal(config, { configType }) {
		// return the customized config
		return mergeConfig(config, {
			// customize the Vite config here
			resolve: {},
			define: {
				...config.define,
				global: 'window',
			},
		});
	},
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		// 'storybook-xstate-addon/preset',
		'@storybook/addon-styling',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	previewHead: head => `
		${head}
		<style>
			#storybook-root {
				height: 100%;
				width: 100%;
				margin: 0 auto;
			}
		</style>
	`,
	staticDirs: ['../public'],
};
