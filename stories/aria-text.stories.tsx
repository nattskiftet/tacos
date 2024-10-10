import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import AriaText from '../components/aria-text';

const meta: Meta<typeof AriaText> = {
	title: 'Aria Text',
	component: AriaText,
};

export default meta;

type Story = StoryObj<typeof AriaText>;

export const AriaTextStory: Story = {
	name: 'Aria Text',
	args: {},
	render: (properties) => <AriaText {...properties}>Hello, world!</AriaText>,
};
