export default async function copyToClipboard(text: string) {
	try {
		await window.navigator.clipboard.writeText(text);
		return;
	} catch {
		// ... do nothing
	}

	const textarea = document.createElement('textarea');

	textarea.style.background = 'transparent';
	textarea.style.width = '1px';
	textarea.style.height = '1px';
	textarea.style.fontSize = '12pt';
	textarea.style.padding = '0';
	textarea.style.border = 'none';
	textarea.style.outline = 'none';
	textarea.style.appearance = 'none';
	textarea.style.position = 'fixed';
	textarea.style.bottom = '0';
	textarea.style.right = '0';

	textarea.setAttribute('readonly', 'false');
	textarea.setAttribute('contenteditable', 'true');
	textarea.setAttribute('aria-hidden', 'true');

	document.body.append(textarea);
	textarea.value = text;

	try {
		textarea.select();

		try {
			const range = document.createRange();
			range.selectNodeContents(textarea);

			const selection = window.getSelection();

			if (selection) {
				selection.removeAllRanges();
				selection.addRange(range);
			}

			textarea.setSelectionRange(0, text.length);
		} catch {
			// ... do nothing
		}

		const success = document.execCommand('copy');

		if (!success) {
			throw new Error('Unable to copy text.');
		}
	} catch {
		throw new Error('Could not copy text.');
	}
}
