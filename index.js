var through = require("through2"),
    gutil = require("gulp-util"),
    path = require("path"),
    es = require("event-stream"),
    insecurity = require("insecurity");

module.exports = {
  js: wrapper(insecurity.js),
  css: wrapper(insecurity.css),
  html: wrapper(insecurity.html),
  text: wrapper(insecurity.text)
};

function wrapper(fn) {

  return function(options) {

    return through.obj(function(file, encoding, cb) {
      if (file.isStream()) {
        file.contents.pipe(es.wait(function(err, body) {
          if (!err) log(file.path, fn(body.toString(), options));
          return cb(err, file);
        }));
      } else {
        if (file.isBuffer()) {
          log(file.path, fn(file.contents.toString(), options));
        }
        return cb(null, file);
      }
    });

  };

}

function log(filename, warnings) {
  console.log(filename, warnings);
}
