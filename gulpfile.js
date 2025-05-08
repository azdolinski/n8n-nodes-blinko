const path = require('path');
const { task, src, dest } = require('gulp');
const fs = require('fs');

task('build:icons', copyIcons);

function copyIcons() {
	// First copy from the root directory
	src('./*.{png,svg}', { encoding: false }).pipe(dest('./dist/'), { encoding: false });

	// Then copy from the nodes directory to multiple locations
	return src('./*.{png,svg}', { encoding: false })
		.pipe(dest('./dist/credentials/'), { encoding: false }) // Credentials location
		.pipe(dest('./dist/icons/'), { encoding: false }) // Standard location
		.pipe(dest('./dist/'), { encoding: false }) // Root location
		.pipe(dest('./dist/nodes/'), { encoding: false }) // Nodes location
		.pipe(dest('./dist/nodes/Blinko/'), { encoding: false }); // Nodes location
}

exports['build:icons'] = copyIcons;