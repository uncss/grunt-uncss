# grunt-uncss [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM version](https://img.shields.io/npm/v/grunt-uncss.svg?)](https://www.npmjs.com/package/grunt-uncss)
[![Linux Build Status](https://img.shields.io/travis/addyosmani/grunt-uncss/master.svg?label=Linux%20build)](https://travis-ci.org/addyosmani/grunt-uncss)
[![Windows Build status](https://img.shields.io/appveyor/ci/addyosmani/grunt-uncss/master.svg?label=Windows%20build)](https://ci.appveyor.com/project/addyosmani/grunt-uncss/branch/master)
[![Dependency Status](https://img.shields.io/david/addyosmani/grunt-uncss.svg)](https://david-dm.org/addyosmani/grunt-uncss)
[![devDependency Status](https://img.shields.io/david/dev/addyosmani/grunt-uncss.svg)](https://david-dm.org/addyosmani/grunt-uncss#info=devDependencies)

>A grunt task for removing unused CSS from your projects with [UnCSS](https://github.com/giakki/uncss). Works across multiple files and supports dynamically injected CSS via PhantomJS.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create
a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-uncss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-uncss');
```

**Issues with the output should be reported on the UnCSS [issue tracker](https://github.com/giakki/uncss/issues).**

## Preview

Taking a multi-page project using Bootstrap with >120KB of CSS down to 11KB.

![Demo](http://i.imgur.com/uhWMALH.gif)

## Uncss task

*Run this task with the `grunt uncss` command.*

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

## Options

Options are passed to [UnCSS](https://github.com/giakki/uncss/blob/0.12.0/README.md#within-nodejs). In addition this task defines an extra option:

### report

Choices: `'min'`, `'gzip'`  
Default: `'min'`

Report minification result or both minification and gzip results.
This is useful to see exactly how well clean-css is performing but using `'gzip'` will make the task take 5-10x longer to complete. [Example output](https://github.com/sindresorhus/maxmin#readme).

## Usage examples

Use the `grunt-uncss` task by specifying a target destination (file) for your cleaned CSS.
Below this is `dist/css/tidy.css`.

Along-side, specify the input HTML files you would like scanned for used selectors.
In this case `app/index.html` and `app/about.html` are the two files we would like checked.

```js
uncss: {
  dist: {
    files: {
      'dist/css/tidy.css': ['app/index.html', 'app/about.html']
    }
  }
}
```

Which you can then use alongside a processor like
[processhtml](https://github.com/dciccale/grunt-processhtml) to
rewrite the location of your stylesheet to `tidy.css` using a block like:

```html
<!-- build:css css/tidy.css -->
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/bootstrap.css">
<!-- /build -->
```

and some configuration like:

```js
processhtml: {
  dist: {
    files: {
      'dist/index.html': ['app/index.html'],
      'dist/about.html': ['app/about.html']
    }
  }
}
```

```js
// Remove unused CSS across multiple files
uncss: {
  dist: {
    files: {
      'dist/css/tidy.css': ['app/index.html', 'app/about.html']
    }
  }
}
```

```js
// Remove unused CSS across multiple files and ignore specific selectors
uncss: {
  dist: {
    options: {
      ignore: ['#added_at_runtime', '.created_by_jQuery']
    },
    files: {
      'dist/css/tidy.css': ['app/index.html', 'app/about.html']
    }
  }
}
```

```js
// Remove unused CSS from URLs (php, node, etc.)
// (Note that`nonull` must be true, or else Grunt
// removes remote paths that it can't find locally)
uncss: {
  dist: {
    files: [{
      nonull: true,
      src: ['http://localhost:8080/path1', 'http://localhost:8080/path2'],
      dest: 'dist/css/tidy.css'
    }]
  }
}
```

### Test project

There is a test project included under the `tests/app` directory which you can build by running `grunt` after an `npm install`.
It also includes a `grunt compare_size` task for getting a feel of the before and after CSS sizes:

![grunt compare_size](http://i.imgur.com/bUseCPh.png)

## Examples

### Sites

* [HTML5Boilerplate.com website](https://github.com/h5bp/html5boilerplate.com)
* [Mozilla's DXR documentation viewer](https://github.com/mozilla/dxr)
* [Vanilla forums docs site](https://github.com/vanilla/vanilla-docs)

### Apps

* [GitHub Team Viewer - Angular app](https://github.com/vinitkumar/github-team-viewer)
* [Angular Todo application](https://github.com/JeremyCarlsten/grunt-uncss-angular-example)
* [CashSplitter - Angular app with PouchDB, Bootstrap](https://github.com/carlo-colombo/CashSplitter)
* [This Week's Comics Express app](https://github.com/WillsonSmith/thisWeeksComics)
* [Sample grunt-uncss in a Sass project](https://github.com/addyosmani/grunt-uncss-sass-example)

### Other

* [Using grunt-uncss with Wordpress](https://github.com/sboodhoo/Grunt-UnCSS-WordPress)
* [JSON Sitemap generator for grunt-uncss](https://github.com/phoenixMag00/JSON-Sitemap-Generator-for-Grunt-UnCSS-with-WordPress)

## The problem

User-interface libraries like [Bootstrap](http://getbootstrap.com), [TopCoat](http://topcoat.io)
and so on are fairly prolific, however many developers use less than 10% of the CSS they provide
(when opting for the full build, which most do). As a result, they can end up with fairly bloated
stylesheets which can significantly increase page load time and affect performance.
`grunt-uncss` is an attempt to help with by generating a CSS file containing only the CSS used
in your project, based on selector testing.

## Research and alternative solutions

There have been many efforts to try solving the problem of finding unused CSS in the past. Opera created
[ucss](https://github.com/oyvindeh/ucss), @aanand created <https://github.com/aanand/deadweight>,
Brian Le Roux [CSS Slap Chop](https://github.com/brianleroux/css-slap-chop) and there were a number of
client-side solutions also crafted, such as [Helium-CSS](https://github.com/geuis/helium-css),
[CSSESS](https://github.com/driverdan/cssess) and the Python [mincss](http://www.peterbe.com/plog/mincss).

Unfortunately, most of these solutions don't actually generate what you're really after - a leaner build
of your project CSS containing only those rules you used. Finding that a more recent project called
[UnCSS](https://github.com/giakki/uncss) did try tackling this, I set out to share some of the problems we
need to solve in this space with the developer and build a Grunt task to enable usage of it in builds more
easily.

Huge thanks go out to Giacomo Martino for his help with the Node module this task uses.

## Coverage

* [Spring-cleaning unused CSS with Grunt, Gulp & other build systems](http://addyosmani.com/blog/removing-unused-css/)
* [Automating the removal of unused CSS - VelocityConf](https://www.youtube.com/watch?v=833xr1MyE30)
* [Use Grunt and UnCSS to speed up the load time of your site](http://xdamman.com/website-optimization-grunt-uncss)
* [Foundation 5, Sass and Grunt UnCSS](https://corydowdy.com/blog/foundation-5-sass-and-grunt-uncss)
* [Automating Front-end Workflow (slides)](https://speakerdeck.com/addyosmani/automating-front-end-workflow)
* [Automatically removing unused CSS - Windows](http://deanhume.com/Home/BlogPost/automatically-removing-unused-css-using-grunt/6101)
* [Workflow for responsive email with Grunt and UnCSS](https://medium.com/p/32d607879082)

## WordPress

While UnCSS works best (and quickest) with static html files, it is possible to pass in
a URL array that contains all the URLs on your website, and process all used selectors that way.
[@lgladdy](https://github.com/lgladdy) wrote a guide on how to do this
[on his blog](https://gladdy.uk/blog/2014/04/13/using-uncss-and-grunt-uncss-with-wordpress/)

## Yeoman Generator

If you're looking for a webapp starting point with grunt-uncss integrated, see [generator-webapp-uncss](https://github.com/addyosmani/generator-webapp-uncss).

## Limitations

Please note that the CSS parser used in the `uncss` module we rely on currently isn't able to work with complex selectors.
For example `[data-section=''] > section > [data-section-title] a`. This may mean that at build time you run into exceptions
such as `TypeError: Cannot convert undefined or null to object`. If this is the case, please consider moving these selectors
to a separate stylesheet which the task does not run on.

We are actively looking at how to improve the CSS parsers used and will update this notice once this problem has been solved.

## Maintainers

* [@addyosmani](https://github.com/addyosmani)
* [@XhmikosR](https://github.com/XhmikosR)

## License

(C) Addy Osmani 2016, released under the MIT license
