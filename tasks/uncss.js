/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2013 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var uncss = require('uncss');
    
    grunt.registerMultiTask('uncss', 'Remove unused CSS', function () {

        var done = this.async();
        var options = this.options({
            compress: false,
            ignore: ['']
        });

        this.files.forEach(function (f) {
            var src = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            });

            if (src.length === 0) {
                grunt.log.warn('Destination (' + f.dest + ') not written because src files were empty.');
                return;
            }

            try {
                uncss(src, options, function (error, output, report) {
                    if (error) {
                        throw error;
                    }

                    grunt.file.write(f.dest, output);

                    if (options.report) {
                        grunt.log.writeln('File ' + f.dest.cyan + ' created.');
                        grunt.log.writeln('Original: ' + String(report.original).green + ' bytes.');
                        grunt.log.writeln('Minified: ' + String(report.tidy).green + ' bytes.');
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
