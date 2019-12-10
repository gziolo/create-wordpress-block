#!/usr/bin/env node
/**
 * External dependencies
 */
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

/**
 * Internal dependencies
 */
const scaffold = require( './scaffold' );
const { getAnswers, getPrompts } = require( './templates' );

program
	.version( '0.1.0' )
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

program.parse( process.argv );
