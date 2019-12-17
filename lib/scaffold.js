/**
 * External dependencies
 */
const { dirname, join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );

/**
 * Internal dependencies
 */
const initWPScripts = require( './init-wp-scripts' );
const { clear, info, success } = require( './log' );
const { hasWPScriptsEnabled, getOutputFiles } = require( './templates' );

module.exports = async function( templateName, {
	namespace,
	slug,
	title,
	description,
	dashicon,
	category,
} ) {
	clear();
	info( `Creating a new WordPress block in "./${ slug }" folder.` );

	const outputFiles = getOutputFiles( templateName );
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

	if ( hasWPScriptsEnabled( templateName ) ) {
		await initWPScripts( view );
	}

	clear();
	success( `Done: block '${ title }' bootstrapped.` );
};
