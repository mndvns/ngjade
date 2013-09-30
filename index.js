/**
 * Module dependencies.
 */
var jade = require("jade");
var fs = require("fs");
var path = require("path");
var read = fs.readFileSync;

var template = read(path.join(__dirname,"template.js"), 'utf8');

/**
 * Expose plugin
 */
module.exports = function(options) {
  if (!options) options = {};
  options.extension = options.extension || ".ngjade";
  options.module = options.module || "partials";
  options.webroot = options.webroot || "";
  options.dev = typeof options.dev == "undefined" ? false : options.dev;

  var nextLineEscape = options.dev ? "\"+\n\"" : " ";

  return function(builder) {
    builder.hook('before scripts', function(pkg){

      var templates = (pkg.config||pkg.conf).templates;
      if (!templates) return;

      templates.forEach(function(file){
        var ext = path.extname(file);
        if (options.extension != ext) return;

        var relativePath = path.relative(
          pkg.path(options.webroot),
          pkg.path(file)
        );

        /* var html = jade.render("h1 asdasdas"); */
        var js = compile(
          jade.render(read(pkg.path(file), 'utf8')),
          relativePath,
          options.module,
          nextLineEscape
        );

        var newFile = path.dirname(file)+"/"+path.basename(file, options.extension) + '.js';
        pkg.addFile('scripts', newFile, js);
      });
    });
  };
};

function compile(html, file, module, nextLineEscape) {
  return template
    .replace(/\{\{path\}\}/g, "/"+file)
    .replace(/\{\{module\}\}/g, module)
    .replace(/\{\{content\}\}/g, html
      .replace(/\"/g, "\\\"")
      .replace(/\n/g, nextLineEscape));
};

