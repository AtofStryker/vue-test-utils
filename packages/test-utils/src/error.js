import { findAllInstances } from './find'

function errorHandler(errorOrString, vm) {
  const error =
    typeof errorOrString === 'object' ? errorOrString : new Error(errorOrString)

  if (vm) {
    vm._error = error
  }

  throw error
}

export function throwIfInstancesThrew(vm) {
  const instancesWithError = findAllInstances(vm).filter(_vm => _vm._error)

  if (instancesWithError.length > 0) {
    if(vm.$options && vm.$options.localVue && vm.$options.localVue.config && vm.$options.localVue.config.errorHandler){
      vm.$options.localVue.config.errorHandler.call(this, instancesWithError[0]._erro)
    }
    throw instancesWithError[0]._error
  }
}

// Vue swallows errors thrown by instances, even if the global error handler
// throws. In order to throw in the test, we add an _error property to an
// instance when it throws. Then we loop through the instances with
// throwIfInstancesThrew and throw an error in the test context if any
// instances threw.
export function addGlobalErrorHandler(_Vue) {
  const existingErrorHandler = _Vue.config.errorHandler

  if (existingErrorHandler === errorHandler) {
    return
  } else if (!_Vue.config.errorHandler) {
    // if no user defined errorHandler is provided, register the global VTU errorHandler
    _Vue.config.errorHandler = errorHandler
  } else {
    // if a user defined errorHandler is provided that is not the global VTU errorHandler
    // define a new errorHandler that wraps the user defined errorHandler, followed by calling the global VTU errorHandler
    _Vue.config.errorHandler = function(err, vm, info) {
      debugger
      existingErrorHandler.call(this, err, vm, info)
      errorHandler.call(this, err, vm, info)
    }
  }
}
