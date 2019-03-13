/*
 * grunt-uncss
 * https://github.com/uncss/grunt-uncss
 *
 * Copyright (c) 2018 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp', 'dist', 'tests/output.css']
        },

        uncss: {
            dist: {
                src: ['tests/app/about.html', 'tests/app/contact.html', 'tests/app/index.html'],
                dest: 'dist/css/tidy.css',
                options: {
                    logUnused: true
                }
            },
            noOutput: {
                src: ['tests/app/about.html', 'tests/app/contact.html', 'tests/app/index.html'],
                options: {
                    logUnused: true
                }
            },
            test: {
                files: {
                    'tests/output.css': 'tests/index.html'
                },
                options: {

                    report: 'min'
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
                    src: ['https://getbootstrap.com/docs/3.3/examples/jumbotron/'],
                    dest: 'tests/outputUrl.css'
                }]
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
            options: {
                hostname: 'localhost',
                livereload: 35729,
                port: 3000
            },
            livereload: {
                options: {
                    base: 'dist/',
                    open: true // Automatically open the webpage in the default browser
                }
            }
        },

        watch: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: ['Gruntfile.js', 'tasks/**/*.js', 'tests/**/*.*'],
            tasks: ['test']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    grunt.registerTask('test', [
        'uncss:test',
        'uncss:testMany',
        'uncss:testUncssrc',
        'uncss:testUrl',
        'simplemocha',
        'default'
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
