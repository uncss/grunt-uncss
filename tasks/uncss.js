/**
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2017 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

var uncss  = require('uncss'),
    chalk  = require('chalk'),
    maxmin = require('maxmin');

module.exports = function (grunt) {
    grunt.registerMultiTask('uncss', 'Remove unused CSS', function () {

        var done = this.async(),
            options = this.options({
                report: 'min'
            });

        this.files.forEach(function (file) {

            var src = file.src.filter(function (filepath) {
                if (/^https?:\/\//.test(filepath)) {
                    // This is a remote file: leave it in src array for uncss to handle.
                    return true;
                } else if (!grunt.file.exists(filepath)) {
                    // Warn on and remove invalid local source files (if nonull was set).
                    grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
                    return false;
                }
                return true;

            });

            if (src.length === 0 && file.src.length === 0) {
                grunt.fail.warn('Destination (' + file.dest + ') not written because src files were empty.');
            }

            try {
                uncss(src, options, function (error, output, report) {
                    if (error) {
                        throw error;
                    }

                    grunt.file.write(file.dest, output);
                    grunt.log.writeln('File ' + chalk.cyan(file.dest) + ' created: ' + maxmin(report.original, output, options.report === 'gzip'));

                    if (typeof options.reportFile !== 'undefined' && options.reportFile.length > 0) {
                        grunt.file.write(options.reportFile, JSON.stringify(report));
                    }
                    done();
                });
            } catch (e) {
                var err = new Error('Uncss failed.');

                if (e.msg) {
                    err.message += ', ' + e.msg + '.';
                }

                err.origError = e;
                grunt.log.warn('Uncssing source "' + src + '" failed.');
                grunt.fail.warn(err);
            }

        });

    });

};
