# grunt-uncss

A grunt task for generating CSS files containing only those styles used in your project. *Note: this project has not yet been released*

## The problem

Many developers use less than 10% of the CSS included with projects like Twitter Bootstrap. As a result, they can end up with fairly bloated stylesheets which can significantly increase page load time and affect performance. `grunt-uncss` is an attempt to help with by generating a CSS file containing only the CSS actually used in your project.

## Research and alternative solutions

There have been many efforts to try solving the problem of finding unused CSS in the past. Opera created [ucss](https://github.com/operasoftware/ucss), @aanand created [deadweight](https://github.com/aanand/deadweight), Brian Le Roux [CSS Slap Chop](https://github.com/brianleroux/css-slap-chop) and there were a number of client-side solutions also crafted, such as [Helium-CSS](https://github.com/geuis/helium-css) and [CSSESS](https://github.com/driverdan/cssess).

The challenge with many of these projects is that whilst they solve the problem of discovering unused CSS, they don't actually generate what you're really after - a leaner build of your project CSS containing only those rules you used. Finding that a more recent project called [uncss](https://github.com/giakki/uncss) did try tackling this, I set out to create a grunt task that would add this to your build chain.

## Limitations

This project currently has a number of important limitations. `uncss` currently doesn't run with PhantomJS, meaning styles that are dynamically added via JavaScript are not taken into account. 

A better solution to this would be hooking into `helium` (mentioned earlier). Unfortunately, getting it working as a module we can use via grunt is non-trivial work, however this is currently being tackled as part of the [helium-cli](https://github.com/villadora/helium-cli) project. 

Once it has been released and is in a stable state I intend on moving this project over to using it.

## Configuration


Sample configuration:

```
// Configuration to be run (and then tested).
uncss: {
  bootstrap: {
        files: {
          'test/functional/css/tidy.css': [
          'test/functional/index.html',
          'test/functional/test2.html']
        }
  }
},
```

## License

(C) Addy Osmani 2013, released under an MIT license

