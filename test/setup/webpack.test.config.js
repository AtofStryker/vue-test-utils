/* eslint-disable max-len */

const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const browser = process.env.TARGET === 'browser'
const path = require('path')

const projectRoot = path.resolve(__dirname, '../../')

const rules = [].concat(
  {
    test: /\.vue$/,
    use: 'vue-loader'
  },
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'vue-style-loader'
      },
      {
        loader: 'css-loader'
      }
    ]
  }
)
const externals = nodeExternals({
  // we need to allowlist both `create-instance` and files in `shared` package. Otherwise webpack won't bundle them in the test dev env
  allowlist: [
    '@vue/test-utils',
    '@vue/server-test-utils',
    'create-instance',
    /^shared\/.*/
  ]
})
// define the default aliases
let aliasedFiles = {}
if (process.env.TARGET === 'browser') {
  // if we are in dev test mode, we want to alias all files to the src file, not dist
  aliasedFiles = {
    '@vue/server-test-utils': `@vue/server-test-utils/src/index.js`,
    '@vue/test-utils': `@vue/test-utils/src/index.js`
  }
}

module.exports = {
  mode: process.env.TARGET === 'browser' ? 'development' : 'production',
  module: {
    rules
  },
  externals: !browser ? [externals] : undefined,
  resolve: {
    alias: {
      ...aliasedFiles,
      '~resources': `${projectRoot}/test/resources`,
      packages: path.resolve(projectRoot, 'packages')
    }
  },
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: '#inline-cheap-module-source-map',
  node: {
    fs: 'empty',
    module: 'empty'
  },
  plugins: [new webpack.EnvironmentPlugin(['TEST_ENV']), new VueLoaderPlugin()]
}
