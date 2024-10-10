import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import Loading from '../components/loading';

const meta: Meta<typeof Loading> = {
	title: 'Loading',
	component: Loading,
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const LoadingStory: Story = {
	name: 'Loading',
	args: {},
};
