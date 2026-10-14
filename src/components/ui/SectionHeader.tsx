import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { AnimatedSection } from './AnimatedSection'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  className,
}: SectionHeaderProps) {
  return (
    <AnimatedSection
      className={cn(
        'mb-12 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span aria-hidden className="h-px w-8 bg-gradient-to-r from-[var(--cyan)] to-transparent" />
        {eyebrow}
      </p>
      <h2 id={id} className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-lg text-muted">{description}</p> : null}
    </AnimatedSection>
  )
}
