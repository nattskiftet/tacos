import React, {useEffect} from 'react';
import type {Preview} from '@storybook/react';
import '../global.css';

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'Light',
			values: [
				{name: 'Light', value: '#fafafa'},
				{name: 'Dark', value: '#0d0d0d'},
			],
		},
	},
	decorators: [
		(Story, context) => {
			const background = context.globals.backgrounds?.value;

			useEffect(() => {
				document.documentElement.style.backgroundColor = background;
				document.documentElement.setAttribute('data-theme-variant', 'noir');

				document.documentElement.setAttribute(
					'data-theme',
					background === '#0d0d0d' ? 'dark' : 'light'
				);
			}, [background]);

			return Story();
		},
	],
};

export default preview;
