import { Brain, Download, GraduationCap, Layers, Server, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { roles } from '../../data/experience'
import { personal, stats } from '../../data/site'
import { cn } from '../../lib/utils'
import { AnimatedSection } from '../ui/AnimatedSection'
import { Button } from '../ui/Button'
import { SectionHeader } from '../ui/SectionHeader'

interface Pillar {
  icon: LucideIcon
  title: string
  text: string
}

const pillars: readonly Pillar[] = [
  {
    icon: Server,
    title: 'Backend systems',
    text: 'Django, DRF and PostgreSQL services, with real-time features over WebSockets.',
  },
  {
    icon: Brain,
    title: 'Computer vision',
    text: 'YOLOv8 detection pipelines, from dataset annotation to inference on CCTV footage.',
  },
  {
    icon: Layers,
    title: 'Full-stack delivery',
    text: 'From schema design to responsive interfaces, web and Flutter mobile.',
  },
  {
    icon: Sparkles,
    title: 'Interactive 3D',
    text: 'Geospatial and 3D visualization in the browser with CesiumJS and Three.js.',
  },
]

interface TimelineEntry {
  id: string
  period: string
  title: string
  subtitle: string
  text: string
  kind: 'work' | 'education'
}

const timeline: readonly TimelineEntry[] = [
  ...roles.map<TimelineEntry>((r) => ({
    id: r.id,
    period: `${r.start} – ${r.end}`,
    title: r.title,
    subtitle: `${r.company} · ${r.location}`,
    text: r.summary,
    kind: 'work',
  })),
  {
    id: 'education',
    period: personal.education.period,
    title: personal.education.degree,
    subtitle: `${personal.education.institution}, ${personal.education.region}`,
    text: `CGPA ${personal.education.cgpa}`,
    kind: 'education',
  },
]

export function About() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="about-heading"
          eyebrow="About"
          title={
            <>
              Software engineering, <span className="gradient-text">with range</span>
            </>
          }
          description={personal.intro}
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.07}>
                  <div className="card card-hover h-full p-5">
                    <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--cyan)]">
                      <p.icon size={20} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted">{p.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection>
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.id} className="card flex flex-col-reverse p-4">
                    <dt className="mt-1 text-xs text-muted">{s.label}</dt>
                    <dd className="font-display text-2xl font-bold gradient-text">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </AnimatedSection>

            <AnimatedSection className="flex flex-wrap items-center gap-4">
              <Button
                href={personal.resumeUrl}
                download={personal.resumeFileName}
                icon={<Download size={18} aria-hidden="true" />}
              >
                Download resume
              </Button>
              <span className="text-sm text-muted">PDF · {personal.location}</span>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.1}>
            <h3 className="mb-6 font-display text-xl font-bold">Timeline</h3>
            <ol className="relative space-y-8 border-l border-line-strong pl-8">
              {timeline.map((entry) => (
                <li key={entry.id} className="relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-1 -left-[2.7rem] grid h-8 w-8 place-items-center rounded-full border bg-solid',
                      entry.kind === 'work'
                        ? 'border-[var(--blue)] text-[var(--blue)]'
                        : 'border-[var(--violet)] text-[var(--violet)]',
                    )}
                  >
                    {entry.kind === 'work' ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                    ) : (
                      <GraduationCap size={16} />
                    )}
                  </span>
                  <p className="font-mono text-xs tracking-wide text-[var(--cyan)]">{entry.period}</p>
                  <h4 className="mt-1 font-display text-lg font-bold">{entry.title}</h4>
                  <p className="text-sm text-muted">{entry.subtitle}</p>
                  <p className="mt-2 text-sm text-subtle">{entry.text}</p>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
