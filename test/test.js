var gulp = require("gulp"),
    tape = require("tape"),
    path = require("path"),
    gutil = require("gulp-util"),
    fs = require("fs"),
    insecurity = require("../");

process.chdir(__dirname);

function capture(){

  var write = process.stdout.write,
      out = "";

  process.stdout.write = function(str) {
    out += str;
  };

  return function(){
    process.stdout.write = write;
    return out;
  }

}

tape("Text", function(test) {

  var output = capture();

  gulp.src(["data/*.csv", "data/*.json"])
    .pipe(insecurity.text())
    .on("finish", function(){
      compare(output(), "data/output/text.txt", test);
    });

});

tape("JS", function(test) {

  var output = capture();

  gulp.src(["data/*.js"])
    .pipe(insecurity.js())
    .on("finish", function(){
      compare(output(), "data/output/js.txt", test);
    });

});

tape("JS no lines", function(test) {

  var output = capture();

  gulp.src(["data/*.js"])
    .pipe(insecurity.js({ lineNumbers: false }))
    .on("finish", function(){
      compare(output(), "data/output/js-nolines.txt", test);
    });

});

tape("CSS", function(test) {

  var output = capture();

  gulp.src(["data/*.css"])
    .pipe(insecurity.css())
    .on("finish", function(){
      compare(output(), "data/output/css.txt", test);
    });

});

tape("CSS no lines", function(test) {

  var output = capture();

  gulp.src(["data/*.css"])
    .pipe(insecurity.css({ lineNumbers: false}))
    .on("finish", function(){
      compare(output(), "data/output/css-nolines.txt", test);
    });

});

tape("HTML", function(test) {

  var output = capture();

  gulp.src(["data/*.html"])
    .pipe(insecurity.html())
    .on("finish", function(){
      compare(output(), "data/output/html.txt", test);
    });

});

tape("HTML passive", function(test) {

  var output = capture();

  gulp.src(["data/*.html"])
    .pipe(insecurity.html({ passive: true }))
    .on("finish", function(){
      compare(output(), "data/output/html-passive.txt", test);
    });

});

tape("HTML inline", function(test) {

  var output = capture();

  gulp.src(["data/*.html"])
    .pipe(insecurity.html({ scripts: true, styles: true }))
    .on("finish", function(){
      compare(output(), "data/output/html-inline.txt", test);
    });

});

function compare(actual, filename, test) {
  fs.readFile(filename, "utf8", function(err, expected) {
    test.equal(expected.trim(), gutil.colors.stripColor(actual).trim());
    test.end();
  });
}
