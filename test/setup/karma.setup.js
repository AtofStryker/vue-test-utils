// the jest.fn() API
import 'core-js'
import 'regenerator-runtime/runtime'

import jest from 'jest-mock'
// The matchers API
import expect from 'expect'

// Add missing Jest functions
window.test = window.it
window.test.each = inputs => (testName, test) =>
  inputs.forEach(args => window.it(testName, () => test(...args)))
window.test.todo = function() {
  return undefined
}
window.test.skip = function() {
  return undefined
}

window.only = window.fit
window.jest = jest
window.expect = expect
