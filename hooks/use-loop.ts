import {useEffect} from 'react';

export type LoopResponse = () => void;

export default function useLoop(
	call: (response: LoopResponse) => void,
	delay: number
) {
	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		let frame: number | undefined;

		const loop = () => {
			frame = requestAnimationFrame(() => {
				call(() => {
					timeout = setTimeout(
						() => {
							loop();
						},
						1000 * 6 * 2
					);
				});
			});
		};

		loop();

		return () => {
			clearTimeout(timeout);

			if (frame) {
				cancelAnimationFrame(frame);
			}
		};
	}, [call, delay]);
}
