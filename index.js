#!/usr/bin/env node
/**
 * External dependencies
 */
const chalk = require( 'chalk' );
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

/**
 * Internal dependencies
 */
const { name, version } = require( './package.json' );
const scaffold = require( './scaffold' );
const { getAnswers, getPrompts } = require( './templates' );
const { startCase } = require( './utils' );

const info = ( input ) => {
	// eslint-disable-next-line no-console
	console.log( input );
};
const success = ( input ) => {
	// eslint-disable-next-line no-console
	console.log( chalk.bold.green( input ) );
};

program
	.name( name )
	.description( 'Generates PHP, JS and CSS code for registering a block for a WordPress plugin or theme.' )
	.version( version )
	.arguments( '[slug]' )
	.action( ( slug ) => {
		if ( slug ) {
			const title = startCase( slug );
			scaffold( {
				...getAnswers( 'es5' ),
				slug,
				title,
			} ).then( () => {
				success( `Success: Created block '${ title }'.` );
			} );
		} else {
			inquirer
				.prompt( getPrompts( 'es5' ) )
				.then( async ( answers ) => {
					await scaffold( answers );
					success( `Success: Created block '${ answers.title }'.` );
				} );
		}
	} );

program.on( '--help', function() {
	info( '' );
	info( 'Examples:' );
	info( `  $ ${ name }` );
	info( `  $ ${ name } todo-list` );
} );

program.parse( process.argv );
