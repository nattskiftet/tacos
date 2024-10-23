export default function machineString(input: string, separator = '_') {
	return input
		.toLowerCase()
		.normalize('NFD')
		.replaceAll('ø', 'o')
		.replaceAll(/[æǣǽ]/g, 'ae')
		.replaceAll(/[\u0300-\u036F]/g, '')
		.replaceAll(/[^a-z\d]/g, ' ')
		.replaceAll(/\s+/g, ' ')
		.trim()
		.replaceAll(/[^a-z\d]/g, separator);
}
