import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

interface Options {
  /** Whether the dialog is currently open / mounted */
  active: boolean
  onClose: () => void
  /** Prevent the page behind from scrolling. Default true. */
  lockScroll?: boolean
  /** Element to focus on open. Defaults to the container itself. */
  initialFocus?: RefObject<HTMLElement | null>
}

/**
 * Basic modal accessibility: moves focus in, traps Tab, closes on Escape,
 * locks body scroll and restores focus to the trigger on close.
 */
export function useDialogBehavior(
  containerRef: RefObject<HTMLElement | null>,
  { active, onClose, lockScroll = true, initialFocus }: Options,
): void {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!active) return
    const container = containerRef.current
    if (!container) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const { overflow, paddingRight } = document.body.style

    if (lockScroll) {
      const scrollbar = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`
    }

    ;(initialFocus?.current ?? container).focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (focusables.length === 0) {
        e.preventDefault()
        return
      }
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const current = document.activeElement
      if (e.shiftKey && (current === first || current === container)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      } else if (!container.contains(current)) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (lockScroll) {
        document.body.style.overflow = overflow
        document.body.style.paddingRight = paddingRight
      }
      previouslyFocused?.focus?.()
    }
  }, [active, containerRef, lockScroll, initialFocus])
}
