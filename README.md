# grunt-svg-symbols

> Generate an SVG icon system (based on `<symbol>`) of a specified folder

## Getting Started
This plugin requires Grunt `>=0.4.0`

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
Type: `Number`<br>
Default value: `1`

Specify the float precision used while optimizing.


#### options.currentColor
Type: `Boolean`<br>
Default value: `false`

Sets the value of all `fill` and `stroke` attributes to `currentColor`.

#### options.className
Type: `String`<br>
Default value: `u-hidden`

Specify your `display: none;` utility class.

#### options.width
Type: `Number`<br>
Default value: `null`

Define the width of the viewbox for all symbols (only necessary when the detection fails).

#### options.height
Type: `Number`<br>
Default value: `null`

Define the height of the viewbox for all symbols (only necessary when the detection fails).

### Examples

#### Usage Example

```js
grunt.initConfig({
  svg_symbols: {
    options: {
      precision: 3
    },
    files: {
      'icons.svg': ['**/*.svg'],
    },
  },
});
```

#### Output Example

```html
<svg class="u-hidden">
  <symbol id="mail" viewBox="0 0 80 80">
    <path d="M77.766 17.152l-25.115 21.1 25.09 23.665c.17-.462.266-.94.266..."/>
  </symbol>
  <symbol id="lock" viewBox="0 0 80 80">
      <path d="M61.05 35.833V23.82C61.05 13.01 52.04 4 41.23 4h-.6-.602c-1..."/>
  </symbol>
</svg>
```

```html
<svg>
    <use xlink:href="#mail"></use>
</svg>
```
