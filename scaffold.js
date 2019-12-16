/**
 * External dependencies
 */
const { dirname, join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );

module.exports = async function( outputFiles, {
	namespace,
	slug,
	title,
	description,
	dashicon,
	category,
} ) {
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
		Object.keys( outputFiles ).map( async ( fileName ) => {
			const template = await readFile(
				join( __dirname, `templates/${ outputFiles[ fileName ] }.mustache` ),
				'utf8'
			);
			const filePath = `${ slug }/${ fileName }`;
			await makeDir( dirname( filePath ) );
			writeFile(
				filePath,
				render( template, view )
			);
		} )
	);
};
