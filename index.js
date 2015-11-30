/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Theo Li @bbtfr
*/

var path = require("path");
var loaderUtils = require("loader-utils");
var SourceListMap = require("source-list-map").SourceListMap;

module.exports = function(content, map) {
  if(this.cacheable) this.cacheable();

  var query = loaderUtils.parseQuery(this.query);
  var cssRequest = loaderUtils.getRemainingRequest(this);
  var request = loaderUtils.getCurrentRequest(this);
  var css = JSON.stringify(content);

  if(!map) {
    var sourceMap = new SourceListMap();
    sourceMap.add(content, cssRequest, content);
    map = sourceMap.toStringWithSourceMap({
      file: request
    }).map;
    if(map.sources) {
      map.sources = map.sources.map(function(source) {
        var p = path.relative(query.context || this.options.context, source).replace(/\\/g, "/");
        if(p.indexOf("../") !== 0)
          p = "./" + p;
        return "/" + p;
      }, this);
      map.sourceRoot = "webpack://";
    }
  }

  if(typeof map !== "string") {
    map = JSON.stringify(map);
  }

  // embed runtime
  return "exports = module.exports = require(" + loaderUtils.stringifyRequest(this, require.resolve("./css-base.js")) + ")();\n" +
    "exports.push([module.id, " + css + ", \"\", " + map + "]);";
};
