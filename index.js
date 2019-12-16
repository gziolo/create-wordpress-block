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
const CLIError = require( './cli-error' );
const { name, version } = require( './package.json' );
const scaffold = require( './scaffold' );
const {
	getDefaultAnswers,
	getOutputFiles,
	getPrompts,
} = require( './templates' );
const { startCase } = require( './utils' );

const error = ( input ) => {
	// eslint-disable-next-line no-console
	console.log( chalk.bold.red( input ) );
};

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
	.option( '-t, --template <name>', 'template type name, allowed values: "es5", "esnext"', 'esnext' )
	.action( ( slug, { template } ) => {
		try {
			if ( slug ) {
				const defaultAnswers = getDefaultAnswers( template );
				const title = defaultAnswers.slug === slug ?
					defaultAnswers.title :
					startCase( slug.replace( /-/, ' ' ) );
				const answers = {
					...defaultAnswers,
					slug,
					title,
				};
				scaffold( getOutputFiles( template ), answers )
					.then( () => {
						success( `Success: Created block '${ title }'.` );
					} );
			} else {
				inquirer
					.prompt( getPrompts( template ) )
					.then( async ( answers ) => {
						await scaffold( getOutputFiles( template ), answers );
						success( `Success: Created block '${ answers.title }'.` );
					} );
			}
		} catch ( e ) {
			if ( e instanceof CLIError ) {
				error( e.message );
				process.exit( 1 );
			} else {
				throw e;
			}
		}
	} );

program.on( '--help', function() {
	info( '' );
	info( 'Examples:' );
	info( `  $ ${ name }` );
	info( `  $ ${ name } todo-list` );
	info( `  $ ${ name } --template es5 todo-list` );
} );

program.parse( process.argv );
