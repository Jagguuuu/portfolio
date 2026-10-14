import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { engineeringIntro, engineeringTopics } from '../../data/engineering'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const layerAccents = ['var(--cyan)', 'var(--blue)', 'var(--violet)', 'var(--fg-subtle)'] as const

/**
 * Architecture showcase. Rendered as an in-page block between Projects and AI Lab
 * (the navbar keeps "Projects" highlighted while it is in view).
 */
export function EngineeringShowcase() {
  const [activeId, setActiveId] = useState(engineeringTopics[0].id)
  const reduced = useReducedMotion()
  const topic = engineeringTopics.find((t) => t.id === activeId) ?? engineeringTopics[0]

  return (
    <section
      id="engineering"
      tabIndex={-1}
      aria-labelledby="engineering-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="engineering-heading"
          eyebrow="Engineering Showcase"
          title={
            <>
              Architecture, <span className="gradient-text">explained simply</span>
            </>
          }
          description={engineeringIntro}
        />

        <div className="grid min-w-0 gap-6 lg:grid-cols-[18rem_1fr]">
          <AnimatedSection className="min-w-0">
            <div
              role="tablist"
              aria-label="Architecture topics"
              aria-orientation="vertical"
              className="flex max-w-full gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {engineeringTopics.map((t) => {
                const selected = t.id === activeId
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    id={`eng-tab-${t.id}`}
                    aria-selected={selected}
                    aria-controls={`eng-panel-${t.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActiveId(t.id)}
                    onKeyDown={(e) => {
                      const i = engineeringTopics.findIndex((x) => x.id === t.id)
                      let next = i
                      if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
                        next = (i + 1) % engineeringTopics.length
                      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
                        next = (i - 1 + engineeringTopics.length) % engineeringTopics.length
                      else if (e.key === 'Home') next = 0
                      else if (e.key === 'End') next = engineeringTopics.length - 1
                      else return
                      e.preventDefault()
                      const target = engineeringTopics[next]
                      setActiveId(target.id)
                      document.getElementById(`eng-tab-${target.id}`)?.focus()
                    }}
                    className={cn(
                      'shrink-0 cursor-pointer rounded-xl border px-4 py-3 text-left transition-colors lg:shrink',
                      selected
                        ? 'border-[var(--blue)] bg-[color-mix(in_srgb,var(--blue)_12%,transparent)]'
                        : 'border-line bg-surface hover:border-line-strong',
                    )}
                  >
                    <span className="block font-display text-sm font-bold whitespace-nowrap lg:whitespace-normal">
                      {t.title}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-subtle">{t.kicker}</span>
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={topic.id}
              role="tabpanel"
              id={`eng-panel-${topic.id}`}
              aria-labelledby={`eng-tab-${topic.id}`}
              tabIndex={0}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
              className="card p-6 sm:p-8"
            >
              <p className="eyebrow">{topic.kicker}</p>
              <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{topic.title}</h3>
              <p className="mt-3 text-muted">{topic.summary}</p>

              <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.1fr]">
                <div>
                  <h4 className="mb-3 font-display text-sm font-bold tracking-wide uppercase text-subtle">
                    Principles
                  </h4>
                  <ul className="space-y-2.5">
                    {topic.principles.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan)]"
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-display text-sm font-bold tracking-wide uppercase text-subtle">
                    Layers
                  </h4>
                  <ol className="space-y-2" aria-label={`${topic.title} layers`}>
                    {topic.layers.map((layer, i) => {
                      const accent = layerAccents[i % layerAccents.length]
                      return (
                        <li
                          key={layer.name}
                          className="flex flex-wrap items-center gap-2 rounded-xl border bg-solid px-3 py-2.5"
                          style={{ borderColor: `color-mix(in srgb, ${accent} 45%, var(--border))` }}
                        >
                          <span
                            className="w-24 shrink-0 font-mono text-xs font-medium"
                            style={{ color: accent }}
                          >
                            {layer.name}
                          </span>
                          {layer.items.map((item) => (
                            <Tag key={item}>{item}</Tag>
                          ))}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </div>

              <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
                <span className="font-semibold text-fg">Applied in: </span>
                {topic.appliedIn}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
