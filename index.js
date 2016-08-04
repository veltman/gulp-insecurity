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

      var warnings;

      if (file.isStream()) {
        file.contents.pipe(es.wait(function(err, body) {
          if (!err) {
            try {
              warnings = fn(body.toString(), options);
              log(file.path, warnings);
            } catch(e) {
              if ("filename" in e) e.filename = relativeFilename(file.path);
              return cb(e, file);
            }
          }

          return cb(err, file);
        }));
      } else {
        if (file.isBuffer()) {
          try {
            warnings = fn(file.contents.toString(), options);
            log(file.path, warnings);
          } catch(e) {
            if ("filename" in e) e.filename = relativeFilename(file.path);
            return cb(e, file);
          }
        }
        return cb(null, file);
      }
    });

  };

}

function log(filename, warnings) {
  var relative = relativeFilename(filename);
  warnings.forEach(function(warning){
    var message = relative + (warning.line ? ", line " + warning.line : "");
    if (warning.tag) {
      if (warning.inline) {
        message += ", <" + warning.tag + "> inline: " + chalked(warning.url);
      } else {
        message += ": <" + warning.tag + " " + (warning.tag === "link" ? "href" : "src") + "=\"" + chalked(warning.url) + "\"";
      }
    } else {
      message += ": " + chalked(warning.url);
    }
    console.log(message);
  });
}

function chalked(url) {
  return url.trim().replace(/^http:\/\//, gutil.colors.red("http://"));
}

function relativeFilename(filename) {
  return filename.replace(new RegExp("^" + process.cwd()), "").replace(/^\//,"");
}
