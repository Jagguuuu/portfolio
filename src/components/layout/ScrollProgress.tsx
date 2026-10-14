import { motion, useScroll, useSpring } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Thin gradient bar showing how far the page has been scrolled. */
export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[var(--cyan)] via-[var(--blue)] to-[var(--violet)]"
      style={{ scaleX: reduced ? scrollYProgress : smooth }}
    />
  )
}
