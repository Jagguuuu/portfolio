import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
  className?: string
  children?: ReactNode
}

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }
type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

export type ButtonProps = AsButton | AsAnchor

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none ' +
  'transition-[transform,background-color,border-color,box-shadow,color,filter] duration-200 ' +
  'active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer'

const variants: Record<Variant, string> = {
  primary:
    'text-white bg-gradient-to-r from-[var(--blue)] to-[var(--violet)] ' +
    'shadow-[0_8px_30px_-10px_var(--glow-blue)] hover:shadow-[0_10px_36px_-8px_var(--glow-violet)] hover:brightness-110',
  secondary:
    'text-fg bg-surface border border-line-strong hover:border-[var(--blue)] hover:bg-surface-strong',
  ghost: 'text-muted hover:text-fg hover:bg-surface',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-base',
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', icon, iconRight, className, children, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {icon}
      {children}
      {iconRight}
    </>
  )

  if (typeof rest.href === 'string') {
    const { href, ...anchorProps } = rest
    const external = /^https?:\/\//.test(href)
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const { href: _unused, type = 'button', ...buttonProps } = rest
  void _unused
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  )
}
