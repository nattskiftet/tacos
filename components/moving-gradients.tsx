'use client';

import React, {
	type CSSProperties,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
	useMemo,
} from 'react';
import {css} from '@kuma-ui/core';
import cx from '../utilities/cx';

type RgbList = Array<[number, number, number]>;

const defaultColors: RgbList = [
	[73, 51, 205],
	[97, 24, 190],
	[116, 42, 236],
	[189, 0, 255],
	[53, 2, 195],
	[69, 28, 157],
	[49, 37, 204],
];

export type MovingGradientsProperties = {
	readonly className?: string;
	readonly colors?: RgbList;
	readonly maximumGradientsCount?: number;
	readonly speed?: number;
	readonly opacity?: number;
};

export default function MovingGradients({
	className,
	colors = defaultColors,
	maximumGradientsCount = 10,
	speed = 1,
	opacity = 0.2,
}: MovingGradientsProperties): ReactNode {
	const canvas = useRef<HTMLCanvasElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D>();
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const colorsLength = useMemo(() => colors.length, [colors]);
	const getGradient = useCallback(() => {
		const multiplier = 1.25;
		const randomness = Math.random();
		const color = colors[Math.floor(colorsLength * randomness)];
		const extendedCanvasWidth = width * multiplier;
		const quarterExtendedCanvasWidth = width * 0.25;
		const extendedCanvasHeight = height * multiplier;
		const quarterExtendedCanvasHeight = height * 0.25;
		const startPositionX =
			extendedCanvasWidth * Math.random() - quarterExtendedCanvasWidth;
		const startPositionY =
			extendedCanvasHeight * Math.random() - quarterExtendedCanvasHeight;
		const maximumDimension = Math.max(
			extendedCanvasWidth,
			extendedCanvasHeight
		);

		return {
			color,
			size: maximumDimension * randomness + maximumDimension / 2,
			opacity: 0,
			speed: Math.max(0.1, (randomness / 2) * speed),
			startPosition: [startPositionX, startPositionY],
			currentPosition: [startPositionX, startPositionY],
			targetPosition: [
				extendedCanvasWidth * Math.random() - quarterExtendedCanvasWidth,
				extendedCanvasHeight * Math.random() - quarterExtendedCanvasHeight,
			],
		};
	}, [colors, colorsLength, speed, width, height]);

	useEffect(() => {
		const gradients = Array.from({length: maximumGradientsCount}).map(() =>
			getGradient()
		);

		let currentGradientsCount = maximumGradientsCount;
		let isCancelled = false;
		let frame: number | undefined;

		function loop() {
			if (isCancelled) {
				return;
			}

			if (!context) {
				frame = requestAnimationFrame(loop);
				return;
			}

			context.clearRect(0, 0, width, height);

			for (let index = gradients.length; index; index -= 1) {
				const gradient = gradients[index - 1];
				const [startX, startY] = gradient.startPosition;
				const [currentX, currentY] = gradient.currentPosition;
				const [targetX, targetY] = gradient.targetPosition;

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
					gradients.splice(index - 1, 1);
					currentGradientsCount -= 1;
					continue;
				}

				const middleX = (startX + targetX) / 2 - startX;
				const distanceX = currentX - startX;
				const middleY = (startY + targetY) / 2 - startY;
				const distanceY = currentY - startY;
				const opacity = (distanceX / middleX + distanceY / middleY) / 2;

				gradient.opacity = opacity > 1 ? 2 - opacity : opacity;

				const radius = gradient.size / 2;
				const fill = context.createRadialGradient(
					currentX,
					currentY,
					radius,
					currentX,
					currentY,
					0
				);

				fill.addColorStop(0, `rgba(${gradient.color.join(',')},0)`);
				fill.addColorStop(
					1,
					`rgba(${gradient.color.join(',')},${gradient.opacity})`
				);

				context.fillStyle = fill;
				context.fillRect(
					currentX - radius,
					currentY - radius,
					gradient.size,
					gradient.size
				);

				if (currentX !== targetX) {
					const varianceX = Math.abs(startX - targetX);
					const varianceY = Math.abs(startY - targetY);
					const multiplier = Math.min(1, varianceX / varianceY);

					if (currentX < targetX) {
						gradient.currentPosition[0] += gradient.speed * multiplier;
					} else {
						gradient.currentPosition[0] -= gradient.speed * multiplier;
					}
				}

				if (currentY !== targetY) {
					const varianceX = Math.abs(startX - targetX);
					const varianceY = Math.abs(startY - targetY);
					const multiplier = Math.min(1, varianceY / varianceX);

					if (currentY < targetY) {
						gradient.currentPosition[1] += gradient.speed * multiplier;
					} else {
						gradient.currentPosition[1] -= gradient.speed * multiplier;
					}
				}
			}

			frame = requestAnimationFrame(loop);
		}

		frame = requestAnimationFrame(loop);

		const interval = setInterval(() => {
			let newGradientsCount = maximumGradientsCount - currentGradientsCount;

			if (newGradientsCount > 0) {
				while (newGradientsCount) {
					gradients.push(getGradient());
					newGradientsCount -= 1;
					currentGradientsCount += 1;
				}
			}
		}, 1500);

		return () => {
			isCancelled = true;

			if (frame) {
				cancelAnimationFrame(frame);
			}

			clearInterval(interval);
		};
	}, [context, width, height, maximumGradientsCount, speed, getGradient]);

	useEffect(() => {
		if (canvas.current) {
			const context = canvas.current.getContext('2d');

			if (context) {
				setContext(context);
			}

			setWidth(canvas.current.offsetWidth);
			setHeight(canvas.current.offsetHeight);
		}
	}, [canvas]);

	return (
		<canvas
			ref={canvas}
			{...{width, height}}
			style={{'--opacity': opacity} as CSSProperties}
			className={cx(
				css`
					width: 100%;
					height: 100%;
					pointer-events: none;
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					opacity: var(--opacity);

					:where([data-theme='dark']) & {
						opacity: calc(var(--opacity) / 2);
					}
				`,
				className
			)}
		/>
	);
}
