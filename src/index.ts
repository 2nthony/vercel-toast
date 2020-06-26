import './style.css'

const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

let instances: Set<Toast> = new Set()
let container: HTMLDivElement

export interface Action {
  text: string
  callback?: ActionCallback
}

export type ActionCallback = (toast: Toast) => void

export interface ToastOptions {
  /**
   * Automatically destroy the toast in specific timeout (ms)
   * @default `0` which means would not automatically destory the toast
   */
  timeout?: number
  /**
   * Toast type
   * @default `default`
   */
  type?: 'success' | 'error' | 'warning' | 'default'
  action?: Action
  cancel?: string
}

export class Toast {
  message: string
  options: ToastOptions
  el?: HTMLDivElement

  private timeoutId?: number

  constructor(message: string, options: ToastOptions = {}) {
    const { timeout = 0, action, type = 'default', cancel } = options

    this.message = message
    this.options = {
      timeout,
      action,
      type,
      cancel
    }

    this.setContainer()

    this.insert()
    instances.add(this)
  }

  insert(): void {
    const el = document.createElement('div')
    el.className = 'toast'
    el.setAttribute('aria-live', 'assertive')
    el.setAttribute('aria-atomic', 'true')
    el.setAttribute('aria-hidden', 'false')

    const { action, type, cancel } = this.options

    const inner = document.createElement('div')
    inner.className = 'toast-inner'

    const text = document.createElement('span')
    text.className = 'toast-text'
    inner.classList.add(type as string)
    text.textContent = this.message
    text.title = this.message
    inner.appendChild(text)

    if (cancel) {
      const button = document.createElement('button')
      button.className = 'toast-button cancel-button'
      button.textContent = cancel
      button.type = 'text'
      button.onclick = () => this.destory()
      inner.appendChild(button)
    }

    if (action) {
      const button = document.createElement('button')
      button.className = 'toast-button'
      button.textContent = action.text
      button.type = 'text'
      button.onclick = () => {
        this.stopTimer()
        if (action.callback) {
          action.callback(this)
        } else {
          this.destory()
        }
      }
      inner.appendChild(button)
    }

    el.appendChild(inner)

    this.startTimer()

    this.el = el

    container.appendChild(el)

    // Delay to set slide-up transition
    waitFor(50).then(sortToast)
  }

  destory(): void {
    const { el } = this
    if (el) {
      el.setAttribute('aria-hidden', 'true')
      new Promise(resolve => {
        const eventName = getTransitionEvent(el)
        if (eventName) {
          el.addEventListener(eventName, () => resolve())
        } else {
          resolve()
        }
      }).then(() => {
        container.removeChild(el)
        instances.delete(this)

        sortToast()
      })
    }
  }

  setContainer(): void {
    container = document.querySelector('.toast-container') as HTMLDivElement
    if (!container) {
      container = document.createElement('div')
      container.className = 'toast-container'
      document.body.appendChild(container)
    }

    // Stop all instance timer when mouse enter
    container.addEventListener('mouseenter', () => {
      instances.forEach(instance => instance.stopTimer())
    })

    // Restart all instance timer when mouse leave
    container.addEventListener('mouseleave', () => {
      instances.forEach(instance => instance.startTimer())
    })

    // Listen to destory all
    const eventName = getTransitionEvent(container)
    if (eventName) {
      container.addEventListener(eventName, () => {
        if (container.hasAttribute('aria-destorying')) {
          while (container.firstChild) {
            container.removeChild(container.firstChild)
          }
          container.removeAttribute('aria-destorying')
        }
      })
    }
  }

  startTimer(): void {
    if (this.options.timeout && !this.timeoutId) {
      this.timeoutId = self.setTimeout(
        () => this.destory(),
        this.options.timeout
      )
    }
  }

  stopTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }
}

export function createToast(message: string, options?: ToastOptions): Toast {
  return new Toast(message, options)
}

export function destoryAllToasts(): void {
  if (!container) return

  instances.clear()
  if (container.hasChildNodes() && !container.hasAttribute('aria-destorying')) {
    container.setAttribute('aria-destorying', '')
  }
}

function getTransitionEvent(el: HTMLDivElement): string | undefined {
  const transition: { [k: string]: string } = {
    transition: 'transitionend',
    OTransition: 'oTransitionEnd',
    MozTransition: 'transitionend',
    WebkitTransition: 'webkitTransitionEnd'
  }

  for (const key in transition) {
    if (el.style[key as any] !== undefined) {
      return transition[key]
    }
  }
  return
}

function sortToast(): void {
  const toasts = Array.from(instances)
    .reverse()
    .slice(0, 4)

  toasts.forEach((toast, index) => {
    const sortIndex = index + 1
    const el = toast.el as HTMLDivElement

    el.className = `toast toast-${sortIndex}`
  })
}
