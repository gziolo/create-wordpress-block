<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * block editor.
 *
 * @package create-wordpress-block
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function create_wordpress_block_es5_example_block_init() {
	$dir = dirname( __FILE__ );

	$index_js = 'index.js';
	wp_register_script(
		'es5-example-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'editor.css';
	wp_register_style(
		'es5-example-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'style.css';
	wp_register_style(
		'es5-example-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'create-wordpress-block/es5-example', array(
		'editor_script' => 'es5-example-block-editor',
		'editor_style'  => 'es5-example-block-editor',
		'style'         => 'es5-example-block',
	) );
}
add_action( 'init', 'create_wordpress_block_es5_example_block_init' );
