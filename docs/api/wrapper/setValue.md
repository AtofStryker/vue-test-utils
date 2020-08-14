## setValue

Sets value of a text-control input or select element and updates `v-model` bound data.

- **Arguments:**

  - `{any} value`

- **Example:**

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

const wrapper = mount(Foo)

const textInput = wrapper.find('input[type="text"]')
await textInput.setValue('some value')

const select = wrapper.find('select')
await select.setValue('option value')

// requires <select multiple>
const multiselect = wrapper.find('select')
await multiselect.setValue(['value1', 'value3'])
```

- **Note:**

  - `textInput.setValue(value)` is an alias of the following code.

  ```js
  textInput.element.value = value
  await Vue.nextTick()
  await textInput.trigger('input')
  ```

  - `select.setValue(value)` is an alias of the following code.

  ```js
  select.element.value = value
  await Vue.nextTick()
  await select.trigger('change')
  ```
