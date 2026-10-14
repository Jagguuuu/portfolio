import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useDialogBehavior } from '../../hooks/useDialogBehavior'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  /** Optional small line above the title */
  eyebrow?: string
  children: ReactNode
  className?: string
}

function ModalPanel({ onClose, title, eyebrow, children, className }: Omit<ModalProps, 'open'>) {
  const reduced = useReducedMotion()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useDialogBehavior(panelRef, { active: true, onClose })

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div
        className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'glass relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-solid outline-none sm:rounded-3xl',
          className,
        )}
        initial={reduced ? false : { opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div>
            {eyebrow ? <p className="eyebrow mb-1">{eyebrow}</p> : null}
            <h3 id={titleId} className="font-display text-2xl font-bold">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </motion.div>
    </motion.div>
  )
}

export function Modal({ open, ...rest }: ModalProps) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <AnimatePresence>{open ? <ModalPanel key="modal" {...rest} /> : null}</AnimatePresence>,
    document.body,
  )
}
