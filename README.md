# grunt-uncss

A grunt task for generating CSS files containing only those styles used in your project.

Sample configuration:

```
// Configuration to be run (and then tested).
uncss: {
  bootstrap: {
    files: {
      'test/functional/tidy.css': ['test/functional/index.html']
    }
  }
},
```

(C) Addy Osmani 2013

