import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import MovingGradients from '../components/moving-gradients';

const meta: Meta<typeof MovingGradients> = {
	title: 'Moving Gradients',
	component: MovingGradients,
};

export default meta;

type Story = StoryObj<typeof MovingGradients>;

export const MovingGradientsStory: Story = {
	name: 'Moving Gradients',
	args: {speed: 1, maximumGradientsCount: 10},
};
