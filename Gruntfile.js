/*
 * grunt-svg-symbols
 * https://github.com/Lorti/grunt-svg-symbols
 *
 * Copyright (c) 2015 Manuel Wieser
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'tmp.svg', 'tmp.html']
    },

    // Configuration to be run (and then tested).
    svg_symbols: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/mail.svg', 'test/fixtures/lock.svg']
        }
      },
      current_folder: {
        options: {
        },
        files: {
          'tmp.svg': ['test/fixtures/mail.svg', 'test/fixtures/lock.svg']
        }
      },
      custom_options: {
        options: {
          precision: 3,
          className: 'u-display-none',
          width: 24,
          height: 24
        },
        files: {
          'tmp/custom_options': ['test/fixtures/*.svg']
        }
      },
      current_color: {
        options: {
          currentColor: true
        },
        files: {
          'tmp/current_color': ['test/fixtures/mail.svg', 'test/fixtures/clock.svg', 'test/fixtures/upload.svg']
        }
      },
      remove_attrs: {
        options: {
          removeAttrs: 'fill|fill-rule'
        },
        files: {
          'tmp/remove_attrs': ['test/fixtures/mail.svg', 'test/fixtures/lock.svg']
        }
      },
      preserve_viewbox: {
        options: {
          preserveViewbox: true
        },
        files: {
          'tmp/preserve_viewbox': ['test/fixtures/mail2.svg', 'test/fixtures/lock2.svg']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'svg_symbols', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
