import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

function Default() {
	return <div>Default</div>;
}

const meta: Meta<typeof Default> = {
	title: 'Default',
	component: Default,
};

export default meta;

type Story = StoryObj<typeof Default>;

export const DefaultStory: Story = {
	name: 'Default',
	args: {},
};
