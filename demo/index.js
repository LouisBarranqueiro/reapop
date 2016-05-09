var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./build/webpack.config');
var express = require('express');
var app = new express();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

// 1. serve static files
app.use(express.static(__dirname + '/src/static'));
// 2. otherwise, send `index.html` file for all routes
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/src/index.html');
});
// define port
app.set('port', (process.env.PORT || 3000));
// start listening
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});