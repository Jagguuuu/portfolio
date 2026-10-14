import { Search, X } from 'lucide-react'
import { useId, useMemo, useState, type ReactNode } from 'react'
import {
  proficiencyLevels,
  proficiencyMeta,
  skillCategories,
  type ProficiencyLevel,
  type Skill,
} from '../../data/skills'
import { cn } from '../../lib/utils'
import { AnimatedSection } from '../ui/AnimatedSection'
import { SectionHeader } from '../ui/SectionHeader'

function Chip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  color?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors',
        active
          ? 'border-[var(--blue)] bg-[color-mix(in_srgb,var(--blue)_16%,transparent)] text-fg'
          : 'border-line text-muted hover:border-line-strong hover:text-fg',
      )}
    >
      {color ? (
        <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ background: color }} />
      ) : null}
      {children}
    </button>
  )
}

function SkillBadge({ skill }: { skill: Skill }) {
  const meta = proficiencyMeta[skill.level]
  return (
    <li
      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-solid px-3.5 py-2.5"
      title={`${meta.label}${skill.note ? ` — ${skill.note}` : ''}`}
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">{skill.name}</span>
        {skill.note ? <span className="block truncate text-xs text-subtle">{skill.note}</span> : null}
      </span>
      <span
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase"
        style={{
          color: meta.color,
          borderColor: `color-mix(in srgb, ${meta.color} 40%, transparent)`,
          background: `color-mix(in srgb, ${meta.color} 10%, transparent)`,
        }}
      >
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
        {meta.label}
      </span>
    </li>
  )
}

export function Skills() {
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState<string>('all')
  const [level, setLevel] = useState<ProficiencyLevel | 'all'>('all')
  const searchId = useId()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return skillCategories
      .filter((c) => categoryId === 'all' || c.id === categoryId)
      .map((c) => ({
        ...c,
        skills: c.skills.filter(
          (s) =>
            (level === 'all' || s.level === level) &&
            (q === '' ||
              s.name.toLowerCase().includes(q) ||
              (s.note?.toLowerCase().includes(q) ?? false) ||
              c.title.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.skills.length > 0)
  }, [query, categoryId, level])

  const total = filtered.reduce((n, c) => n + c.skills.length, 0)
  const hasFilters = query !== '' || categoryId !== 'all' || level !== 'all'

  const reset = () => {
    setQuery('')
    setCategoryId('all')
    setLevel('all')
  }

  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-heading"
      className="section-pad relative outline-none"
    >
      <div className="container-x">
        <SectionHeader
          id="skills-heading"
          eyebrow="Skills"
          title={
            <>
              Tools, and <span className="gradient-text">where I have used them</span>
            </>
          }
          description="Each skill is labelled by the kind of experience behind it — not a made-up percentage."
        />

        {/* Legend */}
        <AnimatedSection>
          <dl className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {proficiencyLevels.map((l) => {
              const meta = proficiencyMeta[l]
              return (
                <div key={l} className="card p-4">
                  <dt className="flex items-center gap-2 text-sm font-semibold">
                    <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
                    {meta.label}
                  </dt>
                  <dd className="mt-1 text-xs text-muted">{meta.description}</dd>
                </div>
              )
            })}
          </dl>
        </AnimatedSection>

        {/* Controls */}
        <AnimatedSection className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <label htmlFor={searchId} className="sr-only-text">
              Search skills
            </label>
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-subtle"
            />
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search skills — e.g. Django, YOLO, Flutter"
              className="field pl-10"
              autoComplete="off"
            />
          </div>

          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            <Chip active={categoryId === 'all'} onClick={() => setCategoryId('all')}>
              All categories
            </Chip>
            {skillCategories.map((c) => (
              <Chip key={c.id} active={categoryId === c.id} onClick={() => setCategoryId(c.id)}>
                {c.title}
              </Chip>
            ))}
          </div>

          <div role="group" aria-label="Filter by proficiency" className="flex flex-wrap gap-2">
            <Chip active={level === 'all'} onClick={() => setLevel('all')}>
              Any level
            </Chip>
            {proficiencyLevels.map((l) => (
              <Chip
                key={l}
                active={level === l}
                onClick={() => setLevel(l)}
                color={proficiencyMeta[l].color}
              >
                {proficiencyMeta[l].label}
              </Chip>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted">
            <p role="status" aria-live="polite">
              {total} {total === 1 ? 'skill' : 'skills'} shown
            </p>
            {hasFilters ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex cursor-pointer items-center gap-1.5 text-[var(--cyan)] hover:underline"
              >
                <X size={14} aria-hidden="true" /> Clear filters
              </button>
            ) : null}
          </div>
        </AnimatedSection>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="card p-10 text-center text-muted">
            No skills match those filters.{' '}
            <button type="button" onClick={reset} className="cursor-pointer text-[var(--cyan)] underline">
              Reset
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filtered.map((cat) => (
              <div key={cat.id} className="card p-5 sm:p-6">
                <h3 className="font-display text-lg font-bold">{cat.title}</h3>
                <p className="mt-1 mb-4 text-sm text-muted">{cat.blurb}</p>
                <ul className="grid gap-2 sm:grid-cols-1">
                  {cat.skills.map((s) => (
                    <SkillBadge key={s.name} skill={s} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
