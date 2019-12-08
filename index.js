/**
 * External dependencies
 */
const inquirer = require( 'inquirer' );
const { readFile } = require( 'fs' ).promises;
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
			default: 'es5-demo',
		},
		{
			type: 'input',
			name: 'title',
			message: 'The display title for your block',
			default: 'ES5 Demo',
		},
		{
			type: 'input',
			name: 'description',
			message: 'The short description for your block (optional)',
			default: 'Demo block written with ES5 standard and no JSX – no build required.',
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
		const template = await readFile( './templates/index-js-es5.mustache', 'utf8' );
		console.log( render( template, answers ) );
	} );
