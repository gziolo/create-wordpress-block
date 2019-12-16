# Create WordPress Block
Generates PHP, JS and CSS code for registering a block for a WordPress plugin or theme.

![Create example block – demo](./assets/create-wordpress-block.gif)

## Description

Blocks are the fundamental element of the WordPress block editor. They are the primary way in which plugins and themes can register their own functionality and extend the capabilities of the editor.

Visit the [Gutenberg handbook](https://developer.wordpress.org/block-editor/developers/block-api/block-registration/) to learn more about Block API.

## Usage

The following command generates PHP, JS and CSS code for registering a block.

```bash
$ npm init wordpress-block [options] [slug]
```

`[slug]` is optional. When provided it triggers the quick mode where it is used as the target location for scaffolded files and the internal block name. The rest of the configuration is set to all default values.

Options:
```bash
-t, --template <name>  template type name, allowed values: "es5", "esnext" (default: "esnext")
-V, --version          output the version number
-h, --help             output usage information
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
3. ES5 template – it is also possible to pick ES5 template when you don't want
to deal with a build step which enables ESNext and JSX support.
  ```bash
  $ npm init --template es5 wordpress-block
  ```

When you scaffold a block, you must provide at least a `slug` name, the `namespace`
which usually corresponds to either the `theme` or `plugin` name, and the `category`. In most cases,
we recommended pairing blocks with plugins rather than themes, because only using
plugin ensures that all blocks still work when your theme changes.

## WP-CLI

Another way of making a developer’s life easier is to use [WP-CLI](https://wp-cli.org),
which provides a command-line interface for many actions you might perform on
the WordPress instance. One of the commands `wp scaffold block` was used as
the baseline for this tool and ES5 template in particular.

<br/><br/><p align="center"><img src="https://s.w.org/style/images/codeispoetry.png?1" alt="Code is Poetry." /></p>
