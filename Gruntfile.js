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

  // Load all grunt tasks matching the `grunt-*` pattern, excluding grunt-lib-contrib.
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', '!grunt-lib-contrib']});
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
      tests: ['tmp', 'dist', 'tests/output.css']
    },

    uncss: {
      dist: {
        src: ['tests/app/about.html', 'tests/app/contact.html', 'tests/app/index.html'],
        dest: 'dist/css/tidy.css'
      },
      test: {
        files: {
          'tests/output.css': ['tests/index.html']
        },
        options: {
          report: 'gzip'
        }
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/about.html': ['tests/app/about.html'],
          'dist/contact.html': ['tests/app/contact.html'],
          'dist/index.html': ['tests/app/index.html']
        }
      }
    },

    cssmin: {
      dist: {
        options: {
          keepSpecialComments: 0,
          report: "min",
          selectorsMergeMode: "ie8"
        },
        files: {
          'dist/css/other.css': '<%= uncss.dist.dest %>'
        }
      }
    },

    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'tests/app/', src: ['img/**', 'js/**', '*.png', '*.xml', '*.txt', '*.ico', '!*.html'], dest: 'dist/'}
        ]
      }
    },

    compare_size: {
      files: [
        'tests/app/css/**',
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
      server: {
        options: {
          base: 'tests',
          port: 3000
        }
      }
    },

    watch: {
      files: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.*'],
      tasks: ['jshint', 'test']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('test', [
    'uncss:test',
    'simplemocha'
  ]);

  grunt.registerTask('dev', [
    'jshint',
    'test',
    'connect',
    'watch'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', [
    'clean',
    'copy',
    'uncss:dist',
    'cssmin',
    'processhtml',
    'compare_size'
  ]);

};
