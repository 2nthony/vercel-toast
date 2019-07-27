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
}

export class Toast {
  message: string
  options: ToastOptions
  el?: HTMLDivElement

  private timeoutId?: number

  constructor(message: string, options: ToastOptions = {}) {
    const { timeout = 0, action, type = 'default' } = options

    this.message = message
    this.options = {
      timeout,
      action,
      type
    }

    this.setContainer()

    this.insert()
    instances.add(this)
  }

  async insert(): Promise<void> {
    const el = document.createElement('div')
    el.className = 'toast'
    el.setAttribute('aria-live', 'assertive')
    el.setAttribute('aria-atomic', 'true')
    el.setAttribute('aria-hidden', 'false')

    const { action, type } = this.options

    const inner = document.createElement('div')
    inner.className = 'toast-inner'

    const text = document.createElement('span')
    text.className = 'toast-text'
    inner.classList.add(type as string)
    text.textContent = this.message
    inner.appendChild(text)

    if (action) {
      const button = document.createElement('button')
      button.className = 'toast-button'
      button.textContent = action.text
      button.type = 'text'
      button.addEventListener('click', () => {
        this.stopTimer()
        if (action.callback) {
          action.callback(this)
        } else {
          this.destory()
        }
      })
      inner.appendChild(button)
    }

    el.appendChild(inner)

    this.startTimer()

    // Stop timer when mouse enter
    el.addEventListener('mouseenter', () => this.stopTimer())
    // Restart timer when mouse leave
    el.addEventListener('mouseleave', () => this.startTimer())

    this.el = el

    container.appendChild(el)

    // Delay to set slide-up transition
    await waitFor(50)
    el.classList.add('toast-1')

    sortToast()
  }

  async destory(): Promise<void> {
    const { el } = this
    if (el) {
      el.setAttribute('aria-hidden', 'true')
      await new Promise(resolve => {
        const eventName = getTransitionEvent(el)
        if (eventName) {
          el.addEventListener(eventName, () => resolve())
        } else {
          resolve()
        }
      })
      container.removeChild(el)
      instances.delete(this)

      sortToast()
    }
  }

  setContainer(): void {
    container = document.querySelector('.toast-container') as HTMLDivElement
    if (!container) {
      container = document.createElement('div')
      container.className = 'toast-container'
      document.body.appendChild(container)
    }

    // Listen to destory all
    const eventName = getTransitionEvent(container)
    if (eventName) {
      container.addEventListener(eventName, () => {
        if (container.hasAttribute('aria-destorying')) {
          container.innerHTML = ''
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
  Array.from(instances).forEach((instance, index) => {
    const el = instance.el as HTMLDivElement
    if (instances.size - index <= 4) {
      el.className = `toast toast-${instances.size - index}`
    }
  })
}
