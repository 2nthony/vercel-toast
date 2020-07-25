import ghCorner from '@saika/github-corner'
import '../src/style.css'
import { createToast, destoryAllToasts } from '../src'

window.createToast = createToast
window.destoryAllToasts = destoryAllToasts

new Saika({
  target: 'app',
  highlight: ['bash'],
  nav: [
    {
      title: 'GitHub',
      link: 'https://github.com/evillt/vercel-toast'
    }
  ],
  router: {
    mode: 'history'
  },

  plugins: [
    ghCorner({
      repo: 'evillt/vercel-toast',
      pinned: true
    })
  ],

  footer: `© {{ new Date().getFullYear() }} Made with <font color="#f04">❤</font> by
  <a href="https://github.com/evillt">EVILLT</a>.
  Powered by <a href="https://saika.dev">Saika</a>.`
})
