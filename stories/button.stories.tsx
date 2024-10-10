import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {SparklesIcon} from '@heroicons/react/16/solid';
import Button from '../components/button';

const meta: Meta<typeof Button> = {
	title: 'Button',
	component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const ButtonStory: Story = {
	name: 'Button',
	args: {variant: 'primary'},
	render: (properties) => <Button {...properties}>Hello, world!</Button>,
};

export const ButtonLinkStory: Story = {
	name: 'Link',
	args: {variant: 'primary', href: ''},
	render: (properties) => <Button {...properties}>Hello, world!</Button>,
};

export const ButtonIconStory: Story = {
	name: 'Icon',
	args: {
		variant: 'primary',
		iconLeft: <SparklesIcon />,
		iconRight: <SparklesIcon />,
	},
	render: (properties) => <Button {...properties}>Hello, world!</Button>,
};

export const ButtonLoadingStory: Story = {
	name: 'Loading',
	args: {variant: 'primary', isLoading: true},
	render: (properties) => <Button {...properties}>Hello, world!</Button>,
};

export const ButtonSkeletonStory: Story = {
	name: 'Skeleton',
	args: {variant: 'primary', isSkeleton: true},
	render: (properties) => <Button {...properties}>Hello, world!</Button>,
};
