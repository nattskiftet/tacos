/* eslint-disable no-await-in-loop, unicorn/prefer-top-level-await */

const fs = require('node:fs/promises');
const {glob} = require('glob');
const config = require('./tsconfig.build.json');

(async () => {
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
})();
