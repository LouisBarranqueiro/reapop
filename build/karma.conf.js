import webpackConfig from './webpack.config.js';

module.exports = function(config) {
  config.set({
    // project root
    basePath: '../',
    files: [{
        pattern: `./test/test-bundler.js`,
        watched: false,
        served: true,
        included: true
      }
    ],
    plugins: [
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
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
    reporters: ['mocha'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
};
