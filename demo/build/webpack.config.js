var path = require('path');
var webpack = require('webpack');

const cssModulesLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
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
      loaders: ['style', cssModulesLoader, 'sass']
    }]
  }
};
