# grunt-uncss [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM version](https://badge.fury.io/js/grunt-uncss.png)](http://badge.fury.io/js/grunt-uncss)
[![Build Status](https://travis-ci.org/addyosmani/grunt-uncss.png?branch=master)](https://travis-ci.org/addyosmani/grunt-uncss)
[![Dependency Status](https://david-dm.org/addyosmani/grunt-uncss.png?theme=shields.io)](https://david-dm.org/addyosmani/grunt-uncss)
[![devDependency Status](https://david-dm.org/addyosmani/grunt-uncss/dev-status.png?theme=shields.io)](https://david-dm.org/addyosmani/grunt-uncss#info=devDependencies)

>A grunt task for removing unused CSS from your projects. Works across multiple files and supports dynamically injected CSS via PhantomJS.

## Preview

Taking a multi-page project using Bootstrap with >120KB of CSS down to 11KB.

![Demo](http://i.imgur.com/uhWMALH.gif)

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-uncss --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-uncss');
```

## Uncss task

_Run this task with the `grunt uncss` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Remove unused CSS from projects using [uncss](https://github.com/giakki/uncss).

### Usage

Use the `grunt-uncss` task by specifying a target destination (file) for your cleaned CSS. Below this is `dist/css/tidy.css`.

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

Which you can then use alongside a processor like `processhtml` to
rewrite the location of your stylesheet to `tidy.css` using a block
like:

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

## Options

Sample use of all supported options:

```js
uncss: {
  dist: {
    options: {
      ignore       : ['#added_at_runtime', /test\-[0-9]+/],
      media        : ['(min-width: 700px) handheld and (orientation: landscape)'],
      csspath      : '../public/css/',
      raw          : 'h1 { color: green }',
      stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
      ignoreSheets : [/fonts.googleapis/],
      urls         : ['http://localhost:3000/mypage', '...'], // Deprecated
      timeout      : 1000,
      htmlroot     : 'public',
      report       : 'min'
    },
    files: {
      'dist/css/tidy.css': ['app/index.html', 'app/about.html']
    }
  }
}
```

### What do the options do?

- __ignore__ (Array): provide a list of selectors that should not be removed by UnCSS. For example, styles added by user interaction with the page (`hover`, `click`), since those are not detectable by UnCSS yet. Both literal names and regex patterns are recognized.

- __media__ (Array): by default UnCSS processes only stylesheets with media query "_all_", "_screen_", and those without one. Specify here which others to include.

- __csspath__ (String): path where the CSS files are related to the html files. By default, UnCSS uses the path specified in the `<link rel="stylesheet" href="path/to/file.css">`.

- __raw__ (String): give the task a raw string of CSS in addition to the existing stylesheet options; useful in scripting when your CSS hasn't yet been written to disk.

- __stylesheets__ (Array): use these stylesheets instead of those extracted from the html files.

- __ignoreSheets__ (Array):  Do not include the specified stylesheets.

- __urls__ (Array): array of URLs to load with Phantom (on top of the files already passed if any).

- __timeout__ (Number): specify how long to wait for the JS to be loaded.

- __htmlroot__ (String): where the project root is. Useful for example if you are running UnCSS on _local_ files that have absolute href to the stylesheets, i.e. `href="/css/style.css"`.

- __report__ ('min'/'gzip'): specify whether to print out only the minification result or report minification and gzip results, using [maxmin](https://github.com/sindresorhus/maxmin).

### Usage examples

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
    files: {
      'dist/css/tidy.css': ['app/index.html', 'app/about.html']
      }
    },
    options: {
      ignore: ['#added_at_runtime', '.created_by_jQuery']
    }
  },
  options: {
    ignore: ['#added_at_runtime', '.created_by_jQuery']
  }
}
```


### Test project

There is a test project included under the `tests/app` directory which you can build by running `grunt` after an `npm install`.
It also includes a `grunt compare_size` task for getting a feel of the before and after CSS sizes:

![](http://i.imgur.com/bUseCPh.png)


## The problem

User-interface libraries like [Bootstrap](http://getbootstrap.com), [TopCoat](http://topcoat.io) and so on are fairly prolific, however many developers
use less than 10% of the CSS they provide (when opting for the full build, which most do). As a result, they can
end up with fairly bloated stylesheets which can significantly increase page load time and affect performance.
`grunt-uncss` is an attempt to help with by generating a CSS file containing only the CSS used in your project,
based on selector testing.

## Research and alternative solutions

There have been many efforts to try solving the problem of finding unused CSS in the past. Opera created
[ucss](https://github.com/operasoftware/ucss), @aanand created (https://github.com/aanand/deadweight),
Brian Le Roux [CSS Slap Chop](https://github.com/brianleroux/css-slap-chop) and there were a number of
client-side solutions also crafted, such as [Helium-CSS](https://github.com/geuis/helium-css),
[CSSESS](https://github.com/driverdan/cssess) and the Python [mincss](http://www.peterbe.com/plog/mincss).

Unfortunately, most of these solutions don't actually generate what you're really after - a leaner build
of your project CSS containing only those rules you used. Finding that a more recent project called
[uncss](https://github.com/giakki/uncss) did try tackling this, I set out to share some of the problems we
need to solve in this space with the developer and build a Grunt task to enable usage of it in builds more
easily.

Huge thanks go out to Giacomo Martino for his help with the Node module this task uses.


## Coverage

* [Automating the removal of unused CSS - VelocityConf](http://www.youtube.com/watch?v=833xr1MyE30)
* [Use Grunt and UnCSS to speed up the load time of your site](http://xdamman.com/website-optimization-grunt-uncss)
* [Automating Front-end Workflow (slides)](https://speakerdeck.com/addyosmani/automating-front-end-workflow)
* [Automatically removing unused CSS - Windows](http://deanhume.com/Home/BlogPost/automatically-removing-unused-css-using-grunt/6101)

## Limitations

Please note that the CSS parser used in the `uncss` module we rely on currently isn't able to work with complex selectors.
For example `[data-section=''] > section > [data-section-title] a`. This may mean that at build time you run into exceptions
such as `TypeError: Cannot convert undefined or null to object`. If this is the case, please consider moving these selectors
to a separate stylesheet which the task does not run on.

We are actively looking at how to improve the CSS parsers used and will update this notice once this problem has been solved.

## License

(C) Addy Osmani 2014, released under the MIT license
