'use client';

import React, {type ReactNode} from 'react';
import {
	Button as AriaButton,
	Link as AriaLink,
	type ButtonProps,
	type LinkProps,
} from 'react-aria-components';
import {css} from '@kuma-ui/core';
import {SkeletonInstance} from './skeleton';
import LoadingSpinner from './loading';
import {fontFamilyStyles} from './font';
import Box from './box';
import MovingGradients from './moving-gradients';
import MovingStars from './moving-stars';
import cx from '@/utilities/cx';

function ButtonIcon({
	iconLeft,
	iconRight,
}: {
	readonly iconLeft?: ReactNode;
	readonly iconRight?: ReactNode;
}) {
	if (!iconLeft && !iconRight) {
		return null;
	}

	return (
		<div
			className={cx(
				css`
					color: var(--foreground-color);
					width: 0.9em;
					height: 0.9em;
					position: relative;
					display: inline-flex;
					margin: auto;
				`,
				Boolean(iconLeft) &&
					css`
						left: -0.25em;
					`,
				Boolean(iconRight) &&
					css`
						right: -0.25em;
					`
			)}
		>
			{iconLeft ?? iconRight}
		</div>
	);
}

export const buttonResetStyles = cx(
	fontFamilyStyles,
	css`
		appearance: none;
		background: transparent;
		text-align: left;
		font-size: 16px;
		line-height: 1em;
		color: var(--foreground-color);
		letter-spacing: normal;
		text-indent: 0;
		word-spacing: normal;
		border: 0;
		margin: 0;
		padding: 0;
		cursor: pointer;
		vertical-align: top;

		:where([dir='rtl']) & {
			text-align: right;
		}
	`
);

const primaryStyles = css`
	--border-radius: 20px;
	background: var(--primary-color);
	padding: var(--half-indent) var(--indent);
	border-radius: var(--border-radius);

	--text-shadow-color: rgba(0, 0, 0, 0.2);
	--highlight-shadow-color: rgba(255, 255, 255, 0.075);
	--outline-shadow-color: rgba(0, 0, 0, 0.3);
	--foreground-color: #fff;
	text-shadow: 0 1px 0 var(--text-shadow-color);

	:where([data-theme='dark']) & {
		--highlight-shadow-color: rgba(0, 0, 0, 0.075);
		--outline-shadow-color: rgba(255, 255, 255, 0.125);
	}

	&:focus {
		outline: none;
	}

	&:focus-visible {
		outline: normal;
	}

	&:after {
		--offset: 1px;
		content: '';
		background: rgba(255, 255, 255, 0);
		position: absolute;
		top: var(--offset);
		right: var(--offset);
		bottom: var(--offset);
		left: var(--offset);
		border-radius: var(--border-radius);
		transition: background-color 0.37s;
		box-shadow:
			0 0 0 1px var(--outline-shadow-color),
			inset 0 0 0 1px var(--highlight-shadow-color);
		pointer-events: none;
		z-index: 1;
	}

	@media (hover: hover) {
		&:hover {
			transition-duration: 0.1s;
		}

		&:hover:after {
			background-color: rgba(255, 255, 255, 0.06);
			transition-duration: 0.1s;

			[data-theme='dark'] & {
				background-color: rgba(255, 255, 255, 0.04);
			}
		}
	}
`;

const secondaryStyles = cx(
	primaryStyles,
	css`
		background-color: var(--secondary-color);
	`
);

const primaryWrapperStyles = css`
	--border-radius: 20px;
`;

const secondaryWrapperStyles = primaryWrapperStyles;

const buttonOverlayStyles = css`
	--offset: 0px;
	border-radius: var(--border-radius);
	position: absolute;
	top: var(--offset);
	left: var(--offset);
	right: var(--offset);
	bottom: var(--offset);
	pointer-events: none;
`;

export type ButtonProperties = (ButtonProps | LinkProps) & {
	readonly className?: string;
	readonly children?: ReactNode;
	readonly variant?: 'stripped' | 'primary' | 'secondary';
	readonly iconLeft?: ReactNode;
	readonly iconRight?: ReactNode;
	readonly isLoading?: boolean;
	readonly isSkeleton?: boolean;
	readonly hasMovingGradients?: boolean;
	readonly movingGradientsCount?: number;
	readonly hasMovingStars?: boolean;
	readonly movingStarsCount?: number;
};

