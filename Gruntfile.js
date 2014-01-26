/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2013 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

/* jshint indent: 2 */

module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= simplemocha.test.src %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'dist','tests/output.css']
    },

    uncss: {
      dist: {
        files: {
          'dist/css/tidy.css': ['app/index.html','app/about.html','app/contact.html']
        }
      },
      test: {
        files: {
          'tests/output.css': ['tests/index.html']
        }
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/index.html': ['app/index.html'],
          'dist/about.html': ['app/about.html'],
          'dist/contact.html': ['app/contact.html']
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/css/other.css': ['app/{,*/}*.css', '!app/css/bootstrap.css']
        }
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'app/', src: ['img/**', 'js/**', '*.png', '*.xml', '*.txt', '*.ico', '!*.html'], dest: 'dist/'}
        ]
      }
    },

    compare_size: {
      files: [
        'app/css/**',
        'dist/css/**'
      ]
    },

    // Unit tests.
    simplemocha: {
      test:{
        src: 'tests/selectors.js'
      }
    },

    connect: {
      port: 3000,
      base: 'test/fixtures'
    },

    watch: {
      files: ['tasks/**/*.js', 'test/**/*.*'],
      tasks: ['jshint', 'test']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'uncss:test',
    'simplemocha'
  ]);

  grunt.registerTask('dev', ['jshint', 'connect', 'test', 'watch']);

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'clean',
    'processhtml',
    'cssmin',
    'copy',
    'uncss:dist',
    'compare_size'
  ]);

};
