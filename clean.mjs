/** eslint-disable no-await-in-loop */

import fs from 'node:fs/promises';
import {glob} from 'glob';
import config from './tsconfig.build.json' assert {type: 'json'};

for (const pattern of config.include) {
	const files = await glob(pattern);

	for (const file of files) {
		if (file.endsWith('.d.ts')) {
			try {
				await fs.unlink(file);
			} catch {
				console.log('- File not found:', file);
			}
		} else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
			const jsFilename = file.replace(/\.tsx?$/, '.js');

			try {
				await fs.unlink(jsFilename);
			} catch {
				console.log('- File not found:', jsFilename);
			}
		}
	}
}
