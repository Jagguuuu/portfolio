import { ArrowDown, ArrowRight, Radio, RotateCcw } from 'lucide-react'
import { Fragment } from 'react'
import type { Workflow } from '../../data/projects'
import { cn } from '../../lib/utils'

interface WorkflowDiagramProps {
  workflow: Workflow
  className?: string
}

const accents = ['var(--cyan)', 'var(--blue)', 'var(--violet)'] as const

/**
 * Responsive workflow diagram built from React + SVG connectors.
 * Vertical on small screens, horizontal from `md` up.
 */
export function WorkflowDiagram({ workflow, className }: WorkflowDiagramProps) {
  const { nodes, loop, layer } = workflow

  return (
    <figure className={cn('rounded-2xl border border-line bg-surface p-4 sm:p-5', className)}>
      <figcaption className="mb-4">
        <p className="font-display text-base font-bold">{workflow.title}</p>
        <p className="text-sm text-muted">{workflow.caption}</p>
      </figcaption>

      <ol
        className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-0"
        aria-label={`${workflow.title} steps`}
      >
        {nodes.map((node, i) => {
          const accent = accents[i % accents.length]
          return (
            <Fragment key={node.label}>
              <li className="flex-1">
                <div
                  className="relative h-full rounded-xl border bg-solid px-3 py-3 text-center"
                  style={{ borderColor: `color-mix(in srgb, ${accent} 55%, var(--border))` }}
                >
                  <span
                    aria-hidden="true"
                    className="mb-1.5 inline-grid h-5 w-5 place-items-center rounded-full font-mono text-[10px] font-semibold text-white"
                    style={{ background: accent }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm font-semibold">{node.label}</p>
                  {node.sub ? <p className="mt-0.5 text-xs text-muted">{node.sub}</p> : null}
                </div>
              </li>
              {i < nodes.length - 1 ? (
                <li aria-hidden="true" className="flex shrink-0 justify-center text-subtle md:px-1.5">
                  <ArrowDown size={16} className="md:hidden" />
                  <ArrowRight size={16} className="hidden md:block" />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>

      {loop ? (
        <p className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong px-3 py-2 text-center text-xs text-muted">
          <RotateCcw size={14} aria-hidden="true" className="shrink-0 text-[var(--violet)]" />
          {loop.label}
        </p>
      ) : null}

      {layer ? (
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-[color-mix(in_srgb,var(--cyan)_45%,var(--border))] bg-[color-mix(in_srgb,var(--cyan)_7%,transparent)] px-4 py-3">
          <Radio size={18} aria-hidden="true" className="shrink-0 text-[var(--cyan)]" />
          <div>
            <p className="font-mono text-xs font-medium">{layer.label}</p>
            {layer.sub ? <p className="text-xs text-muted">{layer.sub}</p> : null}
          </div>
        </div>
      ) : null}
    </figure>
  )
}
