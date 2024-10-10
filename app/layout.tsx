import React, {type ReactNode} from 'react';
import {KumaRegistry} from '@kuma-ui/next-plugin/registry';
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

			<body>
				<KumaRegistry>{children}</KumaRegistry>
			</body>
		</html>
	);
}
