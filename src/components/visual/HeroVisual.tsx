import { useId } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

interface Chip {
  label: string
  angle: number
  color: string
}

/** Technologies taken from real workstreams. */
const chips: readonly Chip[] = [
  { label: 'Django', angle: -90, color: 'var(--blue)' },
  { label: 'PostGIS', angle: -30, color: 'var(--cyan)' },
  { label: 'YOLOv8', angle: 30, color: 'var(--violet)' },
  { label: 'Flutter', angle: 90, color: 'var(--blue)' },
  { label: 'Three.js', angle: 150, color: 'var(--cyan)' },
  { label: 'Channels', angle: 210, color: 'var(--violet)' },
]

const C = 240 // centre
const R_CHIP = 188
const CHIP_W = 88
const CHIP_H = 28

function polar(angleDeg: number, r: number): { x: number; y: number } {
  const a = (angleDeg * Math.PI) / 180
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) }
}

function hexPoints(r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const { x, y } = polar(-90 + i * 60, r)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  }).join(' ')
}

/**
 * Lightweight CSS/SVG composition: a core node connected to the technologies used across
 * real projects, with slowly orbiting rings. All motion is CSS and is disabled when the
 * user prefers reduced motion (the composition then renders as a static illustration).
 */
export function HeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const gradId = `hv-grad-${uid}`
  const glowId = `hv-glow-${uid}`
  const clipId = `hv-clip-${uid}`
  const motionOn = !reduced

  return (
    <div className={cn('relative mx-auto aspect-square w-full max-w-[520px]', className)}>
      <div
        aria-hidden="true"
        className="ambient-glow left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 bg-[var(--glow-violet)]"
      />
      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-label="Illustration: a central node connected to Django, PostGIS, YOLOv8, Flutter, Three.js and Channels"
        className={cn('relative h-full w-full', motionOn && 'anim-float')}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--cyan)" />
            <stop offset="0.5" stopColor="var(--blue)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
          <radialGradient id={glowId}>
            <stop offset="0" stopColor="var(--blue)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--blue)" stopOpacity="0" />
          </radialGradient>
          <clipPath id={clipId}>
            <circle cx={C} cy={C} r="132" />
          </clipPath>
        </defs>

        {/* Core glow */}
        <circle cx={C} cy={C} r="150" fill={`url(#${glowId})`} />

        {/* Orbit rings */}
        <g className={motionOn ? 'anim-orbit' : undefined}>
          <circle
            cx={C}
            cy={C}
            r="206"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="2 8"
            fill="none"
          />
          <circle cx={polar(20, 206).x} cy={polar(20, 206).y} r="4" fill={`url(#${gradId})`} />
          <circle cx={polar(200, 206).x} cy={polar(200, 206).y} r="3" fill="var(--cyan)" />
        </g>
        <g className={motionOn ? 'anim-orbit-rev' : undefined}>
          <circle
            cx={C}
            cy={C}
            r="132"
            stroke="var(--border-strong)"
            strokeWidth="1"
            strokeDasharray="1 5"
            fill="none"
          />
          <circle cx={polar(120, 132).x} cy={polar(120, 132).y} r="3.5" fill="var(--violet)" />
          <circle cx={polar(300, 132).x} cy={polar(300, 132).y} r="3" fill="var(--blue)" />
        </g>
        <circle cx={C} cy={C} r="92" stroke="var(--border)" strokeWidth="1" fill="none" />

        {/* Connectors */}
        {chips.map((chip) => {
          const from = polar(chip.angle, 62)
          const to = polar(chip.angle, R_CHIP - CHIP_W / 2 + 14)
          return (
            <line
              key={chip.label}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={chip.color}
              strokeOpacity="0.55"
              strokeWidth="1.25"
              className={motionOn ? 'anim-dash' : undefined}
              strokeDasharray={motionOn ? undefined : '6 6'}
            />
          )
        })}

        {/* Scan line inside the inner ring */}
        {motionOn ? (
          <g clipPath={`url(#${clipId})`}>
            <rect
              x={C - 132}
              y={C - 132}
              width="264"
              height="2"
              fill="var(--cyan)"
              opacity="0.6"
              className="anim-scan"
            />
          </g>
        ) : null}

        {/* Core hexagon */}
        <polygon
          points={hexPoints(58)}
          fill="var(--surface-solid)"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <polygon
          points={hexPoints(44)}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <text
          x={C}
          y={C + 9}
          textAnchor="middle"
          fontFamily="Bricolage Grotesque, sans-serif"
          fontWeight="800"
          fontSize="28"
          fill={`url(#${gradId})`}
        >
          JD
        </text>

        {/* Technology chips */}
        {chips.map((chip, i) => {
          const { x, y } = polar(chip.angle, R_CHIP)
          return (
            <g
              key={chip.label}
              className={motionOn ? 'anim-pulse' : undefined}
              style={motionOn ? { animationDelay: `${i * 0.5}s` } : undefined}
            >
              <rect
                x={x - CHIP_W / 2}
                y={y - CHIP_H / 2}
                width={CHIP_W}
                height={CHIP_H}
                rx={CHIP_H / 2}
                fill="var(--surface-solid)"
                stroke={chip.color}
                strokeOpacity="0.7"
              />
              <circle cx={x - CHIP_W / 2 + 14} cy={y} r="3" fill={chip.color} />
              <text
                x={x + 6}
                y={y + 4}
                textAnchor="middle"
                fontFamily="JetBrains Mono, monospace"
                fontSize="11.5"
                fill="var(--fg)"
              >
                {chip.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
