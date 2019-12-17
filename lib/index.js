/**
 * External dependencies
 */
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

/**
 * Internal dependencies
 */
const CLIError = require( './cli-error' );
const {
	error,
	info,
} = require( './log' );
const { name, version } = require( '../package.json' );
const scaffold = require( './scaffold' );
const {
	getDefaultAnswers,
	getPrompts,
} = require( './templates' );
const { startCase } = require( './utils' );

program
	.name( name )
	.description(
		'Generates PHP, JS and CSS code for registering a block for a WordPress plugin or theme.\n\n' +
		'[slug] is optional. When provided it triggers the quick mode where it is used as the target location for scaffolded files and the internal block name. The rest of the configuration is set to all default values.'
	)
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
				Promise.resolve()
					.then( async () => {
						await scaffold( template, answers );
					} );
			} else {
				inquirer
					.prompt( getPrompts( template ) )
					.then( async ( answers ) => {
						await scaffold( template, answers );
					} );
			}
		} catch ( e ) {
			if ( e instanceof CLIError ) {
				info( '' );
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
