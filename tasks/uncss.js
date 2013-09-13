/*
 * grunt-uncss
 * https://github.com/addyosmani/grunt-uncss
 *
 * Copyright (c) 2013 Addy Osmani
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {

  'use strict';

  var uncss  = require('uncss');
  var path   = require('path');

  grunt.registerMultiTask('uncss', 'Remove unused CSS', function() {

    var done = this.async();

    var options = this.options({
      compress:false
    });

    this.files.forEach(function(f) {

      // Check path validity
      var valid = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      // If valid, continue
      uncss(valid, options, function (output) {
        try{
          grunt.file.write(f.dest, output);
          grunt.log.writeln('File ' + f.dest + ' created.');
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Writing file failed.');
        }
      });

    });


  });

};
