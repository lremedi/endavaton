"use strict";
var webpack = require("webpack");

var webpackConfig = require('./webpack.config.js');

//webpackConfig.devtool = "";
// strip out //console.log statements
webpackConfig.forEach(function (object, index) {

  object.devtool = false;
  object.module.loaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'strip-loader?strip[]=//console.log'
  });
  object.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      }
    }));
  object.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    }));
  object.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }));
});

module.exports = webpackConfig;