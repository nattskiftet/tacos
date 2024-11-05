'use client';

import React, {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import {css} from '@kuma-ui/core';
import cx from '../utilities/cx';

export type MovingStarsProperties = {
	readonly className?: string;
	readonly minimumSize?: number;
	readonly maximumSize?: number;
	readonly maximumStarsCount?: number;
	readonly speed?: number;
	readonly hasMask?: boolean;
};

export default function MovingStars({
	className,
	minimumSize = 1,
	maximumSize = 5,
	maximumStarsCount = 50,
	speed = 1,
	hasMask = false,
}: MovingStarsProperties): ReactNode {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const getStar = useCallback(() => {
		const extendedCanvasWidth = width * 1.5;
		const quarterExtendedCanvasWidth = width * 0.25;
		const extendedCanvasHeight = height * 1.5;
		const quarterExtendedCanvasHeight = height * 0.25;
		const startPositionX =
			extendedCanvasWidth * Math.random() - quarterExtendedCanvasWidth;
		const startPositionY =
			extendedCanvasHeight * Math.random() - quarterExtendedCanvasHeight;

		return {
			size: Math.max(minimumSize, maximumSize * Math.random()),
			opacity: 0,
			speed: Math.max(0.1, (Math.random() / 2) * speed),
			startPosition: [startPositionX, startPositionY],
			currentPosition: [startPositionX, startPositionY],
			targetPosition: [
				extendedCanvasWidth * Math.random() - quarterExtendedCanvasWidth,
				extendedCanvasHeight * Math.random() - quarterExtendedCanvasHeight,
			],
		};
	}, [width, height, speed, minimumSize, maximumSize]);

	const getColor = useCallback(
		() => (canvas.current ? getComputedStyle(canvas.current).color : '#000'),
		[canvas]
	);

	useEffect(() => {
		const stars = Array.from({length: maximumStarsCount}).map(() => getStar());

		let currentStarsCount = maximumStarsCount;
		let isCancelled = false;
		let frame: number | undefined;
		let color = getColor();

		function loop() {
			if (isCancelled) {
				return;
			}

			if (!context) {
				frame = requestAnimationFrame(loop);
				return;
			}

			context.clearRect(0, 0, width, height);

			for (let index = stars.length; index; index -= 1) {
				const star = stars[index - 1];
				const [startX, startY] = star.startPosition;
				const [currentX, currentY] = star.currentPosition;
				const [targetX, targetY] = star.targetPosition;

				let isFulfilled = true;

				if (startX > targetX) {
					if (currentX > targetX) {
						isFulfilled = false;
					}
				} else if (currentX < targetX) {
					isFulfilled = false;
				}

				if (startY > targetY) {
					if (currentY > targetY) {
						isFulfilled = false;
					}
				} else if (currentY < targetY) {
					isFulfilled = false;
				}

				if (isFulfilled) {
					stars.splice(index - 1, 1);
					currentStarsCount -= 1;
					continue;
				}

				const middleX = (startX + targetX) / 2 - startX;
				const distanceX = currentX - startX;
				const middleY = (startY + targetY) / 2 - startY;
				const distanceY = currentY - startY;
				const opacity = (distanceX / middleX + distanceY / middleY) / 2;

				star.opacity = opacity > 1 ? 2 - opacity : opacity;
				const radius = star.size / 2;

				context.beginPath();
				context.arc(
					currentX - radius,
					currentY - radius,
					radius,
					0,
					2 * Math.PI,
					false
				);

				context.globalAlpha = star.opacity;
				context.fillStyle = color;
				context.fill();

				if (currentX !== targetX) {
					const varianceX = Math.abs(startX - targetX);
					const varianceY = Math.abs(startY - targetY);
					const multiplier = Math.min(1, varianceX / varianceY);

					if (currentX < targetX) {
						star.currentPosition[0] += star.speed * multiplier;
					} else {
						star.currentPosition[0] -= star.speed * multiplier;
					}
				}

				if (currentY !== targetY) {
					const varianceX = Math.abs(startX - targetX);
					const varianceY = Math.abs(startY - targetY);
					const multiplier = Math.min(1, varianceY / varianceX);

					if (currentY < targetY) {
						star.currentPosition[1] += star.speed * multiplier;
					} else {
						star.currentPosition[1] -= star.speed * multiplier;
					}
				}
			}

			frame = requestAnimationFrame(loop);
		}

		frame = requestAnimationFrame(loop);

		const interval = setInterval(() => {
			color = getColor();
			let newStarsCount = maximumStarsCount - currentStarsCount;

			if (newStarsCount > 0) {
				while (newStarsCount) {
					stars.push(getStar());
					newStarsCount -= 1;
					currentStarsCount += 1;
				}
			}
		}, 500);

		return () => {
			isCancelled = true;

			if (frame) {
				cancelAnimationFrame(frame);
			}

			clearInterval(interval);
		};
	}, [context, width, height, speed, getColor, maximumStarsCount, getStar]);

	useEffect(() => {
		if (canvas.current) {
			const context = canvas.current.getContext('2d');

			if (context) {
				setContext(context);
			}

			setWidth(canvas.current.offsetWidth);
			setHeight(canvas.current.offsetHeight);

			const listener = () => {
				if (canvas.current) {
					setWidth(canvas.current.offsetWidth);
					setHeight(canvas.current.offsetHeight);
				}
			};

			window.addEventListener('resize', listener, {passive: true});

			return () => {
				window.removeEventListener('resize', listener);
			};
		}
	}, [canvas]);

	return (
		<canvas
			ref={canvas}
			className={cx(
				css`
					width: 100%;
					height: 100%;
					color: #000;
					pointer-events: none;
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					opacity: 0.2;

					:where([data-theme='dark']) & {
						color: #fff;
					}
				`,
				hasMask &&
					css`
						mask-image: radial-gradient(
							ellipse,
							black 0%,
							black 60%,
							transparent 75%,
							transparent 100%
						);
					`,
				className
			)}
			{...{width, height}}
		/>
	);
}
