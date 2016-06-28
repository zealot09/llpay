var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var getWebpackBaseConfig = require('./webpack.base.conf.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var assign = require('object-assign');
var utils = require('./utils');
var fs = require('fs-extra');
var path = require('path');

function getEntry() {
  var exampleDir = utils.resolveCwd('src');
  var files = fs.readdirSync(exampleDir);
  var entry = {};

  files.forEach((file) => {
    var extname = path.extname(file);
    var name = path.basename(file, extname);
    if (name === 'app') {
      entry[name] = [`./src/${file}`];
    }
  });

  return entry;
}

module.exports = () => {
  var plugins = [];
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  plugins.push(new webpack.optimize.OccurenceOrderPlugin());

  plugins.push(new ExtractTextPlugin('[name].[contenthash].css'));
  // plugins.push(new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')));
  // plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing' ? 'index.html' : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  );
  //auto import plugins
  plugins.push(
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  )

  return assign({
    entry: getEntry(),
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    resolve: {
      alias: {
        jquery: utils.resolveCwd('src', 'polyfill', 'zepto'),
      }
    },
    resolveLoader: [utils.resolveCwd('node_modules')],
    module: {
      loaders: getWebpackBaseConfig.getLoaders()
        .concat(getWebpackBaseConfig.getCssLoaders(true))
        .concat(getWebpackBaseConfig.getBackboneLoader())
        .concat(getWebpackBaseConfig.getTemplateLoader())
    },

    plugins
  }, getWebpackBaseConfig.getLoaderConfig());
}
