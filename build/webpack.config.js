/* eslint-disable */
import path from 'path';
import webpack from 'webpack';

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
      include: [path.join(__dirname, '../src')],
      loaders: ['style', ReapopCSSModulesLoader, 'sass']
    }, {
      test: /\.scss$/,
      exclude: [path.join(__dirname, '../src')],
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
