# grunt-uncss Changelog

## v0.5.2

* Update devDependencies
* Fix specifying URLs [#142](https://github.com/addyosmani/grunt-uncss/pull/142)

## v0.5.1

* Update devDependencies
* Update CI configs

## v0.5.0

* Update devDependencies including UnCSS to v0.13.0
* Handle multiple files sequentially ([#178](https://github.com/addyosmani/grunt-uncss/pull/178))
* Drop Node.js 0.10 support

## v0.4.0

* Update devDependencies including UnCSS to v0.12.0
* Add Windows testing via AppVeyor

## v0.3.8

* Update devDependencies
* Fail when no files and URLs are defined

## v0.3.7

* Update all dependencies except for UnCSS
* Remove the unused underscore dependency

## v0.3.5

* Lock UnCSS to v0.8.1 due to various issues
* Update the other dependencies

## v0.3.4

* Update dependencies
* Update README.md

## v0.3.3

* Update UnCSS

## v0.3.2

* Additional cleanup for `report` option

## v0.3.1

* Fix failure when `report` wasn't set

## v0.3.0

* Update dependencies including UnCSS to 0.8.0
* Enable `report` by default and switch to using `maxmin`

## v0.1.6

* Upgrades to UnCSS 0.6.2 - brings stable support for PhantomJS and processing dynamically injected CSS via JavaScript,
  a better selector engine ([CSSSelect](https://npmjs.org/package/CSSselect) via [cheerio](https://npmjs.org/package/cheerio))
* Now supports `csspath`, `ignore`, `raw`, `timeout` options
* Improved support for multiple files, general stability fixes with issues upstream now fixed
* Added new suite of unit tests. Run with `grunt test`
* README.md now includes links to articles, videos, a better Bootstrap 3 example
* General improvements to sample Gruntfile.js (processhtml, cssmin, load-grunt-tasks)
* Complimentary plugin for [Gulp](https://github.com/addyosmani/gulp-uncss-task) is now available