export default function Button({
	className,
	children: inputChildren,
	variant = 'primary',
	iconLeft,
	iconRight,
	isLoading,
	isSkeleton,
	hasMovingGradients = false,
	movingGradientsCount = 4,
	hasMovingStars = false,
	movingStarsCount = 10,
	...properties
}: ButtonProperties): ReactNode {
	const classNames = cx(
		buttonResetStyles,
		css`
			font-weight: calc(500 + var(--font-weight-modifier));
			position: relative;

			&:not([disabled]):active {
				transform: scale(0.98);
				transition-duration: 0.1s;
			}

			@media (hover: hover) {
				&:hover {
					text-decoration: underline;
				}
			}
		`,
		variant === 'primary' && primaryStyles,
		variant === 'secondary' && secondaryStyles,
		isSkeleton &&
			css`
				visibility: hidden;
			`
	);

	const showMovingGradients = hasMovingGradients && movingGradientsCount > 0;
	const showMovingStars = hasMovingStars && movingStarsCount > 0;

	const children = (
		<>
			<Box
				className={css`
					position: relative;
					z-index: 1;
					gap: 0.15em;
				`}
			>
				<ButtonIcon iconLeft={iconLeft} />
				{inputChildren}
				<ButtonIcon iconRight={iconRight} />
			</Box>

			{(showMovingGradients ?? showMovingStars) ? (
				<div
					className={cx(
						buttonOverlayStyles,
						css`
							overflow: hidden;
						`
					)}
				>
					{showMovingGradients ? (
						<MovingGradients
							maxGradientsCount={movingGradientsCount}
							opacity={1}
						/>
					) : null}

					{showMovingStars ? (
						<MovingStars
							maxStarsCount={movingStarsCount}
							className={css`
								color: white;
							`}
						/>
					) : null}
				</div>
			) : null}
		</>
	);

	const component =
		'href' in properties ? (
			<AriaLink
				{...(properties as LinkProps)}
				className={cx(
					classNames,
					css`
						text-decoration: none;
						display: inline-flex;
					`
				)}
			>
				{children}
			</AriaLink>
		) : (
			<AriaButton
				{...(properties as ButtonProps)}
				isDisabled={
					Boolean(isLoading) || Boolean(isSkeleton) || properties.isDisabled
				}
				className={classNames}
			>
				{children}
			</AriaButton>
		);

	return (
		<div
			className={cx(
				css`
					position: relative;
					display: inline-flex;
				`,
				variant === 'primary' && primaryWrapperStyles,
				variant === 'secondary' && secondaryWrapperStyles
			)}
		>
			{component}

			<div
				className={cx(
					buttonOverlayStyles,
					css`
						--offset: 1px;
						--blur: 25px;
						background-color: rgba(0, 0, 0, 0.2);
						backdrop-filter: blur(var(--blur));
						-webkit-backdrop-filter: blur(var(--blur));
						box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
						box-sizing: border-box;
						text-align: center;
						opacity: 0;
						transition: opacity 0.37s;
						z-index: 1;
					`,
					isLoading &&
						css`
							opacity: 1;
							transition-duration: 0.2s;
						`
				)}
			>
				{isLoading ? (
					<div
						className={css`
							display: inline-flex;
							position: absolute;
							top: round(50%, 1px);
							left: round(50%, 1px);
							transform: translate(-50%, -50%);
						`}
					>
						<LoadingSpinner
							size={variant === 'stripped' ? 10 : undefined}
							strokeWidth={variant === 'stripped' ? 1.5 : undefined}
							className={css`
								--color: #fff;

								svg {
									filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.3))
										drop-shadow(0 0 1px rgba(0, 0, 0, 0.4));
								}
							`}
						/>
					</div>
				) : null}
			</div>

			{isSkeleton ? <SkeletonInstance className={buttonOverlayStyles} /> : null}
		</div>
	);
}
