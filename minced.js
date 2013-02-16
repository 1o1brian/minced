/*jshint node:true*/

function compressJS(js) {
  var jsp = require("uglify-js").parser;
  var pro = require("uglify-js").uglify;

  var ast = jsp.parse(js); // parse code and get the initial AST
  ast = pro.ast_mangle(ast); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast); // get an AST with compression optimizations
  return pro.gen_code(ast); // compressed code here
}

var Mincer = require('mincer');
var assetEnv = new Mincer.Environment();
assetEnv.appendPath('assets/javascripts');
assetEnv.appendPath('assets/stylesheets');

assetEnv.findAsset('application.js').compile(function (err, asset) {
  console.log(compressJS(asset.toString())); // resulting contents
  //asset.length;     // length in bytes
  //asset.mtime;      // last modified time
  console.log(asset.pathname);   // full path on the filesystem
});

assetEnv.findAsset('application.css').compile(function (err, asset) {
  console.log(asset.toString()); // resulting contents
  //asset.length;     // length in bytes
  //asset.mtime;      // last modified time
  console.log(asset.pathname);   // full path on the filesystem
});
