import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import Revealer from '@/components/revealer';
import {fontFamilyStyles} from '@/components/font';

const meta: Meta<typeof Revealer> = {
	title: 'Revealer',
	component: Revealer,
};

export default meta;

type Story = StoryObj<typeof Revealer>;

export const RevealerStory: Story = {
	name: 'Revealer',
	args: {delay: 500},
	render: (properties) => (
		<span className={fontFamilyStyles}>
			<Revealer {...properties}>Hello, world!</Revealer>
		</span>
	),
};
