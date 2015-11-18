# grunt-svg-symbols

> Generate an SVG icon system (based on `<symbol>`) of a specified folder

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svg-symbols --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg-symbols');
```

## The "svg_symbols" task

### Overview
In your project's Gruntfile, add a section named `svg_symbols` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  svg_symbols: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.precision
Type: `Number`
Default value: `1`

Specify the float precision used while optimizing.

### Examples

```js
grunt.initConfig({
  svg_symbols: {
    options: {
      precision: 2
    },
    files: {
      'icons.svg': ['**/*.svg'],
    },
  },
});
```
