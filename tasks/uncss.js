/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2013 Addy Osmani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    //var uncss = require('uncss/lib/uncss.js');
    var uncss = require('uncss');
    var path = require('path');

    grunt.registerMultiTask('uncss', 'Remove unused CSS', function () {

        var done = this.async();
        var options = this.options({
            compress: false,
            ignore: ['']
        });

        console.log('files to iterate over are..', this.files);

        this.files.forEach(function (f) {
            console.log('file', f.src);
            var src = f.src.filter(function (filepath) {
                console.log('filepath', filepath);
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
                console.log(src);
                uncss(src, options, function (output) {
                    console.log(output);
                    grunt.file.write(f.dest, output);
                });
                done();
            } catch (e) {
                console.log(e);
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
