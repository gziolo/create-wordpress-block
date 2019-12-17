/**
 * External dependencies
 */
const program = require( 'commander' );
const inquirer = require( 'inquirer' );

/**
 * Internal dependencies
 */
const CLIError = require( './cli-error' );
const initWPScripts = require( './init-wp-scripts' );
const {
	error,
	info,
	success,
} = require( './log' );
const { name, version } = require( '../package.json' );
const scaffold = require( './scaffold' );
const {
	getDefaultAnswers,
	getOutputFiles,
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
				scaffold( getOutputFiles( template ), answers )
					.then( async () => {
						if ( template === 'esnext' ) {
							await initWPScripts( answers );
						}
					} )
					.then( () => {
						success( `Success: Created block '${ title }'.` );
					} );
			} else {
				inquirer
					.prompt( getPrompts( template ) )
					.then( async ( answers ) => {
						await scaffold( getOutputFiles( template ), answers );
						if ( template === 'esnext' ) {
							await initWPScripts( answers );
						}
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
