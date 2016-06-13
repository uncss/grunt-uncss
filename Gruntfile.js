/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2016 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

/* jshint indent: 2 */

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= simplemocha.test.src %>'
      ]
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
          'tests/output.css': 'tests/index.html'
        },
        options: {
          report: 'gzip'
        }
      },
      testMany: {
        files: {
          'tests/output.css': 'tests/index.html',
          'tests/output2.css': 'tests/index2.html',
        },
        options: {
          report: 'gzip'
        }
      },
      testUncssrc: {
        files: {
          'tests/output.css': 'tests/index.html'
        },
        options: {
          uncssrc: 'tests/.uncssrc'
        }
      },
      testUrl: {
        files: [
          {
            nonull: true,
            src: ['http://getbootstrap.com/examples/jumbotron/'],
            dest: 'tests/outputUrl.css'
          }
        ]
      }
    },

    processhtml: {
      dist: {
        files: {
          'dist/about.html': 'tests/app/about.html',
          'dist/contact.html': 'tests/app/contact.html',
          'dist/index.html': 'tests/app/index.html'
        }
      }
    },

    cssmin: {
      dist: {
        options: {
          compatibility: 'ie8',
          keepSpecialComments: 0
        },
        files: {
          '<%= uncss.dist.dest %>': '<%= uncss.dist.dest %>'
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'tests/app/',
          src: ['img/**', 'js/**', '*.png', '*.xml', '*.txt', '*.ico', '!*.html'],
          dest: 'dist/'
        }]
      }
    },

    // Unit tests.
    simplemocha: {
      test: {
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
    'jshint',
    'uncss:test',
    'uncss:testMany',
    'uncss:testUncssrc',
    'uncss:testUrl',
    'simplemocha'
  ]);

  grunt.registerTask('dev', [
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
    'processhtml'
  ]);

};
