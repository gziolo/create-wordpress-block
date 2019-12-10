# Create WordPress Block
Generates PHP, JS and CSS code for registering a block for a WordPress plugin or theme.

## Description

Blocks are the fundamental element of the WordPress block editor. They are the primary way in which plugins and themes can register their own functionality and extend the capabilities of the editor.

Visit the [Gutenberg handbook](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/) to learn more about Block API.

## Usage

The following command generates PHP, JS and CSS code for registering a block.

```bash
$ npm init wordpress-block [options] [slug]
```

Options:
```bash
[slug]         the target location for scaffolded files and internal block name
-V, --version  output the version number
-h, --help     output usage information
```

Examples:

1. Quick start – one command that uses defaults for all options. You just need
to provide the `slug` which is the target location for scaffolded files
and the internal block name.

  ```bash
  $ npm init wordpress-block todo-list
  $ cd todo-list
  ```

2. Interactive mode - it gives a chance to customize a few most important options.

  ```bash
  $ npm init wordpress-block
  ```

When you scaffold a block, you must provide at least a `slug` name, the `namespace`
which usually corresponds to either the `theme` or `plugin` name, and the `category`. In most cases,
we recommended pairing blocks with plugins rather than themes, because only using
plugin ensures that all blocks still work when your theme changes.

## WP-CLI

Another way of making a developer’s life easier is to use [WP-CLI](https://wp-cli.org),
which provides a command-line interface for many actions you might perform on
the WordPress instance. One of the commands `wp scaffold block` was used as
the baseline for this tool.

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
