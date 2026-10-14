import { Box, Clapperboard, Globe2, Hourglass, Info } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { studioDisclaimer, studioItems, studioStatusLabels, type StudioStatus } from '../../data/studio'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

const icons: Record<string, LucideIcon> = {
  'web-3d': Globe2,
  unreal: Clapperboard,
  maya: Box,
  showcase: Hourglass,
}

const statusVariant: Record<StudioStatus, 'accent' | 'violet' | 'warning'> = {
  'professional-web': 'accent',
  exploring: 'violet',
  'coming-soon': 'warning',
}

export function InteractiveStudio() {
  return (
    <section
      id="studio"
      tabIndex={-1}
      aria-labelledby="studio-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="studio-heading"
          eyebrow="Interactive Studio"
          title={
            <>
              Where code meets <span className="gradient-text">immersive media</span>
            </>
          }
          description="Browser-based 3D is part of my day job. Real-time engines and 3D modelling are what I am exploring on the side."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {studioItems.map((item, i) => {
            const Icon = icons[item.id] ?? Box
            const dashed = item.status === 'coming-soon'
            return (
              <AnimatedSection key={item.id} delay={i * 0.06} className="h-full">
                <article className={`card h-full p-6 ${dashed ? 'border-dashed' : 'card-hover'}`}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--violet)]">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <Tag variant={statusVariant[item.status]} mono={false}>
                      {studioStatusLabels[item.status]}
                    </Tag>
                  </div>
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                  {item.tools.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
                      {item.tools.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </AnimatedSection>
            )
          })}
        </div>

        <AnimatedSection className="mt-8">
          <p className="flex items-start gap-3 rounded-2xl border border-dashed border-line-strong p-4 text-sm text-muted">
            <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--cyan)]" />
            {studioDisclaimer}
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
