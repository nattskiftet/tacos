# Tacos

Boostrap a Next.js project with components, API routes, and utilities.

## Usage

In a Next.js project:

```bash
npm i tacos
```

### Theme (light/dark modes)

Comes with support for `dark` and `light` themes, and `system` for the current user agent theme. To set it up, in `app/layout.tsx`, add the `ThemeSetter` component within `<head>`, and `suppressHydrationWarning`, `data-theme-preference=""`, and `data-theme=""` on `<html>`:

```tsx
import ThemeSetter from 'tacos/components/theme-setter';

export default function Layout() {
	return (
		<html suppressHydrationWarning data-theme-preference="" data-theme="">
			<head>
				<ThemeSetter />
			</head>

			{/* ... */}
		</html>
	);
}
```

Then, within your CSS, you can do the following:

```css
.component {
	color: black;

	:where([data-theme='dark']) & {
		color: white;
	}
}
```

#### Use the current theme

```tsx
import {useTheme} from 'tacos/components/theme-setter';

function Component() {
	const theme = useTheme();
	console.log(theme); // > dark
}
```

#### Change theme preference

```tsx
import {setThemePreference} from 'tacos/components/theme-setter';

function Component() {
	const handleClick = useCallback(() => {
		setThemePreference('dark');
	}, []);

	return <button onClick={handleClick}>Use dark mode</button>;
}
```
