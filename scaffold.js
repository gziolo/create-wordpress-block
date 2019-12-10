/**
 * External dependencies
 */
const { join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );

module.exports = async function( {
	namespace,
	slug,
	title,
	description,
	dashicon,
	category,
} ) {
	await makeDir( slug );

	const templates = {
		'.editorconfig': 'editorconfig',
		'editor.css': 'editor-css',
		'index.js': 'index-js-es5',
		'index.php': 'index-php',
		'style.css': 'style-css',
	};
	const view = {
		namespace,
		slug,
		plugin: namespace,
		machineName: `${ namespace }_${ slug }`.replace( /\-/g, '_' ),
		title,
		description,
		dashicon,
		category,
	};

	await Promise.all(
		Object.keys( templates ).map( async ( fileName ) => {
			const template = await readFile(
				join( __dirname, `templates/${ templates[ fileName ] }.mustache` ),
				'utf8'
			);
			writeFile(
				`${ slug }/${ fileName }`,
				render( template, view )
			);
		} )
	);
};
