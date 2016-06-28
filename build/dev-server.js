'use strict';

var path = require('path');
var express = require('express')
var webpack = require('webpack');
var config = require('../config');

var webpackConfig = process.env.NODE_ENV === 'production' ? require('./webpack.prod.conf')() : require('./webpack.dev.conf')();

var port = process.env.PORT || config.dev.port;

var app = express();
var compiler = webpack(webpackConfig);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  },
  inline: true

});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
});

app.use(devMiddleware);

app.use(hotMiddleware);

var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./' + config.build.assetsSubDirectory + ''))

module.exports = app.listen(port, function(err) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(`listening at http://localhost:${port}`);
});
