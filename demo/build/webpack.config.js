var path = require('path');
var webpack = require('webpack');

const CSSModulesLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]'
].join('&');

const ReapopCSSModulesLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIdentName=Reapop__[local]'
].join('&');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    root: '../'
  },
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
    './src/index.html'
  ],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'demo.js',
    publicPath: '/'
  },
  resolveLoader: {
    modulesDirectories: ['../node_modules']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: [path.join(__dirname, '../../'), path.join(__dirname, '../src')]
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.scss$/,
      include: [path.join(__dirname, '../../src/')],
      loaders: ['style', ReapopCSSModulesLoader, 'sass']
    }, {
      test: /\.scss$/,
      exclude: [path.join(__dirname, '../../src/')],
      loaders: ['style', CSSModulesLoader, 'sass']
    }, {
      test: /\.(png|jpg|jpeg)$/,
      loader: 'url?limit=8192'
    }]
  }
};
