/* eslint-disable no-console */
/**
 * External dependencies
 */
const chalk = require( 'chalk' );

const error = ( input ) => {
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

module.exports = {
	error,
	info,
	success,
};
