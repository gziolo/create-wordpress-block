/**
 * Internal dependencies
 */
const prompts = require( './prompts' );

const namespace = 'create-wordpress-block';
const dashicon = 'smiley';
const category = 'widgets';

const templates = {
	es5: {
		defaultAnswers: {
			namespace,
			slug: 'example-es5',
			title: 'ES5 Example',
			description: 'Example block written with ES5 standard and no JSX – no build step required.',
			dashicon,
			category,
		},
		outputFiles: {
			'.editorconfig': 'editorconfig',
			'editor.css': 'editor-css',
			'index.js': 'index-js-es5',
			'index.php': 'index-php',
			'style.css': 'style-css',
		},
	},
	esnext: {
		defaultAnswers: {
			namespace,
			slug: 'example-esnext',
			title: 'ESNext Example',
			description: 'Example block written with ESNext standard and JSX support – build step required.',
			dashicon,
			category,
		},
		outputFiles: {
			'.editorconfig': 'editorconfig',
			'editor.css': 'editor-css',
			'index.js': 'index-js-es5',
			'index.php': 'index-php',
			'style.css': 'style-css',
		},
	},
};

const getDefaultAnswers = ( templateName ) => {
	return templates[ templateName ].defaultAnswers;
};

const getOutputFiles = ( templateName ) => {
	return templates[ templateName ].outputFiles;
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
