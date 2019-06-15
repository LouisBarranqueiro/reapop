/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

const cssLoaderOptions = {
  importLoaders: 1,
  sourceMap: true,
  modules: true,
  localIdentName: '[name]__[local]__[hash:base64:5]'
}
const PROD = process.env.NODE_ENV === 'production'
const TRAVIS = process.env.TRAVIS
const DEV = !PROD && !TRAVIS

var webpackConfig = {
  mode: PROD || TRAVIS ? 'production' : 'development',
  devtool: 'cheap-module-eval-source-map',
  context:__dirname,
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist/static/'),
    filename: 'demo.js',
    publicPath: '/reapop/static/'
  },

  resolve: {
    modules: ['../node_modules', './node_modules']
  },

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: cssLoaderOptions
        },
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: cssLoaderOptions
        }]
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }],
  }
};

// specific conf for local dev environment
if (DEV) {
  webpackConfig.entry.push('webpack-hot-middleware/client');
  webpackConfig.output.publicPath = '/static/';
  webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ];
}

module.exports = webpackConfig;
