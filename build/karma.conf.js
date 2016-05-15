import path from 'path';
import webpackConfig from './webpack.config.js';

const karmaConfig = {
  // project root
  basePath: '../',
  files: ['./test/test-bundler.js'],
  plugins: [
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-coverage',
    'karma-phantomjs-launcher',
    'karma-chrome-launcher',
    'karma-webpack'
  ],
  frameworks: ['mocha'],
  preprocessors: {
    './test/test-bundler.js': ['webpack']
  },
  webpack: webpackConfig,
  webpackServer: {
    noInfo: true
  },
  reporters: ['mocha', 'coverage'],
  coverageReporter: {
    type: 'text',
    dir: 'coverage'
  },
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['PhantomJS'],
  customLaunchers: {
    ChromeTravisCI: {
      base: 'Chrome',
      flags: ['--window-size=400,400', '--no-sandbox']
    }
  },
  singleRun: true,
  concurrency: Infinity
};
// Isparta is a code coverage tool for ES6 using babel.
karmaConfig.webpack.module.preLoaders = [{
  test: /\.js$/,
  include: path.resolve('src'),
  exclude: path.resolve('node_modules'),
  loader: 'isparta'
}];

if (process.env.TRAVIS) {
  karmaConfig.browsers = ['ChromeTravisCI'];
}

module.exports = function(config) {
  karmaConfig.logLevel = config.LOG_INFO;
  config.set(karmaConfig);
};
