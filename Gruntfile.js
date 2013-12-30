/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2013 Addy Osmani
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
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'dist'],
    },

    uncss: {
      dev: {
        files: {
          'dist/css/tidy.css': [
            'app/index.html',
            'app/about.html',
            'app/contact.html']
        },
      },
      dist: {
        files: {
          'dist/css/tidy.min.css': [
          'app/index.html',
          'app/about.html',
          'app/contact.html']
        },
      },
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

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'app/', src: ['img/**', 'js/**', '*.png', '*.xml', '*.txt', '*.ico', '!*.html'], dest: 'dist/'}
        ]
      }
    },

    compare_size: {
      files: [
        "app/css/**",
        "dist/css/**"
      ]
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
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

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-compare-size');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'uncss', 'nodeunit']);
  grunt.registerTask('dev', ['jshint', 'connect', 'test', 'watch']);

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'clean',
    'processhtml:dist', 
    'copy:dist',
    'uncss:dist',
    'compare_size'
  ]);

};
