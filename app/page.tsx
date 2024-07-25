import {css} from '@kuma-ui/core';
import React, {type ReactNode} from 'react';
import Button from '@/components/button';

export default function Home(): ReactNode {
	return (
		<main
			className={css`
				padding: 10px;
			`}
		>
			<Button>Hello</Button>
		</main>
	);
}
