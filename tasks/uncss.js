/**
 * grunt-uncss
 * https://github.com/uncss/grunt-uncss
 *
 * Copyright (c) 2018 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

const uncss = require('uncss');
const chalk = require('chalk');
const maxmin = require('maxmin');

module.exports = function (grunt) {
    grunt.registerMultiTask('uncss', 'Remove unused CSS', function () {
        const done = this.async();
        const options = this.options({
            report: 'min'
        });

        this.files.forEach(file => {
            const src = file.src.filter(filepath => {
                if (/^https?:\/\//.test(filepath)) {
                    // This is a remote file: leave it in src array for uncss to handle.
                    return true;
                } else if (!grunt.file.exists(filepath)) {
                    // Warn on and remove invalid local source files (if nonull was set).
                    grunt.log.warn(`Source file ${chalk.cyan(filepath)} not found.`);
                    return false;
                }
                return true;
            });

            if (src.length === 0 && file.src.length === 0) {
                grunt.fail.warn(`Destination (${file.dest}) not written because src files were empty.`);
            }

            try {
                uncss(src, options, (error, output, report) => {
                    if (error) {
                        throw error;
                    }

                    grunt.file.write(file.dest, output);
                    grunt.log.writeln(`File ${chalk.cyan(file.dest)} created: ${maxmin(report.original, output, options.report === 'gzip')}`);

                    if (typeof options.reportFile !== 'undefined' && options.reportFile.length > 0) {
                        grunt.file.write(options.reportFile, JSON.stringify(report));
                    }
                    done();
                });
            } catch (err) {
                const error = new Error('Uncss failed.');

                if (err.msg) {
                    error.message += `, ${err.msg}.`;
                }

                error.origError = err;
                grunt.log.warn(`Uncssing source "${src}" failed.`);
                grunt.fail.warn(error);
            }
        });
    });
};
