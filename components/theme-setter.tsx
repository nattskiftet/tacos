'use client';

import React, {type ReactNode, useEffect, useState} from 'react';

export const themePreferences = ['system', 'light', 'dark'];
type ThemePreference = (typeof themePreferences)[number];

export function useTheme(): string {
	const [theme, setTheme] = useState<ThemePreference>('light');

	useEffect(() => {
		const listener = () => {
			if (document.documentElement.dataset.theme) {
				setTheme(document.documentElement.dataset.theme);
			}
		};

		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.type === 'attributes') {
					listener();
				}
			}
		});

		listener();
		observer.observe(document.documentElement, {attributes: true});

		return () => {
			observer.disconnect();
		};
	}, []);

	return theme;
}

const script = `
	try {
		var themePreference = window.localStorage.getItem("theme-preference") || "system";
		
		if (themePreference) {
			document.documentElement.setAttribute("data-theme-preference", themePreference);
		}

		var query = window.matchMedia("(prefers-color-scheme: dark)");

		document.documentElement.setAttribute(
			"data-theme", 
			(themePreference === "system") 
				? query.matches ? "dark" : "light" 
				: themePreference
		);
	} catch (error) {
		console.error(error);
	}
`
	.trim()
	.replaceAll(/\s+/g, ' ');

export function getThemePreference() {
	const preference =
		window.localStorage.getItem('theme-preference') ?? 'system';
	return themePreferences.includes(preference) ? preference : 'system';
}

export function setThemePreference(preference: ThemePreference) {
	const themePreference = themePreferences.includes(preference)
		? preference
		: 'system';

	window.localStorage.setItem('theme-preference', themePreference);
	document.documentElement.dataset.themePreference = themePreference;

	if (themePreference === 'system') {
		const query = window.matchMedia('(prefers-color-scheme: dark)');
		document.documentElement.dataset.theme = query.matches ? 'dark' : 'light';
	} else {
		document.documentElement.dataset.theme = themePreference;
	}
}

export default function ThemeSetter(): ReactNode {
	useEffect(() => {
		const themePreference = getThemePreference();

		if (themePreference) {
			document.documentElement.dataset.themePreference = themePreference;
		}

		const observer = window.matchMedia('(prefers-color-scheme: dark)');

		if (themePreference === 'system') {
			document.documentElement.dataset.theme = observer.matches
				? 'dark'
				: 'light';
		} else {
			document.documentElement.dataset.theme = themePreference;
		}

		const listener = (query: MediaQueryListEvent) => {
			if (document.documentElement.dataset.themePreference === 'system') {
				document.documentElement.dataset.theme = query.matches
					? 'dark'
					: 'light';
			}
		};

		observer.addEventListener('change', listener);

		return () => {
			observer.removeEventListener('change', listener);
		};
	}, []);

	return (
		/* eslint-disable-next-line react/no-danger */
		<script dangerouslySetInnerHTML={{__html: script}} id="theme-setter" />
	);
}
