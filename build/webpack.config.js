/* eslint-disable */
import webpack from 'webpack';

const cssLoaderOptions = {
  importLoaders: 1,
  sourceMap: true,
  modules: true,
  localIdentName: '[name]__[local]__[hash:base64:5]'
}
// Webpack config for test
const webpackConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
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
    }]
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};

export default webpackConfig;
