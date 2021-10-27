import ghCorner from '@saika/github-corner'
import '../src/style.css'
import { createToast, destroyAllToasts } from '../src'
import { copyCode } from 'saika-code-block-buttons'

window.createToast = createToast
window.destroyAllToasts = destroyAllToasts

new Saika({
  target: 'app',
  highlight: ['bash'],
  nav: [
    {
      title: 'GitHub',
      link: 'https://github.com/evillt/vercel-toast',
    },
  ],
  router: {
    mode: 'history',
  },

  plugins: [
    ghCorner({
      repo: 'evillt/vercel-toast',
      pinned: true,
    }),
  ],

  codeBlockButtons: [copyCode],

  footer: `© {{ new Date().getFullYear() }} Made with <font color="#f04">❤</font> by
  <a href="https://github.com/evillt">EVILLT</a>.
  Powered by <a href="https://saika.dev">Saika</a>.`,
})
