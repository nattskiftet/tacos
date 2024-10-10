import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import Box from '../components/box';

const meta: Meta<typeof Box> = {
	title: 'Box',
	component: Box,
};

export default meta;

type Story = StoryObj<typeof Box>;

export const BoxStory: Story = {
	name: 'Box',
	args: {as: 'div'},
};

export const Row: Story = {
	args: {as: 'div', direction: 'row'},
	render: (properties) => (
		<Box {...properties}>
			<span>1</span>
			<span>2</span>
			<span>3</span>
		</Box>
	),
};

export const Column: Story = {
	args: {as: 'div', direction: 'column'},
	render: (properties) => (
		<Box {...properties}>
			<span>1</span>
			<span>2</span>
			<span>3</span>
		</Box>
	),
};
