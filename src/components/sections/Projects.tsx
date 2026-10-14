import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, FileText, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import {
  projectFilters,
  projects,
  workflows,
  type Project,
  type ProjectFilterId,
} from '../../data/projects'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'
import { AnimatedSection } from '../ui/AnimatedSection'
import { GithubIcon } from '../ui/BrandIcons'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { SectionHeader } from '../ui/SectionHeader'
import { Tag } from '../ui/Tag'
import { WorkflowDiagram } from '../visual/WorkflowDiagram'

function ProjectLinks({ project, size = 'sm' }: { project: Project; size?: 'sm' | 'md' }) {
  const { github, live } = project.links
  if (!github && !live) return null
  return (
    <div className="flex flex-wrap gap-2">
      {live ? (
        <Button
          href={live}
          size={size}
          variant="secondary"
          iconRight={<ExternalLink size={14} aria-hidden="true" />}
          aria-label={`${project.title} live demo (opens in a new tab)`}
        >
          Live demo
        </Button>
      ) : null}
      {github ? (
        <Button
          href={github}
          size={size}
          variant="secondary"
          icon={<GithubIcon size={14} />}
          aria-label={`${project.title} on GitHub (opens in a new tab)`}
        >
          GitHub
        </Button>
      ) : null}
    </div>
  )
}

function OriginTags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag variant={project.origin === 'professional' ? 'accent' : 'violet'} mono={false}>
        {project.origin === 'professional' ? 'Professional work' : 'Personal project'}
      </Tag>
      {project.sanitized ? (
        <Tag variant="cyan" mono={false}>
          <ShieldCheck size={12} aria-hidden="true" /> Public-safe
        </Tag>
      ) : null}
    </div>
  )
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const draft = !project.published
  return (
    <article
      className={cn(
        'card flex h-full flex-col p-6',
        draft ? 'border-dashed opacity-80' : 'card-hover',
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <OriginTags project={project} />
        {draft ? (
          <Tag variant="warning" mono={false}>
            Coming soon
          </Tag>
        ) : null}
      </div>

      <h3 className="font-display text-xl font-bold">{project.title}</h3>
      <p className="mt-1 text-sm text-[var(--cyan)]">{project.tagline}</p>
      <p className="mt-3 flex-1 text-sm text-muted">{project.description}</p>

      {project.stack.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      ) : null}

      {draft ? (
        <p className="mt-5 text-xs text-subtle">{project.statusNote}</p>
      ) : (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            onClick={() => onOpen(project)}
            iconRight={<ArrowUpRight size={14} aria-hidden="true" />}
            aria-label={`Open ${project.title} case study`}
          >
            Case study
          </Button>
          <ProjectLinks project={project} />
        </div>
      )}
    </article>
  )
}

function CaseStudyBody({ project }: { project: Project }) {
  const cs = project.caseStudy
  return (
    <div className="space-y-7">
      <div className="space-y-3">
        <OriginTags project={project} />
        <p className="text-muted">{project.description}</p>
      </div>

      {project.workflow ? <WorkflowDiagram workflow={workflows[project.workflow]} /> : null}

      {cs ? (
        <div className="grid gap-6 sm:grid-cols-2">
          <section>
            <h4 className="eyebrow mb-2">Problem</h4>
            <p className="text-sm text-muted">{cs.problem}</p>
          </section>
          <section>
            <h4 className="eyebrow mb-2">My role</h4>
            <p className="text-sm text-muted">{cs.role}</p>
          </section>
          <section>
            <h4 className="eyebrow mb-2">Approach</h4>
            <ul className="space-y-2">
              {cs.approach.map((a) => (
                <li key={a} className="flex gap-2.5 text-sm text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--blue)]" />
                  {a}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h4 className="eyebrow mb-2">Outcomes</h4>
            <ul className="space-y-2">
              {cs.outcomes.map((o) => (
                <li key={o} className="flex gap-2.5 text-sm text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--cyan)]" />
                  {o}
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      <section>
        <h4 className="eyebrow mb-2">Stack</h4>
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s}>
              <Tag>{s}</Tag>
            </li>
          ))}
        </ul>
      </section>

      {project.statusNote ? (
        <p className="flex items-start gap-2 rounded-xl border border-dashed border-line-strong p-3 text-xs text-subtle">
          <FileText size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
          {project.statusNote}
        </p>
      ) : null}

      <ProjectLinks project={project} size="md" />
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilterId>('all')
  const [selected, setSelected] = useState<Project | null>(null)
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  const visible = useMemo(() => {
    if (filter === 'all') return projects.filter((p) => p.published)
    return projects.filter((p) => p.filters.includes(filter))
  }, [filter])

  const draftCount = projects.filter((p) => !p.published).length

  const counts = useMemo(() => {
    const result = {} as Record<ProjectFilterId, number>
    for (const f of projectFilters) {
      const fid = f.id
      result[fid] =
        fid === 'all'
          ? projects.filter((p) => p.published).length
          : projects.filter((p) => p.filters.includes(fid)).length
    }
    return result
  }, [])

  const openProject = (p: Project) => {
    setSelected(p)
    setOpen(true)
  }

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="projects-heading"
          eyebrow="Projects"
          title={
            <>
              Selected <span className="gradient-text">work &amp; case studies</span>
            </>
          }
          description="Published projects with workflow diagrams and case studies. Professional work is shown in a public-safe form without confidential names."
        />

        <AnimatedSection className="mb-8">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {projectFilters.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors',
                    active
                      ? 'border-[var(--blue)] bg-[color-mix(in_srgb,var(--blue)_16%,transparent)] text-fg'
                      : 'border-line text-muted hover:border-line-strong hover:text-fg',
                  )}
                >
                  {f.label}
                  <span className="font-mono text-xs text-subtle">{counts[f.id]}</span>
                </button>
              )
            })}
          </div>
          <p role="status" aria-live="polite" className="sr-only-text">
            {visible.length} projects shown
          </p>
        </AnimatedSection>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
              >
                <ProjectCard project={p} onOpen={openProject} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        {filter === 'all' && draftCount > 0 ? (
          <p className="mt-8 text-sm text-muted">
            {draftCount} more {draftCount === 1 ? 'project is' : 'projects are'} in progress and will be
            published once assets are ready.{' '}
            <button
              type="button"
              onClick={() => setFilter('in-progress')}
              className="cursor-pointer text-[var(--cyan)] underline-offset-4 hover:underline"
            >
              See what&apos;s coming
            </button>
          </p>
        ) : null}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={selected?.title ?? ''}
        eyebrow={selected?.tagline}
      >
        {selected ? <CaseStudyBody project={selected} /> : null}
      </Modal>
    </section>
  )
}
