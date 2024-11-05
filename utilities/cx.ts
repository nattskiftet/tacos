export type CxClassName = string | false | undefined;

const cx = (...classNames: CxClassName[]): string =>
	classNames.filter(Boolean).join(' ');

export default cx;
