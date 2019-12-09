/**
 * External dependencies
 */
const inquirer = require( 'inquirer' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );

const categories = [ 'common', 'embed', 'formatting', 'layout', 'widgets' ];

inquirer
	.prompt( [
		{
			type: 'input',
			name: 'namespace',
			message: 'The internal namespace for the block, the name of the plugin or theme',
			default: 'create-wordpress-block',
		},
		{
			type: 'input',
			name: 'slug',
			message: 'The internal name for the block',
			default: 'example-es5',
		},
		{
			type: 'input',
			name: 'title',
			message: 'The display title for your block',
			default: 'ES5 Example',
		},
		{
			type: 'input',
			name: 'description',
			message: 'The short description for your block (optional)',
			default: 'Example block written with ES5 standard and no JSX – no build required.',
		},
		{
			type: 'input',
			name: 'dashicon',
			message: 'The dashicon to make it easier to identify your block (optional)',
			default: 'smiley',
		},
		{
			type: 'list',
			name: 'category',
			message: 'The category name to help users browse and discover your block',
			choices: categories,
			default: 'common',
		},
	] )
	.then( async ( answers ) => {
		const { slug } = answers;
		await makeDir( slug );
		const jsTemplate = await readFile( './templates/index-js-es5.mustache', 'utf8' );
		writeFile( `${ slug }/index.js`, render( jsTemplate, answers ) );
		const editorCssTemplate = await readFile( './templates/editor-css.mustache', 'utf8' );
		writeFile( `${ slug }/editor.css`, render( editorCssTemplate, answers ) );
	} );
