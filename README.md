# vercel-toast

[![NPM version](https://badgen.net/npm/v/vercel-toast?label=&color=29BC9B)](https://npmjs.com/package/vercel-toast)
[![NPM download](https://badgen.net/npm/dm/vercel-toast?label=&color=29BC9B)](https://npmjs.com/package/vercel-toast)

Framework-agnostic vercel design's toast component

![](media/toast2.gif)

## Usage

### Bundler

```console
npm i vercel-toast
```

```ts
// in js file
import 'vercel-toast/css'
import { createToast } from 'vercel-toast'

createToast('Hi from vercel toast!')
```

### Browser CDN

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/vercel-toast/dist/vercel-toast.css"
/>

<script src="https://unpkg.com/vercel-toast"></script>

<script>
  vercelToast.createToast("Hi from vercel toast!");
</script>
```

## Documentation

https://vercel-toast.vercel.app

## Credits

- [vercel/design's toast](https://vercel.com/design/toast)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Sponsors

[![sponsors](https://cdn.jsdelivr.net/gh/2nthony/sponsors-image/sponsors.svg)](https://github.com/sponsors/2nthony)

## License

MIT &copy; [2nthony](https://github.com/sponsors/2nthony)
