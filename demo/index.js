var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./build/webpack.config');
var express = require('express');
var app = new express(); // eslint-disable-line
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

// 1. serve static files
app.use(express.static(path.resolve(__dirname, '/src/static')));
// 2. otherwise, send `index.html` file for all routes
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '/src/index.html'));
});
// define port
app.set('port', (process.env.PORT || port));
// start listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
