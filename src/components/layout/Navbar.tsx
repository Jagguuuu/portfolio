import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTheme } from '../../context/ThemeContext'
import { navItems, personal, type SectionId } from '../../data/site'
import { scrollToSection } from '../../hooks/useActiveSection'
import { useDialogBehavior } from '../../hooks/useDialogBehavior'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'
import { Button } from '../ui/Button'
import { ScrollProgress } from './ScrollProgress'

interface NavbarProps {
  active: SectionId
}

function Logo() {
  return (
    <span className="grid h-9 w-9 place-items-center rounded-xl border border-line-strong bg-solid font-display text-sm font-extrabold">
      <span className="gradient-text">{personal.initials}</span>
    </span>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}

export function Navbar({ active }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const drawerRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer if the viewport grows to desktop size.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = () => {
      if (mql.matches) setOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  useDialogBehavior(drawerRef, { active: open, onClose: () => setOpen(false) })

  const go = (id: SectionId) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    // Wait a frame so the scroll lock is released before scrolling.
    if (wasOpen) requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(id)))
    else scrollToSection(id)
  }

  const desktopLinks = navItems.filter((n) => n.id !== 'contact')

  return (
    <>
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'border-b border-line bg-[var(--nav-bg)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <a
          href="#home"
          onClick={go('home')}
          aria-label={`${personal.name} — home`}
          className="flex shrink-0 items-center gap-3 rounded-xl"
        >
          <Logo />
          <span className="hidden font-display text-base font-bold xl:block">{personal.name}</span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
        >
          {desktopLinks.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'relative whitespace-nowrap rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-colors xl:px-3 xl:text-sm',
                  isActive ? 'text-fg' : 'text-muted hover:text-fg',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId={reduced ? undefined : 'nav-pill'}
                    className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-surface-strong"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Button
            href={personal.resumeUrl}
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            icon={<Download size={16} aria-hidden="true" />}
            download={personal.resumeFileName}
          >
            Resume
          </Button>
          <Button
            href="#contact"
            onClick={go('contact')}
            size="sm"
            className="hidden lg:inline-flex"
            aria-current={active === 'contact' ? 'true' : undefined}
          >
            Contact
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-fg lg:hidden"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <ScrollProgress />
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 top-16 z-40 lg:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
          >
            <div
              className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              tabIndex={-1}
              className="relative ml-auto flex h-full w-[min(22rem,100%)] flex-col gap-1 overflow-y-auto border-l border-line bg-solid p-5 outline-none"
              initial={reduced ? false : { x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { x: 40, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive = active === item.id
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={go(item.id)}
                          aria-current={isActive ? 'true' : undefined}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold transition-colors',
                            isActive
                              ? 'bg-surface-strong text-fg'
                              : 'text-muted hover:bg-surface hover:text-fg',
                          )}
                        >
                          {item.label}
                          {isActive ? (
                            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[var(--cyan)]" />
                          ) : null}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-2 pt-6">
                <Button
                  href={personal.resumeUrl}
                  variant="secondary"
                  className="w-full"
                  icon={<Download size={16} aria-hidden="true" />}
                  download={personal.resumeFileName}
                >
                  Download resume
                </Button>
                <Button href="#contact" onClick={go('contact')} className="w-full">
                  Contact
                </Button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
