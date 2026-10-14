import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, ChevronDown, MapPin, ShieldCheck } from 'lucide-react'
import { useId, useState } from 'react'
import { roles, type Workstream } from '../../data/experience'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

function WorkstreamCard({
  stream,
  open,
  onToggle,
  index,
}: {
  stream: Workstream
  open: boolean
  onToggle: () => void
  index: number
}) {
  const reduced = useReducedMotion()
  const baseId = useId()
  const panelId = `${baseId}-panel`
  const buttonId = `${baseId}-button`

  return (
    <AnimatedSection delay={Math.min(index * 0.05, 0.25)}>
      <div className={cn('card overflow-hidden', open && 'border-[var(--border-strong)]')}>
        <h4>
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex w-full cursor-pointer items-start gap-4 p-5 text-left sm:p-6"
          >
            <span className="mt-1 hidden font-mono text-sm text-subtle sm:block" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0 flex-1">
              <span className="mb-2 flex flex-wrap items-center gap-2">
                <Tag variant="cyan">{stream.category}</Tag>
                {stream.sanitized ? (
                  <Tag variant="violet" mono={false}>
                    <ShieldCheck size={12} aria-hidden="true" /> Public-safe summary
                  </Tag>
                ) : null}
              </span>
              <span className="block font-display text-lg font-bold sm:text-xl">{stream.title}</span>
              {!open ? (
                <span className="mt-1 line-clamp-2 block text-sm text-muted">{stream.summary}</span>
              ) : null}
            </span>
            <ChevronDown
              size={20}
              aria-hidden="true"
              className={cn(
                'mt-1 shrink-0 text-muted transition-transform duration-300',
                open && 'rotate-180 text-fg',
              )}
            />
          </button>
        </h4>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="content"
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="space-y-5 px-5 pb-6 sm:px-6 sm:pl-[4.25rem]">
                <p className="text-muted">{stream.summary}</p>

                {stream.metric ? (
                  <div className="gradient-border relative inline-flex items-baseline gap-3 rounded-xl bg-solid px-4 py-3">
                    <span className="font-display text-3xl font-extrabold gradient-text">
                      {stream.metric.value}
                    </span>
                    <span className="text-sm text-muted">{stream.metric.label}</span>
                  </div>
                ) : null}

                <ul className="space-y-2.5">
                  {stream.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan)]"
                      />
                      {h}
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                  {stream.stack.map((s) => (
                    <li key={s}>
                      <Tag>{s}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  )
}

export function Experience() {
  const role = roles[0]
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(
    () => new Set(['geospatial-simulation']),
  )

  const toggle = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const allOpen = openIds.size === role.workstreams.length

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="experience-heading"
          eyebrow="Experience"
          title={
            <>
              Where I <span className="gradient-text">build</span> for a living
            </>
          }
          description="Five workstreams across backend, geospatial, computer vision, mobile and internal tooling. Some work is described in a public-safe form, without client or program names."
        />

        <AnimatedSection>
          <div className="glass gradient-border mb-8 flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--blue)]">
                <Briefcase size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{role.title}</h3>
                <p className="text-muted">{role.company}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle">
                  <span className="font-mono text-[var(--cyan)]">
                    {role.start} – {role.end}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={14} aria-hidden="true" />
                    {role.location}
                  </span>
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                setOpenIds(allOpen ? new Set() : new Set(role.workstreams.map((w) => w.id)))
              }
            >
              {allOpen ? 'Collapse all' : 'Expand all'}
            </Button>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          {role.workstreams.map((stream, i) => (
            <WorkstreamCard
              key={stream.id}
              stream={stream}
              index={i}
              open={openIds.has(stream.id)}
              onToggle={() => toggle(stream.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
