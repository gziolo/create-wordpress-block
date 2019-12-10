#!/usr/bin/env node
/**
 * External dependencies
 */
const inquirer = require( 'inquirer' );
const { join } = require( 'path' );
const makeDir = require( 'make-dir' );
const { readFile, writeFile } = require( 'fs' ).promises;
const { render } = require( 'mustache' );

const categories = [ 'common', 'embed', 'formatting', 'layout', 'widgets' ];

inquirer
	.prompt( [
		{
			type: 'input',
			name: 'namespace',
			message: 'The internal namespace for the block, the name of the plugin or theme:',
			default: 'create-wordpress-block',
			validate( input ) {
				if ( ! /^[a-z][a-z0-9\-]*$/.test( input ) ) {
					return 'Invalid block namespace specified. Block namespace can contain only lowercase alphanumeric characters or dashes, and start with a letter.';
				}

				return true;
			},
		},
		{
			type: 'input',
			name: 'slug',
			message: 'The internal slug for the block:',
			default: 'example-es5',
			validate( input ) {
				if ( ! /^[a-z][a-z0-9\-]*$/.test( input ) ) {
					return 'Invalid block slug specified. Block slug can contain only lowercase alphanumeric characters or dashes, and start with a letter.';
				}

				return true;
			},
		},
		{
			type: 'input',
			name: 'title',
			message: 'The display title for your block:',
			default: 'ES5 Example',
			filter( title ) {
				return title &&
					title.charAt( 0 ).toUpperCase() + title.slice( 1 );
			},
		},
		{
			type: 'input',
			name: 'description',
			message: 'The short description for your block (optional):',
			default: 'Example block written with ES5 standard and no JSX – no build required.',
			filter( title ) {
				return title &&
					title.charAt( 0 ).toUpperCase() + title.slice( 1 );
			},
		},
		{
			type: 'input',
			name: 'dashicon',
			message: 'The dashicon to make it easier to identify your block (optional):',
			default: 'smiley',
			validate( input ) {
				if ( ! /^[a-z][a-z0-9\-]*$/.test( input ) ) {
					return 'Invalid dashicon name specified. Visit https://developer.wordpress.org/resource/dashicons/ to discover available names.';
				}

				return true;
			},
			filter( dashicon ) {
				return dashicon &&
					dashicon.replace( /dashicon(s)?-/, '' );
			},
		},
		{
			type: 'list',
			name: 'category',
			message: 'The category name to help users browse and discover your block:',
			choices: categories,
			default: 'widgets',
		},
	] )
	.then( async ( {
		namespace,
		slug,
		title,
		description,
		dashicon,
		category,
	} ) => {
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
	} );
