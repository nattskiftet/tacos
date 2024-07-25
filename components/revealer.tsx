'use client';

import React, {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useRef,
	useState,
	type HTMLAttributes,
} from 'react';
import {css} from '@kuma-ui/core';
import cx from '@/utilities/cx';

export default function Revealer({
	delay = 1,
	animationDelay = 1,
	duration = 555,
	threshold = 0.3,
	distance = 20,
	isMoving = true,
	isCentered = false,
	canReveal = true,
	children,
	className,
	...properties
}: HTMLAttributes<HTMLDivElement> & {
	readonly delay?: number;
	readonly animationDelay?: number;
	readonly duration?: number;
	readonly threshold?: number;
	readonly distance?: number;
	readonly isMoving?: boolean;
	readonly isCentered?: boolean;
	readonly canReveal?: boolean;
	readonly className?: string;
}): ReactNode {
	const reference = useRef<HTMLDivElement>(null);
	const [internalCanReveal, setInternalCanReveal] = useState(false);
	const [isVisible, setIsVisible] = useState(() =>
		typeof window === 'undefined' ? false : !('IntersectionObserver' in window)
	);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setInternalCanReveal(true);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [delay]);

	useEffect(() => {
		if (internalCanReveal && canReveal && !isVisible && reference.current) {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						requestAnimationFrame(() => {
							setIsVisible(true);
						});
					}
				},
				{threshold}
			);

			observer.observe(reference.current);

			return () => {
				observer.disconnect();
			};
		}
	}, [internalCanReveal, canReveal, isVisible, threshold]);

	return (
		<div
			{...properties}
			ref={reference}
			className={cx(
				css`
					opacity: 0;
					transition:
						transform var(--duration) var(--animation-delay),
						opacity var(--duration) var(--animation-delay);
				`,
				isMoving &&
					css`
						transform: translate3d(0, var(--distance), 0);

						@media (prefers-reduced-motion) {
							transform: translate3d(0, calc(var(--distance) / 3));
						}
					`,
				isVisible &&
					css`
						transform: translate3d(0, 0, 0);
						opacity: 1;
					`,
				isCentered &&
					css`
						width: 100%;
						margin: auto;
					`,
				className
			)}
			style={
				{
					'--distance': `${distance}px`,
					'--duration': `${duration / 1000}s`,
					'--animation-delay': `${animationDelay / 1000}s`,
				} as CSSProperties
			}
		>
			{children}
		</div>
	);
}
