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
    'karma-coveralls',
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
    stats: 'warning',
    noInfo: true
  },
  reporters: ['mocha', 'coverage', 'coveralls'],
  coverageReporter: {
    reporters: [{
      type: 'lcov',
      dir: 'coverage'
    }, {
      type: 'html',
      dir: 'coverage/html/'
    }]
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

karmaConfig.webpack.module.rules.push({
  test: /\.js$/,
  use: {
    loader: 'istanbul-instrumenter-loader',
  },
  enforce: 'post',
  include: path.resolve('src'),
  exclude: path.resolve('node_modules'),
})

if (process.env.TRAVIS) {
  karmaConfig.browsers = ['ChromeTravisCI'];
}

module.exports = function(config) {
  karmaConfig.logLevel = config.LOG_INFO;
  config.set(karmaConfig);
};
