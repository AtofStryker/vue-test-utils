## Using Vue Test Utils with Jest (recommended)

Jest is a test runner developed by Facebook, aiming to deliver a battery-included unit testing solution. You can learn more about Jest on its [official documentation](https://jestjs.io/).

<div class="vueschool"><a href="https://vueschool.io/courses/learn-how-to-test-vuejs-components?friend=vuejs" target="_blank" rel="sponsored noopener" title="Learn how to use Jest and Vue Test Utils to test Single File Components with Vue School">Learn how to use Jest to test Single File Components with Vue School</a></div>

If you are using the Vue CLI to build your project, you can use the plugin [cli-plugin-unit-jest](https://cli.vuejs.org/core-plugins/unit-jest.html) to run Jest tests.

After setting up Jest, the first thing to do is to install Vue Test Utils and [`vue-jest`](https://github.com/vuejs/vue-jest) to process Single-File Components:

```bash
$ npm install --save-dev @vue/test-utils vue-jest
```

Then, you need to tell Jest to transform `.vue` files using `vue-jest`. You can do so by adding the following configuration in `package.json` or in a standalone [Jest config file](https://jestjs.io/docs/en/configuration):

```json
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      // tell Jest to handle `*.vue` files
      "vue"
    ],
    "transform": {
      // process `*.vue` files with `vue-jest`
      ".*\\.(vue)$": "vue-jest"
    }
  }
}
```

> **Note:** If you are using Babel 7 or higher, you will need to add [babel-bridge](https://github.com/babel/babel-bridge) to your devDependencies (`$ npm install --save-dev babel-core@^7.0.0-bridge.0`).

### Handling webpack Aliases

If you use a resolve alias in the webpack config, e.g. aliasing `@` to `/src`, you need to add a matching config for Jest as well, using the `moduleNameMapper` option:

```json
{
  "jest": {
    // support the same @ -> src alias mapping in source code
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

### Code Coverage

Jest can be used to generate coverage reports in multiple formats. The following is a simple example to get started with:

Extend your `jest` config with the [`collectCoverage`](https://jestjs.io/docs/en/configuration#collectcoverage-boolean) option, and then add the [`collectCoverageFrom`](https://jestjs.io/docs/en/configuration#collectcoveragefrom-array) array to define the files for which coverage information should be collected.

```json
{
  "jest": {
    "collectCoverage": true,
    "collectCoverageFrom": ["**/*.{js,vue}", "!**/node_modules/**"]
  }
}
```

This will enable coverage reports with the [default coverage reporters](https://jestjs.io/docs/en/configuration#coveragereporters-array-string). Further documentation can be found in the [Jest configuration documentation](https://jestjs.io/docs/en/configuration#collectcoverage-boolean), where you can find options for coverage thresholds, target output directories, etc.
