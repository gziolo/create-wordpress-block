const inquirer = require( 'inquirer' );

const categories = [ 'common', 'embed', 'formatting', 'layout', 'widgets' ];

inquirer
	.prompt( [
        {
            type: 'input',
            name: 'slug',
            message: 'The internal name of the block',
        },
        {
            type: 'input',
            name: 'namespace',
            message: 'The internal namespace for the block',
        },
        {
            type: 'input',
            name: 'title',
            message: 'The display title for your block',
        },
        {
            type: 'input',
            name: 'description',
            message: 'The short description for your block',
        },
        {
            type: 'input',
            name: 'dashicon',
            message: 'The dashicon to make it easier to identify your block'
        },
		{
			type: 'list',
			name: 'category',
			message: 'The category name to help users browse and discover your block',
            choices: categories,
		},
	] )
	.then( ( answers ) => {
		console.log( JSON.stringify( answers, null, '  ' ) );
	} );
