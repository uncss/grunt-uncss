/*
 * grunt-uncss
 * https://github.com/uncss/grunt-uncss
 *
 * Copyright (c) 2019 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        uncss: {
            dist: {
                src: ['tests/app/about.html', 'tests/app/contact.html', 'tests/app/index.html'],
                dest: 'tests/app/css/tidy.css'
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
                    'tests/output2.css': 'tests/index2.html'
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
                files: [{
                    nonull: true,
                    src: ['https://getbootstrap.com/docs/3.4/examples/jumbotron/'],
                    dest: 'tests/outputUrl.css'
                }]
            }
        },

        // Unit tests.
        simplemocha: {
            test: {
                src: 'tests/selectors.js'
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-simple-mocha');

    grunt.registerTask('test', [
        'uncss',
        'simplemocha'
    ]);

    // By default, lint and run all tests.
    grunt.registerTask('default', 'test');
};
