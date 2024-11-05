import React, {type ReactNode} from 'react';
import {css} from '@kuma-ui/core';

export const ariaTextStyles = css`
	width: 1px;
	height: 1px;
	white-space: nowrap;
	white-space: nowrap;
	padding: 0;
	margin: -1px;
	border: 0;
	position: absolute;
	overflow: hidden;
	clip: rect(0 0 0 0);
	clip: rect(0, 0, 0, 0);
	word-wrap: normal;
`;

export default function AriaText(properties: {
	children?: ReactNode;
}): ReactNode {
	return <span {...properties} className={ariaTextStyles} />;
}
