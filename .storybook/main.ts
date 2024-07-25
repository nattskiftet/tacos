import type {StorybookConfig} from '@storybook/nextjs';
import KumaUIWebpackPlugin from '@kuma-ui/webpack-plugin';

const config: StorybookConfig = {
	stories: [
		'../stories/**/*.mdx',
		'../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
	],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	webpackFinal: (config) => {
		config.plugins = [...(config.plugins ?? []), new KumaUIWebpackPlugin()];
		return config;
	},
};

export default config;
