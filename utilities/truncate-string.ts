export default function truncateString(string: string, maximumLength?: number) {
	if (maximumLength && string.length > maximumLength + 2) {
		return `${string.slice(0, maximumLength)}…`;
	}

	return string;
}
