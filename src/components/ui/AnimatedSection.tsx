import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical travel distance in px */
  y?: number
}

/** Fade + rise on first scroll into view. Renders statically under prefers-reduced-motion. */
export function AnimatedSection({ children, className, delay = 0, y = 24 }: AnimatedSectionProps) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
