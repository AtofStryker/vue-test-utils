// module.exports = function (config) {
//     config.set({
//         plugins: [
//             'karma-webpack',
//             'karma-jasmine',
//         ],

//         // base path that will be used to resolve all patterns (eg. files, exclude)
//         basePath: '',

//         // frameworks to use
//         // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//         frameworks: ['jasmine'],

//         // list of files / patterns to load in the browser
//         // Here I'm including all of the the Jest tests which are all under the __tests__ directory.
//         // You may need to tweak this patter to find your test files/
//         files: ['__tests__/**/*.js'],

//         // preprocess matching files before serving them to the browser
//         // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//         preprocessors: {
//             // Use webpack to bundle our tests files
//             'packages/*/__tests__/**/*.ts': ['webpack'],
//         },
//     });
// };

const webpackConfig = require('./webpack.test.config.js')

module.exports = function(config) {
  config.set({
    // I'm starting a headless browser, but I can also swap this out for "Chrome" to add debug statements, inspect console logs etc.
    browsers: ['Chrome'],
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      // Adding it to the plugins array
      'karma-chrome-launcher',
      'karma-spec-reporter'
    ],
    basePath: '',
    reporters: ['spec'],
    frameworks: ['jasmine'],
    files: ['./karma.setup.js', '../specs/**/*.spec.js'],
    preprocessors: {
      './karma.setup.js': ['webpack'],
      '../specs/**/*.spec.js': ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
