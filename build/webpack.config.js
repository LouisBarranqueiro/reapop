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
  resolveLoader: {
    modulesDirectories: ['./node_modules']
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /^react-redux-notification/, function(data) {
        data.request = path.resolve(__dirname, './src');
      }
    )
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.scss$/,
      loaders: ['style', cssModulesLoader, 'sass']
    }]
  }
};
