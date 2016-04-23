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
  entry: [
    'webpack-hot-middleware/client',
    './index',
    './index.html'
  ],
  output: {
    path: path.join(__dirname, 'dist_demo'),
    filename: 'demo.js',
    publicPath: '/static/'
  },
  resolveLoader: {
    modulesDirectories: ['../node_modules']
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /^react-redux-notification/, function(data) {
        data.request = path.resolve(__dirname, '../src');
      }
    )
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/,
      include: [path.join(__dirname), path.join(__dirname, '../src')]
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.scss$/,
      loaders: ['style', cssModulesLoader, 'sass']
    }]
  }
};