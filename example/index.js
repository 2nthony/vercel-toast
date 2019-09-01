import 'saika/dist/saika.css'
import Saika from 'saika'
import '../src/style.css'
import { createToast, destoryAllToasts } from '../src'

window.createToast = createToast
window.destoryAllToasts = destoryAllToasts

new Saika({
  target: 'app',
  nav: [
    {
      title: 'GitHub',
      link: 'https://github.com/evillt/toast'
    }
  ],
  router: {
    mode: 'history'
  },
  footer: `© {{ new Date().getFullYear() }} Made with <font color="#f04">❤</font> by
  <a href="https://github.com/evillt">EVILLT</a>.
  Powered by <a href="https://saika.dev">Saika</a>.`
})
