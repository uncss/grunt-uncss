# grunt-uncss

A grunt task for generating CSS files containing only those styles used in your project. *Note: this project has not yet been released*

## Preview

Taking a Bootstrap project using >120KB of CSS down to 20KB. The trimming process does not yet generate 1:1 expected output, but it's close. 

![](http://i.imgur.com/0QhdbOd.gif)

Issues are largely to do with pseudo-selector support in the parser used.

## The problem

Many developers use less than 10% of the CSS included with projects like Twitter Bootstrap. As a result, they can end up with fairly bloated stylesheets which can significantly increase page load time and affect performance. `grunt-uncss` is an attempt to help with by generating a CSS file containing only the CSS actually used in your project.

## Research and alternative solutions

There have been many efforts to try solving the problem of finding unused CSS in the past. Opera created [ucss](https://github.com/operasoftware/ucss), @aanand created [deadweight](https://github.com/aanand/deadweight), Brian Le Roux [CSS Slap Chop](https://github.com/brianleroux/css-slap-chop) and there were a number of client-side solutions also crafted, such as [Helium-CSS](https://github.com/geuis/helium-css) and [CSSESS](https://github.com/driverdan/cssess).

The challenge with many of these projects is that whilst they solve the problem of discovering unused CSS, they don't actually generate what you're really after - a leaner build of your project CSS containing only those rules you used. Finding that a more recent project called [uncss](https://github.com/giakki/uncss) did try tackling this, I set out to create a grunt task that would add this to your build chain.

I am currently also investigating [mincss](http://www.peterbe.com/plog/mincss) which might do what I'm after but is a Python script.

## Limitations

This project currently has a number of important limitations. `uncss` currently doesn't run with PhantomJS, meaning styles that are dynamically added via JavaScript are not taken into account. 

A potentially better solution to this would be hooking into `helium` (mentioned earlier). Unfortunately, getting it working as a module we can use via grunt is non-trivial work, however this is currently being tackled as part of the [helium-cli](https://github.com/villadora/helium-cli) project. 

Once it has been released and is in a stable state I intend on moving this project over to using it.

Update: uncss is also currently exploring a PhantomJS implementation.

## Configuration

Sample configuration:

```shell
uncss: {
  bootstrap: {
    files: {
      'dist/css/tidy.css': [
      'app/index.html',
      'app/about.html']
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

There is a test project included under the `app` directory which you can build by running `grunt` after an `npm install`. It also includes a `grunt compare_size` task for getting a feel of the before and after CSS sizes:

![](http://i.imgur.com/bUseCPh.png)

## License

(C) Addy Osmani 2013, released under an MIT license

