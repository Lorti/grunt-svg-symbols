/*
 * grunt-svg-symbols
 * https://github.com/manuelwieser/grunt-svg-symbols
 *
 * Copyright (c) 2015 Manuel Wieser
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

var cheerio = require('cheerio');
var svgo = require('svgo');
var handlebars = require('handlebars');

module.exports = function(grunt) {

  grunt.registerMultiTask('svg_symbols', 'Generate an SVG icon system (based on `<symbol>`) of a specified folder', function() {

    var options = this.options({
      precision: '1',
      className: 'u-hidden',
      currentColor: false,
      removeAttrs: null,
      width: null,
      height: null
    });

    var svgoPlugins = [{
      removeTitle: true
    }];

    if (options.removeAttrs) {
      svgoPlugins.push({
        removeAttrs: { attrs: options.removeAttrs }
      });
    }

    var optim = new svgo({
      floatPrecision: options.precision,
      plugins: svgoPlugins
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
          var $ = cheerio.load(result.data);
          var viewBox;

          if (options.currentColor) {
            $('[fill]').not('[fill="none"]').attr('fill', 'currentColor');
            $('[stroke]').not('[stroke="none"]').attr('stroke', 'currentColor');

            $(':not([fill])').each(function() {
              if ($(this).parents('g[fill]').length === 0) {
                $(this).attr('fill', 'currentColor');
              }
            });
          }

          if (options.preserveViewbox) {
            // extract width and height from viewport
            // note cheerio lowercases viewBox to viewbox
            viewBox = $('svg').attr('viewbox');
          }

          if (! viewBox) {
            viewBox = '0 0 ' + (options.width || result.info.width || '') + ' ' + (options.height || result.info.height || '');
          }

          symbols.push({
            name: name,
            content: $('svg').html(),
            viewBox: viewBox
          });
        });

      });

      var source = grunt.file.read(__dirname + '/../templates/template.hbs', 'utf8');
      var template = handlebars.compile(source);
      var system = template({
        symbols: symbols,
        className: options.className
      });

      grunt.file.write(f.dest, system);
      grunt.log.writeln('File "' + f.dest + '" created.');

      source = grunt.file.read(__dirname + '/../templates/debug.hbs', 'utf8');
      template = handlebars.compile(source);
      var parse = path.parse(f.dest);

      grunt.file.write((parse.dir.length ? parse.dir + '/' : '') + parse.name + '.html', template({
        system: system,
        symbols: symbols
      }));

    });
  });

};
