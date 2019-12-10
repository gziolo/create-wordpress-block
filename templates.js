/**
 * Internal dependencies
 */
const prompts = require( './prompts' );

const namespace = 'create-wordpress-block';
const dashicon = 'smiley';
const category = 'widgets';

const templates = {
	es5: {
		namespace,
		slug: 'example-es5',
		title: 'ES5 Example',
		description: 'Example block written with ES5 standard and no JSX – no build required.',
		dashicon,
		category,
	},
};

const getAnswers = ( templateName ) => {
	return templates[ templateName ];
};

const getPrompts = ( templateName ) => {
	const template = templates[ templateName ];
	return Object.keys( template ).map( ( promptName ) => {
		return {
			...prompts[ promptName ],
			default: template[ promptName ],
		};
	} );
};

module.exports = {
	getAnswers,
	getPrompts,
};
