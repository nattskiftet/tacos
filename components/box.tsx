import {css} from '@kuma-ui/core';
import React, {type ReactNode} from 'react';
import cx from '../utilities/cx';
import Atom, {type AtomProperties} from './atom';

export default function Box({
	className,
	direction,
	alignment,
	...properties
}: {
	readonly className?: string;
	readonly direction?: 'row' | 'column';
	readonly alignment?: 'start' | 'center' | 'end';
} & AtomProperties): ReactNode {
	return (
		<Atom
			{...properties}
			className={cx(
				css`
					display: flex;
					flex-wrap: wrap;
				`,
				direction === 'column' &&
					css`
						flex-direction: column;
					`,
				alignment === 'start' &&
					css`
						align-items: flex-start;
						justify-content: flex-start;
					`,
				alignment === 'center' &&
					css`
						align-items: center;
						justify-content: center;
					`,
				alignment === 'end' &&
					css`
						align-items: flex-end;
						justify-content: flex-end;
					`,
				className
			)}
		/>
	);
}
