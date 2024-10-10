import React, {type ReactNode} from 'react';
import {ProgressBar, type ProgressBarProps} from 'react-aria-components';
import {css} from '@kuma-ui/core';
import cx from '../utilities/cx';

export default function LoadingSpinner({
	className,
	size = 20,
	strokeWidth = 2.5,
	...properties
}: ProgressBarProps & {
	readonly className?: string;
	readonly size?: number;
	readonly strokeWidth?: number;
}): ReactNode {
	const radius = size / 2;
	const curve = 2 * (radius - strokeWidth) * Math.PI;

	return (
		<ProgressBar
			{...properties}
			value={70}
			className={cx(
				css`
					--color: #000;
					text-align: center;
					display: inline-flex;

					:where([data-theme='dark']) & {
						--color: #fff;
					}
				`,
				className
			)}
			style={{width: size, height: size}}
		>
			{({percentage}) => (
				<svg
					width={size}
					height={size}
					preserveAspectRatio="xMaxYMax meet"
					viewBox={`0 0 ${size} ${size}`}
					fill="none"
					strokeWidth={strokeWidth}
					className={css`
						@keyframes loading-spinner {
							0% {
								transform: rotate(0deg);
							}

							100% {
								transform: rotate(359deg);
							}
						}

						animation: loading-spinner 1s linear infinite;
					`}
				>
					<circle
						cx={radius}
						cy={radius}
						r={radius - strokeWidth}
						stroke="var(--color)"
						strokeDasharray={`${curve} ${curve}`}
						strokeDashoffset={curve - ((percentage ?? 100) / 100) * curve}
						strokeLinecap="round"
					/>
				</svg>
			)}
		</ProgressBar>
	);
}
