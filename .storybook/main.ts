import type {StorybookConfig} from '@storybook/nextjs';
import KumaUIWebpackPlugin from '@kuma-ui/webpack-plugin';

const config: StorybookConfig = {
	stories: [
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@chromatic-com/storybook',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {},
	typescript: {
		reactDocgen: 'react-docgen-typescript',
	},
	webpackFinal: (config) => {
		config.plugins = [...(config.plugins ?? []), new KumaUIWebpackPlugin()];

		return config;
	},
};

export default config;
