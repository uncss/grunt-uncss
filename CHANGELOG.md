## v0.3.2
* Additional cleanup for `report` option

## v0.3.1
* Fix failure when `report` wasn't set

## v0.3.0
* Update dependencies including `uncss` to 0.8.0
* Enable `report` by default and switch to using `maxmin`

## v0.1.7

Changelog coming soon.

## v0.1.6

* Upgrades to `uncss` 0.6.2 - brings stable support for PhantomJS and processing dynamically injected CSS via JavaScript, a better selector engine ([CSSSelect](https://npmjs.org/package/CSSselect) via [cheerio](https://npmjs.org/package/cheerio))
* Now supports `csspath`, `ignore`, `raw`, `timeout` options
* Improved support for multiple files, general stability fixes with issues upstream now fixed
* Added new suite of unit tests. Run with `grunt test`
* Readme now includes links to articles, videos, a better Bootstrap 3 example
* General improvements to sample Gruntfile.js (processhtml, cssmin, load-grunt-tasks)
* Complimentary plugin for [Gulp](https://github.com/addyosmani/gulp-uncss-task) is now available
