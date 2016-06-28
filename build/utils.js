'use strict';

var path = require('path');
var config = require('../config');

module.exports = {
  resolveCwd() {
    const args = [].slice.call(arguments, 0);
    args.unshift(process.cwd());
    return path.join.apply(path, args);
  },

  assetsPath(_path) {
    return path.posix.join(config.build.assetsSubDirectory, _path)
  }
}
