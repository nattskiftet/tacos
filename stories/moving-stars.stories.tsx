import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import MovingStars from '../components/moving-stars';

const meta: Meta<typeof MovingStars> = {
	title: 'Moving Stars',
	component: MovingStars,
};

export default meta;

type Story = StoryObj<typeof MovingStars>;

export const MovingStarsStory: Story = {
	name: 'Moving Stars',
	args: {
		minimumSize: 1,
		maximumSize: 5,
		maximumStarsCount: 50,
		speed: 1,
		hasMask: false,
	},
};
