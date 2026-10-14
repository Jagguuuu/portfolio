import { useCallback, useEffect, useRef, useState } from 'react'
import type { SectionId } from '../data/site'

function readHash(ids: readonly SectionId[]): SectionId | null {
  const raw = window.location.hash.replace(/^#/, '')
  return (ids as readonly string[]).includes(raw) ? (raw as SectionId) : null
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smoothly scroll to a section and record it in the URL hash.
 * Safe to call from click handlers; falls back to instant scroll under reduced motion.
 */
export function scrollToSection(id: SectionId, options: { push?: boolean } = {}): void {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  const url = id === 'home' ? window.location.pathname + window.location.search : `#${id}`
  if (options.push ?? true) {
    window.history.pushState(null, '', url)
  } else {
    window.history.replaceState(null, '', url)
  }
  // Keyboard users: move focus to the section so screen readers announce it.
  el.focus({ preventScroll: true })
}

/**
 * Tracks which section is in view with an IntersectionObserver, keeps the URL hash
 * in sync (replaceState, so history is not spammed) and responds to back / forward.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(() => readHash(ids) ?? ids[0])
  const interacted = useRef(false)

  const syncHash = useCallback((id: SectionId) => {
    const url = id === 'home' ? window.location.pathname + window.location.search : `#${id}`
    const current = window.location.hash || ''
    const next = id === 'home' ? '' : `#${id}`
    if (current !== next) window.history.replaceState(null, '', url)
  }, [])

  // Observe sections.
  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      // A thin band just above the middle of the viewport decides the active section.
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))

    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) setActive(ids[ids.length - 1])
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [ids])

  // Only start rewriting the hash after real user input so a deep link is never clobbered on load.
  useEffect(() => {
    const mark = () => {
      interacted.current = true
    }
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    events.forEach((e) => window.addEventListener(e, mark, { passive: true, once: true }))
    return () => events.forEach((e) => window.removeEventListener(e, mark))
  }, [])

  useEffect(() => {
    if (interacted.current) syncHash(active)
  }, [active, syncHash])

  // Back / forward and manual hash edits.
  useEffect(() => {
    const onNavigate = (event: Event) => {
      const hashId = readHash(ids)
      // Ignore unrelated hashes such as the skip link (#main).
      if (!hashId && window.location.hash) return
      const id = hashId ?? ids[0]
      setActive(id)
      if (event.type === 'popstate') {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      }
    }
    window.addEventListener('popstate', onNavigate)
    window.addEventListener('hashchange', onNavigate)
    return () => {
      window.removeEventListener('popstate', onNavigate)
      window.removeEventListener('hashchange', onNavigate)
    }
  }, [ids])

  return active
}
