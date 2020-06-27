# Toast

A tiny browser library for displaying a brief toast at the right-bottom of the screen (≈1KB Gzipped).

## Use via bundler

```bash
npm install @evillt/toast
```

```js
import '@evillt/toast/dist/toast.css'
import { createToast } from '@evillt/toast'

createToast('Hello world')
```

## Use via CDN

```html
<link rel="stylesheet" href="https://unpkg.com/@evillt/toast/dist/toast.css" />

<script src="https://unpkg.com/@evillt/toast"></script>

<script>
  toast.createToast('Hello world')
</script>
```

## Explore

<a href="/docs/">API Docs</a>

[GitHub](https://github.com/evillt/toast)

## Examples

### Destory all toasts

```js
import { destoryAllToasts } from '@evillt/toast'

destoryAllToasts()
```

<button @click="destoryAllToasts">Destory all toast</button>

### Default

```js
import { createToast } from '@evillt/toast'

createToast('Hello world', {
  timeout: 3000 // in 3 seconds
})
```

<button @click="showDefault">Show toast</button>

### Action

```js
import { createToast } from '@evillt/toast'

createToast('Hello world', {
  action: {
    text: 'Awesome!',
    callback(toast) {
      console.log('You just closed me.')
      toast.destory()
    }
  }
})
```

<button @click="action">Show toast</button>

### Action + Cancel

```js
import { createToast } from '@evillt/toast'

createToast('Hello world', {
  action: {
    text: 'Awesome!',
    callback(toast) {
      console.log('You just closed me.')
      toast.destory()
    },
    cancel: 'Cancel'
  }
})
```

<button @click="actionAndCancel">Show toast</button>

### With types

```js
import { createToast } from '@evillt/toast'

createToast('Hello world', {
  timeout: 3000,
  type: 'success'
})

createToast('Hello world', {
  timeout: 3000,
  type: 'warning'
})

createToast('Hello world', {
  timeout: 3000,
  type: 'error'
})
```

<button @click="withType('success')">Show success</button>
<button @click="withType('warning')">Show warning</button>
<button @click="withType('error')">Show error</button>

```js { mixin: true }
{
  methods: {
    destoryAllToasts,

    showDefault() {
      createToast('Hello world', {
        timeout: 3000
      })
    },

    action() {
      createToast('Hello world', {
        action: {
          text: 'Awesome!',
          callback(toast) {
            console.log('You just closed me.')
            toast.destory()
          }
        }
      })
    },

    actionAndCancel() {
      createToast('Hello world', {
        action: {
          text: 'Awesome!',
          callback(toast) {
            console.log('You just closed me.')
            toast.destory()
          }
        },
        cancel: 'Cancel'
      })
    },

    withType(type) {
      createToast('Hello world', {
        timeout: 3000,
        type
      })
    }
  }
}
```
