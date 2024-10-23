import React, {type ReactNode} from 'react';
import '../global.css';
import ThemeSetter from '../components/theme-setter';

type Parameters = {
	locale: string;
};

export default function Layout({
	children,
	params: {locale},
}: {
	readonly children: ReactNode;
	readonly params: Parameters;
}): ReactNode {
	return (
		<html
			suppressHydrationWarning
			lang={locale}
			data-theme-preference=""
			data-theme=""
		>
			<head>
				<ThemeSetter />
			</head>

			<body>{children}</body>
		</html>
	);
}
