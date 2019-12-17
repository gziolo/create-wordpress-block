/**
 * External dependencies
 */
const { command } = require( 'execa' );
const { install } = require( 'pkg-install' );
const { join } = require( 'path' );
const writePkg = require( 'write-pkg' );

module.exports = async function( { slug, title } ) {
	const cwd = join( process.cwd(), slug );
	await writePkg( cwd, {
		name: slug,
		version: '0.0.1',
		description: title,
		author: 'The WordPress Contributors',
		license: 'GPL-2.0-or-later',
		main: 'build/index.js',
		scripts: {
			build: 'wp-scripts build',
			'lint-css': 'wp-scripts lint-style',
			'lint-js': 'wp-scripts lint-js',
			start: 'wp-scripts start',
		},
	} );
	await install( [
		'@wordpress/scripts',
	], {
		cwd,
		dev: true,
		prefer: 'npm',
	} );
	await command( 'npm run build', {
		cwd,
		localDir: cwd,
	} );
};
