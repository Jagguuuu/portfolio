import { motion, type HTMLMotionProps } from 'framer-motion'
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react'
import { personal, socials, stats } from '../../data/site'
import { scrollToSection } from '../../hooks/useActiveSection'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { Tag } from '../ui/Tag'
import { HeroVisual } from '../visual/HeroVisual'

type EntranceProps = Pick<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'transition'>

function useEntrance() {
  const reduced = useReducedMotion()
  return (delay: number): EntranceProps =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        }
}

export function Hero() {
  const enter = useEntrance()
  const reduced = useReducedMotion()
  const { availability } = personal

  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-16 outline-none"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="ambient-glow -top-24 -left-24 h-96 w-96 bg-[var(--glow-blue)]" />
        <div className="ambient-glow top-1/3 -right-24 h-[28rem] w-[28rem] bg-[var(--glow-violet)]" />
        <div className="ambient-glow bottom-0 left-1/3 h-72 w-72 bg-[var(--glow-cyan)]" />
      </div>

      <div className="container-x relative grid min-w-0 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div className="min-w-0">
          <motion.div {...enter(0)} className="flex flex-wrap items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-sm',
                availability.open
                  ? 'border-[color-mix(in_srgb,var(--success)_45%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-success'
                  : 'border-line bg-surface text-muted',
              )}
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                {availability.open && !reduced ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                ) : null}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
              </span>
              {availability.open ? availability.label : availability.closedLabel}
            </span>
            <Button
              href={personal.resumeUrl}
              variant="secondary"
              size="sm"
              icon={<Download size={16} aria-hidden="true" />}
              download={personal.resumeFileName}
            >
              Download resume
            </Button>
          </motion.div>

          <motion.p {...enter(0.08)} className="eyebrow mt-8">
            {personal.name}
          </motion.p>

          <motion.h1
            {...enter(0.14)}
            id="hero-heading"
            className="mt-4 font-display text-[clamp(1.85rem,6.5vw,4.25rem)] leading-[1.05] font-extrabold tracking-tight text-balance"
          >
            {personal.headlineLead}{' '}
            <span className="gradient-text">{personal.headlineTail}</span>
          </motion.h1>

          <motion.ul
            {...enter(0.22)}
            aria-label="Roles"
            className="mt-6 flex flex-wrap gap-2"
          >
            {personal.titles.map((t) => (
              <li key={t}>
                <Tag mono={false} className="px-3 py-1 text-sm">
                  {t}
                </Tag>
              </li>
            ))}
          </motion.ul>

          <motion.p {...enter(0.3)} className="mt-6 max-w-xl text-lg text-muted">
            {personal.intro}
          </motion.p>

          <motion.div {...enter(0.38)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              href="#projects"
              size="lg"
              iconRight={<ArrowDown size={18} aria-hidden="true" />}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('projects')
              }}
            >
              Explore My Work
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              icon={<Mail size={18} aria-hidden="true" />}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
            >
              Contact Me
            </Button>
          </motion.div>

          <motion.div {...enter(0.46)} className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" className="text-[var(--cyan)]" />
              {personal.location}
            </span>
            <ul className="flex items-center gap-2" aria-label="Social links">
              {socials
                .filter((s) => s.id === 'github' || s.id === 'linkedin')
                .map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors hover:border-[var(--blue)] hover:text-fg"
                    >
                      {s.id === 'github' ? <GithubIcon size={18} /> : <LinkedinIcon size={18} />}
                    </a>
                  </li>
                ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, scale: 0.94 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
          className="mx-auto w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px]"
        >
          <HeroVisual />
        </motion.div>
      </div>

      <motion.dl
        {...enter(0.6)}
        className="container-x relative mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4"
        aria-label="Highlights"
      >
        {stats.map((s) => (
          <div key={s.id} className="glass rounded-2xl px-5 py-4">
            <dt className="text-xs text-muted">{s.label}</dt>
            <dd className="font-display text-2xl font-bold gradient-text">{s.value}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}
