'use client';

import React, {type ReactNode, useMemo, type HTMLAttributes} from 'react';
import {css} from '@kuma-ui/core';
import cx from '../utilities/cx';

type SkeletonProperties = {
	readonly width?: string | number;
	readonly height?: string | number;
	readonly className?: string;
	readonly isAnimated?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function SkeletonInstance({
	width,
	height,
	className,
	children,
	isAnimated = true,
	...parameters
}: SkeletonProperties): ReactNode {
	return (
		<span
			{...parameters}
			aria-busy
			/* eslint-disable-next-line react/no-unknown-property */
			aria-role="progressbar"
			className={cx(
				css`
					--size: 300px;
					--negative-size: calc(var(--size) * -1);

					@keyframes skeleton-animation {
						0% {
							background-position: var(--negative-size) 0%;
						}

						100% {
							background-position: right var(--negative-size) top 0%;
						}
					}

					background: rgba(0, 0, 0, 0.15);
					width: 100%;
					border-radius: 100px;
					animation: skeleton-animation 1.1s infinite ease-in-out;
					will-change: background-position;
					display: inline-block;
					vertical-align: top;

					:where([data-theme='dark']) & {
						background-color: rgba(255, 255, 255, 0.2);
					}
				`,
				isAnimated &&
					css`
						--opacity: 0.3;
						background-position: var(--negative-size) 0%;
						background-attachment: fixed;
						background-size: var(--size) 100%;
						background-repeat: no-repeat;
						background-image: linear-gradient(
							90deg,
							rgba(255, 255, 255, 0) 0%,
							rgba(255, 255, 255, var(--opacity)) 50%,
							rgba(255, 255, 255, 0) 100%
						);

						:where([data-theme='dark']) & {
							--opacity: 0.08;
						}
					`,
				className
			)}
			style={{width, height}}
		>
			{children ?? <>&nbsp;</>}
		</span>
	);
}

const skeletonLinesStyles = css`
	vertical-align: middle;
`;

export default function Skeleton({lines = 1}: {readonly lines?: number}) {
	const fullwidthLines = useMemo(() => {
		const elements: ReactNode[] = [];

		if (lines <= 1) {
			return elements;
		}

		for (let iteration = 0; iteration < lines; iteration += 1) {
			elements.push(
				<SkeletonInstance
					key={iteration}
					width="100%"
					height="1em"
					className={skeletonLinesStyles}
				/>
			);
		}

		return elements;
	}, [lines]);

	return lines === 1 ? (
		<SkeletonInstance
			width="100%"
			height="1em"
			className={skeletonLinesStyles}
		/>
	) : (
		<>
			{fullwidthLines}
			<SkeletonInstance
				width="60%"
				height="1em"
				className={skeletonLinesStyles}
			/>
		</>
	);
}
