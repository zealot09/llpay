'use strict';

var webpack = require('webpack');
var path = require('path');
var utils = require('./utils');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getWebpackBaseConfig = require('./webpack.base.conf.js');
var assign = require('object-assign');
var fs = require('fs-extra');
var config = require('../config');

function getEntry() {
  var exampleDir = utils.resolveCwd('src');
  var files = fs.readdirSync(exampleDir);
  var entry = {};

  files.forEach( (file) => {
    var extname = path.extname(file);
    var name = path.basename(file, extname);
    if(name === 'app') {
      entry[name] = [`./src/${file}`];
    }
  });

  return entry;
}

// Object.keys(getEntry()).forEach(function (name) {
//   getWebpackBaseConfig.entry[name] = ['./build/dev-client'].concat(getWebpackBaseConfig.entry[name])
// });

var resolveLibPath = function(lib) {
  console.log(utils.resolveCwd('node_modules', lib))
  return utils.resolveCwd('node_modules', lib);
}

module.exports = () => {
  var plugins = [];
  plugins.push(new ExtractTextPlugin('[name].css', {
    disable: false,
    allChunks: true
  }));

  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  );

  //auto import plugins
  plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery',
      // $: utils.resolveCwd('src', 'polyfill', 'zepto')
    })
  )

  return assign({
    // entry: getEntry(),
    entry: {
      app: ['./build/dev-client.js', './src/app.js']
    },
    output: {
      path: utils.resolveCwd('dist'),
      filename: '[name].js',
      publicPath: config.build.assetsPublicPath,
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    resolve: {
      alias: {
        jquery: utils.resolveCwd('src', 'polyfill', 'zepto'),
        // jquery: utils.resolveCwd('src', 'lib', 'zepto.min.js'),
      }
    },
    resolveLoader: [ utils.resolveCwd('node_modules') ],
    module: {
      loaders: getWebpackBaseConfig.getLoaders()
      .concat(getWebpackBaseConfig.getCssLoaders(true))
      // .concat(getWebpackBaseConfig.getBackboneLoader())
      .concat(getWebpackBaseConfig.getTemplateLoader())
    },

    plugins
  }, getWebpackBaseConfig.getLoaderConfig());
}
