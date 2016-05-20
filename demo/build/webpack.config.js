/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

var CSSModulesLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIndentName=[name]__[local]__[hash:base64:5]'
].join('&');

var webpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    root: '../'
  },
  entry: [
    './src/index',
    './src/index.html'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'demo.js',
    publicPath: '/'
  },
  resolveLoader: {
    modulesDirectories: ['../node_modules', './node_modules']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.scss$/,
      loaders: ['style', CSSModulesLoader, 'sass']
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }]
  }
};

if (process.env.NODE_ENV == 'development' || !process.env.TRAVIS) {
  webpackConfig.entry.push('webpack-hot-middleware/client');
  webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = webpackConfig;
