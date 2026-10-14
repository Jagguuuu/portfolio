import { ArrowRight, Brain, FlaskConical, Hammer } from 'lucide-react'
import { labExperiments, labIntro, labPrinciples, labToolkit, pipelineStages } from '../../data/aiLab'
import { scrollToSection } from '../../hooks/useActiveSection'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'

export function AILab() {
  return (
    <section
      id="ai-lab"
      tabIndex={-1}
      aria-labelledby="ai-lab-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="ai-lab-heading"
          eyebrow="AI Lab"
          title={
            <>
              Applied AI, <span className="gradient-text">built to run</span>
            </>
          }
          description={labIntro}
        />

        {/* Pipeline */}
        <AnimatedSection>
          <div className="glass gradient-border relative mb-10 rounded-3xl p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl border border-line-strong bg-solid text-[var(--violet)]">
                <Brain size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">Detection pipeline</h3>
                <p className="text-sm text-muted">The loop behind the wildlife monitoring work.</p>
              </div>
            </div>

            <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {pipelineStages.map((stage, i) => (
                <li key={stage.title} className="relative rounded-2xl border border-line bg-solid p-4">
                  <span className="font-mono text-xs text-[var(--cyan)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-1 font-display text-base font-bold">{stage.title}</h4>
                  <p className="mt-1 text-sm text-muted">{stage.description}</p>
                  {i < pipelineStages.length - 1 ? (
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="absolute top-1/2 -right-3.5 z-10 hidden -translate-y-1/2 text-subtle lg:block"
                    />
                  ) : null}
                </li>
              ))}
            </ol>

            <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Toolkit">
              <li className="mr-1 text-sm text-muted">Toolkit:</li>
              {labToolkit.map((t) => (
                <li key={t}>
                  <Tag variant="violet">{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        {/* Experiments */}
        <div className="grid gap-5 md:grid-cols-3">
          {labExperiments.map((exp, i) => {
            const live = exp.status === 'in-production'
            return (
              <AnimatedSection key={exp.id} delay={i * 0.07} className="h-full">
                <article className={`card h-full p-6 ${live ? 'card-hover' : 'border-dashed'}`}>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong bg-solid text-[var(--cyan)]">
                      {live ? (
                        <FlaskConical size={18} aria-hidden="true" />
                      ) : (
                        <Hammer size={18} aria-hidden="true" />
                      )}
                    </span>
                    <Tag variant={live ? 'success' : 'warning'} mono={false}>
                      {live ? 'In production use' : 'In development'}
                    </Tag>
                  </div>
                  <h3 className="font-display text-lg font-bold">{exp.title}</h3>
                  <p className="mt-2 text-sm text-muted">{exp.summary}</p>
                  {exp.tools.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tools">
                      {exp.tools.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {exp.projectId ? (
                    <a
                      href="#projects"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection('projects')
                      }}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--cyan)] hover:underline"
                    >
                      See case study in Projects <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                </article>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Principles */}
        <AnimatedSection className="mt-12">
          <h3 className="mb-4 font-display text-xl font-bold">How I approach it</h3>
          <ul className="grid gap-4 md:grid-cols-3">
            {labPrinciples.map((p) => (
              <li key={p.title} className="rounded-2xl border border-line bg-surface p-5">
                <p className="font-display font-bold">{p.title}</p>
                <p className="mt-1.5 text-sm text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  )
}
