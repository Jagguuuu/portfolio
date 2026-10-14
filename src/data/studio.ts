export type StudioStatus = 'professional-web' | 'exploring' | 'coming-soon'

export interface StudioItem {
  id: string
  title: string
  status: StudioStatus
  summary: string
  tools: readonly string[]
}

export const studioDisclaimer =
  'Unreal Engine and Maya are creative interests I am exploring alongside my engineering work. They are not part of my professional experience.'

export const studioStatusLabels: Record<StudioStatus, string> = {
  'professional-web': 'Used professionally',
  exploring: 'Exploring',
  'coming-soon': 'Coming soon',
}

export const studioItems: readonly StudioItem[] = [
  {
    id: 'web-3d',
    title: 'Browser-based 3D & maps',
    status: 'professional-web',
    summary:
      'CesiumJS and Three.js used to visualize geospatial simulation data in the browser as part of professional work.',
    tools: ['CesiumJS', 'Three.js'],
  },
  {
    id: 'unreal',
    title: 'Real-time 3D with Unreal Engine',
    status: 'exploring',
    summary:
      'Learning real-time rendering and interactive scenes as a creative interest, with an eye towards immersive experiences.',
    tools: ['Unreal Engine'],
  },
  {
    id: 'maya',
    title: '3D modelling with Maya',
    status: 'exploring',
    summary: 'Learning 3D modelling and asset creation as a creative interest.',
    tools: ['Autodesk Maya'],
  },
  {
    id: 'showcase',
    title: 'Studio showcase',
    status: 'coming-soon',
    summary: 'Experiments and interactive pieces will be published here once assets are ready.',
    tools: [],
  },
]
