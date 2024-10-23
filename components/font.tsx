import React from 'react';
import {Inter as interFont} from 'next/font/google';
import Atom, {type AtomProperties} from './atom';
import { cx } from '@linaria/core';

export const inter = interFont({subsets: ['latin'], display: 'swap'});
export const fontFamilyStyles = inter.className;

export default function Font(properties: AtomProperties) {
	return (
		<Atom
			{...properties}
			className={cx(fontFamilyStyles, properties.className)}
		/>
	);
}
