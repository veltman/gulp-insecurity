# gulp-insecurity

[![Build Status](https://travis-ci.org/veltman/gulp-insecurity.svg?branch=master)](https://travis-ci.org/veltman/gulp-insecurity)

Gulp plugin for [insecurity](https://github.com/veltman/insecurity/).

## Installation

```
npm install gulp-insecurity
```

## Usage

```js
var insecurity = require("insecurity");

gulp.task("js", function () {
  gulp.src("src/js/*.js")
    .pipe(insecurity.js())
    .pipe(gulp.dest("public/js"));
});

gulp.task("css", function () {
  gulp.src("src/less/*.less")
    .pipe(less())
    .pipe(insecurity.css())
    .pipe(gulp.dest("public/css"));
});
```

### insecurity.html(options)

Returns a stream that will check HTML files for insecure URLs and print warnings to `stdout`.  Takes the same options as [insecurity.html](https://github.com/veltman/insecurity/#insecurityhtmlcontent-options).

### insecurity.css(options)

Returns a stream that will check CSS files for insecure URLs and print warnings to `stdout`.  Takes the same options as [insecurity.css](https://github.com/veltman/insecurity/#insecuritycsscontent-options).

### insecurity.js(options)

Returns a stream that will check JS files for insecure URLs and print warnings to `stdout`.  Takes the same options as [insecurity.js](https://github.com/veltman/insecurity/#insecurityjscontent-options).

### insecurity.text(options)

Returns a stream that will check text files for insecure URLs and print warnings to `stdout`.  Takes the same options as [insecurity.text](https://github.com/veltman/insecurity/#insecuritytextcontent-options).
