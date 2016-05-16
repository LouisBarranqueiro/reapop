/* eslint-disable */
import path from 'path';
import webpack from 'webpack';

const CSSModulesLoader = [
  'css?sourceMap&-minimize',
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]__[hash:base64:5]'
].join('&');

// Webpack config for test
const webpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loaders: ['style', CSSModulesLoader, 'sass']
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

export default webpackConfig;
