/* eslint-disable */
import webpack from 'webpack'

const cssModulesLoader = [
  'css?sourceMap&',
  'modules',
  'importLoaders=1',
  'localIdentName=[name]__[local]___[hash:base64:5]'
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
      loaders: ['style', cssModulesLoader, 'sass']
    }]
  }
};

export default webpackConfig;
