import 'core-js'
import 'regenerator-runtime/runtime'

import jest from 'jest-mock'
import expect from 'expect'

// Add missing Jest functions
window.test = window.it
window.test.each = inputs => (testName, test) =>
  inputs.forEach(args => window.it(testName, () => test(...args)))
window.test.todo = window.test.skip = () => {
  return undefined
}

window.jest = jest
window.expect = expect
