import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { scrollToSection } from '../../hooks/useActiveSection'

export function BackToTop() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToSection('home')}
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduced ? 0 : 12 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className="glass fixed right-5 bottom-5 z-40 grid h-12 w-12 cursor-pointer place-items-center rounded-full text-fg transition-[border-color,box-shadow] hover:border-[var(--blue)] hover:shadow-[0_0_30px_-8px_var(--glow-blue)] sm:right-8 sm:bottom-8"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}
