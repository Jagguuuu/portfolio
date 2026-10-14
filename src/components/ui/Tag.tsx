import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface TagProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'violet' | 'cyan' | 'success' | 'warning'
  mono?: boolean
  className?: string
}

const variants: Record<NonNullable<TagProps['variant']>, string> = {
  default: 'text-muted border-line bg-surface',
  accent: 'text-[var(--blue)] border-[color-mix(in_srgb,var(--blue)_40%,transparent)] bg-[color-mix(in_srgb,var(--blue)_10%,transparent)]',
  violet: 'text-[var(--violet)] border-[color-mix(in_srgb,var(--violet)_40%,transparent)] bg-[color-mix(in_srgb,var(--violet)_10%,transparent)]',
  cyan: 'text-[var(--cyan)] border-[color-mix(in_srgb,var(--cyan)_40%,transparent)] bg-[color-mix(in_srgb,var(--cyan)_10%,transparent)]',
  success: 'text-success border-[color-mix(in_srgb,var(--success)_40%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)]',
  warning: 'text-warning border-[color-mix(in_srgb,var(--warning)_40%,transparent)] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)]',
}

export function Tag({ children, variant = 'default', mono = true, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs leading-5',
        mono && 'font-mono',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
