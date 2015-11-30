CSS source map loader for webpack
===

Installation
---

`npm install css-source-map-loader --save-dev`

Usage
---

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

If you just want a source map, this is want you need.

``` javascript
var css = require("css-source-map!scss!./file.scss");
// => returns css code from file.css, with source map
```

License
---

MIT (http://www.opensource.org/licenses/mit-license.php)
