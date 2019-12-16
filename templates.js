/**
 * Internal dependencies
 */
const CliError = require( './cli-error' );
const prompts = require( './prompts' );

const namespace = 'create-wordpress-block';
const dashicon = 'smiley';
const category = 'widgets';

const templates = {
	es5: {
		defaultAnswers: {
			namespace,
			slug: 'es5-example',
			title: 'ES5 Example',
			description: 'Example block written with ES5 standard and no JSX – no build step required.',
			dashicon,
			category,
		},
		outputFiles: {
			'.editorconfig': 'editorconfig',
			'editor.css': 'editor-css',
			'index.js': 'es5/index-js',
			'index.php': 'index-php',
			'style.css': 'style-css',
		},
	},
	esnext: {
		defaultAnswers: {
			namespace,
			slug: 'esnext-example',
			title: 'ESNext Example',
			description: 'Example block written with ESNext standard and JSX support – build step required.',
			dashicon,
			category,
		},
		outputFiles: {
			'.editorconfig': 'editorconfig',
			'editor.css': 'editor-css',
			'index.js': 'esnext/index-js',
			'index.php': 'index-php',
			'style.css': 'style-css',
		},
	},
};

const getTemplate = ( templateName ) => {
	if ( ! templates[ templateName ] ) {
		throw new CliError(
			'Invalid template type name.' +
			` Allowed values: ${ Object.keys( templates ).join( ', ' ) }.`
		);
	}
	return templates[ templateName ];
};

const getDefaultAnswers = ( templateName ) => {
	return getTemplate( templateName ).defaultAnswers;
};

const getOutputFiles = ( templateName ) => {
	return getTemplate( templateName ).outputFiles;
};

const getPrompts = ( templateName ) => {
	const defaultAnswers = getDefaultAnswers( templateName );
	return Object.keys( prompts ).map( ( promptName ) => {
		return {
			...prompts[ promptName ],
			default: defaultAnswers[ promptName ],
		};
	} );
};

module.exports = {
	getDefaultAnswers,
	getOutputFiles,
	getPrompts,
};
