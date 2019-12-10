#!/usr/bin/env node
/**
 * External dependencies
 */
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

/**
 * Internal dependencies
 */
const { name, version } = require( './package.json' );
const scaffold = require( './scaffold' );
const { getAnswers, getPrompts } = require( './templates' );

program
	.name( name )
	.description( 'Generates PHP, JS and CSS code for registering a block for a WordPress plugin or theme.' )
	.version( version )
	.arguments( '[slug]' )
	.action( ( slug ) => {
		if ( slug ) {
			scaffold( {
				...getAnswers( 'es5' ),
				slug,
			} );
		} else {
			inquirer
				.prompt( getPrompts( 'es5' ) )
				.then( scaffold );
		}
	} );

program.on( '--help', function() {
	console.log( '' );
	console.log( 'Examples:' );
	console.log( `  $ ${ name }` );
	console.log( `  $ ${ name } todo-list` );
} );

program.parse( process.argv );
