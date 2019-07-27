# Toast

A tiny browser library for displaying a brief toast at the right-bottom of the screen (≈1KB Gzipped).

## Use with bundler

```js
import '@evillt/toast/dist/toast.css'
import { createToast } from '@evillt/toast'

createToast('Hello world')
```

## Use via script tag

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
  text: 'Awesome!',
  callback(toast) {
    if (window.confirm('SING LOUDER!')) {
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
