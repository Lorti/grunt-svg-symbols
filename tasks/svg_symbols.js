/*
 * grunt-svg-symbols
 * https://github.com/manuelwieser/grunt-svg-symbols
 *
 * Copyright (c) 2015 Manuel Wieser
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var svgo = require('svgo');
var handlebars = require('handlebars');

module.exports = function(grunt) {

  grunt.registerMultiTask('svg_symbols', 'Generate an SVG icon system (based on `<symbol>`) of a specified folder', function() {

    var options = this.options({
      precision: '1',
      width: null,
      height: null
    });

    var optim = new svgo({
      floatPrecision: options.precision,
      plugins: [{
        removeTitle: true
      }]
    });

    this.files.forEach(function(f) {

      var symbols = [];

      f.src.filter(function(filepath) {

        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }

      }).map(function(filepath) {

        optim.optimize(grunt.file.read(filepath), function (result) {
          var name = path.basename(filepath, '.svg');
          var content = result.data.match(/<svg.*?>(.*?)<\/svg>/)[1];
          symbols.push({
            name: name,
            content: content,
            width: options.width || result.info.width,
            height: options.height || result.info.height
          });
        });

      });

      var source = grunt.file.read(__dirname + '/../template.hbs', 'utf8');
      var template = handlebars.compile(source);

      grunt.file.write(f.dest, template({
        symbols: symbols
      }));

      grunt.log.writeln('File "' + f.dest + '" created.');

    });
  });

};
