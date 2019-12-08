const inquirer = require( 'inquirer' );

const categories = [ 'common', 'embed', 'formatting', 'layout', 'widgets' ];

inquirer
	.prompt( [
        {
            type: 'input',
            name: 'namespace',
            message: 'The internal namespace for the block, the name of the plugin or theme',
            default: 'create-wordpress-block',
        },
        {
            type: 'input',
            name: 'slug',
            message: 'The internal name for the block',
            default: 'es5-demo',
        },
        {
            type: 'input',
            name: 'title',
            message: 'The display title for your block',
            default: 'ES5 Demo',
        },
        {
            type: 'input',
            name: 'description',
            message: 'The short description for your block (optional)',
            default: 'Demo block written with ES5 standard and no JSX. No build step required.'
        },
        {
            type: 'input',
            name: 'dashicon',
            message: 'The dashicon to make it easier to identify your block (optional)',
            default: 'smiley',
        },
		{
			type: 'list',
			name: 'category',
			message: 'The category name to help users browse and discover your block',
            choices: categories,
            default: 'common',
		},
	] )
	.then( ( answers ) => {
		console.log( JSON.stringify( answers, null, '  ' ) );
	} );
