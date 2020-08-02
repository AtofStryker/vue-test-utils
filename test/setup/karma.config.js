const webpackConfig = require('./webpack.test.config.js')
// https://github.com/tom-sherman/blog/blob/master/posts/02-running-jest-tests-in-a-browser.md#the-good-stuff
module.exports = config => {
  config.set({
    browsers: ['ChromeHeadless'],
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],
    basePath: '../../',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    files: ['./test/setup/karma.setup.js', './test/setup/load-tests.js'],
    preprocessors: {
      './test/setup/karma.setup.js': ['webpack'],
      './test/setup/load-tests.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
