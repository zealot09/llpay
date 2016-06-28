'use strict';

var path = require('path');
var utils = require('./utils');
var cwd = process.cwd();
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var getBabelCommonConfig = require('./getBabelCommonConfig');

module.exports = {
  getLoaders() {
    return [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [path.join(__dirname, './es3ifyLoader'), 'babel'],
    }, {
      test: /\.(png|gif|jpe?g|svg)$/i,
      loader: 'url?limit=25000',
    }];
  },

  getBackboneLoader() {
    // return [{
    //   test: /backbone\.js$/,
    //   loader: 'imports?define=>false'
    // }]
    return [{
      test: /zepto\.min\.js/,
      loader: 'script'
    }]
  },

  getTemplateLoader() {
    return [{
      test: /\.html$/,
      loader: 'underscore-template-loader',
      query: {
        engine: 'lodash'
      }
    }]
  },

  getCssLoaders(extractCss) {
    var cssLoader = ('css?sourceMap!postcss-loader');
    var lessLoader = ('css?sourceMap!postcss-loader!less?sourceMap');
    var sassLoader = ('css?sourceMap!postcss-loader!sass?sourceMap');

    if (extractCss) {
      cssLoader = ExtractTextPlugin.extract(cssLoader);
      lessLoader = ExtractTextPlugin.extract(lessLoader);
      sassLoader = ExtractTextPlugin.extract(sassLoader);
    } else {
      cssLoader = `style!${cssLoader}`;
      lessLoader = `style!${lessLoader}`;
      sassLoader = `style!${sassLoader}`;
    }

    return [{
      test: /\.css$/,
      loader: cssLoader,
    }, {
      test: /\.less$/,
      loader: lessLoader,
    }, {
      test: /\.scss$/,
      loader: sassLoader
    }]
  },

  getLoaderConfig() {
    return {
      babel: getBabelCommonConfig(),

      postcss: require('./postcssConfig')
    }
  },

}
