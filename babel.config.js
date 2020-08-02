const defaultOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@vue/babel-preset-jsx'
  ],
  plugins: [
    '@babel/plugin-syntax-jsx',
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-syntax-flow',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }]
  ],
  comments: false
}

module.exports = api => {
  if (api.env('browser')) {
    return {
      ...defaultOptions,
      // do not target node in the browser for transpilation
      presets: ['@babel/preset-env', '@vue/babel-preset-jsx']
    }
  } else {
    return defaultOptions
  }
}
