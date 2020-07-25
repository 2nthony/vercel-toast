# Toast

A tiny browser library for displaying a brief toast at the right-bottom of the screen (≈1KB Gzipped).

## Use via bundler

```bash
npm install vercel-toast
```

```js
import 'vercel-toast/dist/vercel-toast.css'
import { createToast } from 'vercel-toast'

createToast('The Evil Rabbit jumped over the fence.')
```

## Use via CDN

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/vercel-toast/dist/vercel-toast.css"
/>

<script src="https://unpkg.com/vercel-toast"></script>

<script>
  toast.createToast('The Evil Rabbit jumped over the fence.')
</script>
```

## Explore

<a href="/docs/">API Docs</a>

[GitHub](https://github.com/evillt/vercel-toast)

## Examples

### Destory all toasts

```js
import { destoryAllToasts } from 'vercel-toast'

destoryAllToasts()
```

<button @click="destoryAllToasts">Destory all toast</button>

### Default

```js
import { createToast } from 'vercel-toast'

createToast('The Evil Rabbit jumped over the fence.', {
  timeout: 3000 // in 3 seconds
})
```

<button @click="showDefault">Show toast</button>

## Multiline

```js
import { createToast } from 'vercel-toast'

createToast(
  'The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence.',
  {
    timeout: 3000
  }
)
```

<button @click="multiline">Show toast</button>

### Action

```js
import { createToast } from 'vercel-toast'

createToast('The Evil Rabbit jumped over the fence.', {
  action: {
    text: 'Undo',
    callback(toast) {
      toast.destory()
    }
  }
})
```

<button @click="action">Show toast</button>

### Action + Cancel

```js
import { createToast } from 'vercel-toast'

createToast(
  'The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence again.',
  {
    action: {
      text: 'Undo',
      callback(toast) {
        toast.destory()
      },
      cancel: 'Cancel'
    }
  }
)
```

<button @click="actionAndCancel">Show toast</button>

### With types

```js
import { createToast } from 'vercel-toast'

createToast('The Evil Rabbit jumped over the fence.', {
  timeout: 3000,
  type: 'success'
})

createToast('The Evil Rabbit jumped over the fence.', {
  timeout: 3000,
  type: 'warning'
})

createToast('The Evil Rabbit jumped over the fence.', {
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
      createToast('The Evil Rabbit jumped over the fence.', {
        timeout: 3000
      })
    },

    multiline() {
      createToast('The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence.', {
        timeout: 3000
      })
    },

    action() {
      createToast('The Evil Rabbit jumped over the fence.', {
        action: {
          text: 'Undo',
          callback(toast) {
            toast.destory()
          }
        }
      })
    },

    actionAndCancel() {
      createToast('The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence again.', {
        action: {
          text: 'Undo',
          callback(toast) {
            toast.destory()
          }
        },
        cancel: 'Cancel'
      })
    },

    withType(type) {
      createToast('The Evil Rabbit jumped over the fence.', {
        timeout: 3000,
        type
      })
    }
  }
}
```
