# Toast

A tiny browser library for displaying a brief toast at the right-bottom of the screen (≈1KB Gzipped).

## Use via bundler

```js
import '@evillt/toast/dist/toast.css'
import { createToast } from '@evillt/toast'

createToast('Hello world')
```

## Use via CDN

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/@evillt/toast/dist/toast.min.css"
/>

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

### Self-destory in specific timeout

```js
import { createToast } from '@evillt/toast'

createToast('Hello world', {
  timeout: 2000 // in 2 seconds
})
```

<button @click="selfDestory">Show toast</button>

### Action button

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

### With types

```js
import { createToast } from '@evillt/toast'

createToast('Hello world', {
  timeout: 2000,
  type: 'success'
})

createToast('Hello world', {
  timeout: 2000,
  type: 'warning'
})

createToast('Hello world', {
  timeout: 2000,
  type: 'error'
})
```

<button @click="withType('success')">Show success</button>
<button @click="withType('warning')">Show warning</button>
<button @click="withType('error')">Show error</button>
