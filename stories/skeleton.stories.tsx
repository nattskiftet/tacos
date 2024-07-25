import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import Skeleton from '@/components/skeleton';
import {fontFamilyStyles} from '@/components/font';

const meta: Meta<typeof Skeleton> = {
	title: 'Skeleton',
	component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const SkeletonStory: Story = {
	name: 'Skeleton',
	args: {},
	render: (properties) => (
		<span className={fontFamilyStyles}>
			<Skeleton {...properties} />
		</span>
	),
};

export const SkeletonLines: Story = {
	name: 'Skeleton Lines',
	args: {lines: 5},
	render: (properties) => (
		<span className={fontFamilyStyles}>
			<Skeleton {...properties} />
		</span>
	),
};
