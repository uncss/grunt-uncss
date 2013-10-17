# grunt-uncss

>A grunt task for generating CSS files containing only those styles used in your project. *Note: this project has not yet been released*

## Preview

Taking a Bootstrap project using >120KB of CSS down to 11KB. The trimming process does not yet generate 1:1 expected output, but it's very close. 

![](http://i.imgur.com/uhWMALH.gif)

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

Along-side, specify the input HTML files you would like scanned for used selectors. In this case `app/index.html` and `app/about.html` are the two files we would like checked.

```shell
uncss: {
  dist: {
    files: {
      'dist/css/tidy.css': ['app/index.html','app/about.html']
      }
    },
    options: {
      compress:true
    }
},
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

```shell
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

### compress

`compress` will compress your CSS once it has removed the unused styles from your project.

### ignore

`ignore` allows you to tell the CSS removal parser to ignore specific selectors during processing. For example:

```javascript
ignore: ['#added_at_runtime', '.created_by_jQuery']
```

### Test project

There is a test project included under the `app` directory which you can build by running `grunt` after an `npm install`. It also includes a `grunt compare_size` task for getting a feel of the before and after CSS sizes:

![](http://i.imgur.com/bUseCPh.png)



## The problem

Many developers use less than 10% of the CSS included with projects like Twitter Bootstrap. As a result, they can end up with fairly bloated stylesheets which can significantly increase page load time and affect performance. `grunt-uncss` is an attempt to help with by generating a CSS file containing only the CSS actually used in your project.

## Research and alternative solutions

There have been many efforts to try solving the problem of finding unused CSS in the past. Opera created [ucss](https://github.com/operasoftware/ucss), @aanand created [, they don't actually generate what you're really after - a leaner build of your project CSS containing only those rules you used. Finding that a more recent project called [uncss](https://github.com/giakki/uncss) did try tackling this, I set out to create a grunt task that would add this to your build chain.deadweight](https://github.com/aanand/deadweight), Brian Le Roux [CSS Slap Chop](https://github.com/brianleroux/css-slap-chop) and there were a number of client-side solutions also crafted, such as [Helium-CSS](https://github.com/geuis/helium-css) and [CSSESS](https://github.com/driverdan/cssess).

The challenge with many of these projects is that whilst they solve the problem of discovering unused CSS

I am currently also investigating [mincss](http://www.peterbe.com/plog/mincss) which might do what I'm after but is a Python script.

## Limitations

`uncss` currently doesn't run with PhantomJS, but will support this soon.

## License

(C) Addy Osmani 2013, released under an MIT license

