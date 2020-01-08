/**
 * External dependencies
 */
const { command } = require( 'execa' );
const { install } = require( 'pkg-install' );
const { join } = require( 'path' );
const writePkg = require( 'write-pkg' );

/**
 * Internal dependencies
 */
const { info } = require( './log' );

module.exports = async function( { author, license, slug, title, version } ) {
	const cwd = join( process.cwd(), slug );

	info( '' );
	info( 'Creating a "package.json" file.' );
	await writePkg( cwd, {
		name: slug,
		version,
		description: title,
		author,
		license,
		main: 'build/index.js',
		scripts: {
			build: 'wp-scripts build',
			'lint:css': 'wp-scripts lint-style',
			'lint:js': 'wp-scripts lint-js',
			start: 'wp-scripts start',
		},
	} );

	info( '' );
	info( 'Installing packages. It might take a couple of minutes.' );
	await install( [
		'@wordpress/scripts',
	], {
		cwd,
		dev: true,
		prefer: 'npm',
	} );

	info( '' );
	info( 'Compiling block.' );
	await command( 'npm run build', {
		cwd,
	} );
};
