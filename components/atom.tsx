import React, {
	type ElementType,
	createElement,
	type HTMLAttributes,
	type ReactNode,
} from 'react';

export type AtomProperties = HTMLAttributes<HTMLElement> & {
	readonly as?: ElementType;
};

export default function Atom({
	as = 'div',
	...properties
}: AtomProperties): ReactNode {
	return createElement(as, properties);
}
