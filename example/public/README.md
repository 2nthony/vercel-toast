# vercel-toast

Framework-agnostic vercel design's toast component (≈1KB Gzipped).

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

<button @click="showDefault">Show Toast</button>

### Multiline

```js
import { createToast } from 'vercel-toast'

createToast(
  'The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence. The Evil Rabbit jumped over the fence.',
  {
    timeout: 3000
  }
)
```

<button @click="multiline">Show Toast</button>

### Use a DOM node as message

```js
const message = document.createElement('div')
message.innerHTML = `<i style="color:magenta;">The Evil Rabbit jumped over the fence.</i>`

createToast(message, {
  timeout: 3000
})
```

<button @click="domNode">Show Toast</button>

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

<button @click="action">Show Toast</button>

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

<button @click="actionAndCancel">Show Toast</button>

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

createToast('The Evil Rabbit jumped over the fence.', {
  timeout: 3000,
  type: 'dark'
})
```

<button @click="withType('success')">Show Success</button>
<button @click="withType('warning')">Show Warning</button>
<button @click="withType('error')">Show Error</button>
<button @click="withType('dark')">Show Dark</button>

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

    domNode() {
      const message = document.createElement('div')
      message.innerHTML = '<i style="color:magenta;">The Evil Rabbit jumped over the fence.</i>'
      createToast(message, {
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
