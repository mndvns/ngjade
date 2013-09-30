ngjade
======

Component plugin for Jade to Angular.js Templates.
A fork of [nghtml](https://github.com/CamShaft/nghtml).

Usage
-----

```js
var ngjade = require("ngjade");

builder.use(ngjade({
  webroot: "public",
  module: "app",
  dev: true
}));

```

Options
-------

### extenstion
Extension to look for. Defaults to `.ngjade`

### webroot
Path relative to the project root where the files are being served, for example `public`. This defaults to nothing.

### module
The module in which to cache the templates. Defaults to `templates`.

### dev
Boolean value to specify dev mode. This enables next-lines on the cached tempaltes. Defaults to `false`
