/**
 * Proficiency is expressed as a labelled level of experience, never as a
 * percentage. Each label describes where the skill has actually been used.
 */
export type ProficiencyLevel = 'professional' | 'project' | 'working' | 'exploring'

export interface ProficiencyMeta {
  label: string
  description: string
  /** CSS color variable used for the badge accent */
  color: string
  order: number
}

export const proficiencyMeta: Record<ProficiencyLevel, ProficiencyMeta> = {
  professional: {
    label: 'Professional Experience',
    description: 'Used in production work at my current role.',
    color: 'var(--blue)',
    order: 0,
  },
  project: {
    label: 'Project Experience',
    description: 'Used in personal or published projects.',
    color: 'var(--violet)',
    order: 1,
  },
  working: {
    label: 'Working Knowledge',
    description: 'Comfortable using with documentation at hand.',
    color: 'var(--cyan)',
    order: 2,
  },
  exploring: {
    label: 'Exploring',
    description: 'Actively learning; not yet used professionally.',
    color: 'var(--fg-subtle)',
    order: 3,
  },
}

export const proficiencyLevels: readonly ProficiencyLevel[] = [
  'professional',
  'project',
  'working',
  'exploring',
]

export interface Skill {
  name: string
  level: ProficiencyLevel
  note?: string
}

export interface SkillCategory {
  id: string
  title: string
  blurb: string
  skills: readonly Skill[]
}

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    blurb: 'APIs, auth, real-time systems, and background processing.',
    skills: [
      { name: 'Python', level: 'professional' },
      { name: 'Django', level: 'professional' },
      { name: 'Django REST Framework', level: 'professional' },
      { name: 'REST APIs', level: 'professional' },
      { name: 'Django Channels', level: 'professional', note: 'WebSockets' },
      { name: 'WebSockets', level: 'professional' },
      { name: 'Celery', level: 'working' },
      { name: 'JWT', level: 'project', note: 'Blood450 & AjaDocs' },
      { name: 'Node.js', level: 'working' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    blurb: 'Interfaces for enterprise and product workflows.',
    skills: [
      { name: 'JavaScript', level: 'professional' },
      { name: 'HTML', level: 'professional' },
      { name: 'CSS', level: 'professional' },
      { name: 'Bootstrap', level: 'professional' },
      { name: 'jQuery', level: 'working' },
      { name: 'React', level: 'project', note: 'AjaDocs & this portfolio' },
      { name: 'Tailwind CSS', level: 'project' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Development',
    blurb: 'Android experiences with clean state management.',
    skills: [
      { name: 'Flutter', level: 'professional' },
      { name: 'Dart', level: 'professional' },
      { name: 'Riverpod', level: 'professional' },
      { name: 'Android application development', level: 'professional' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Data Systems',
    blurb: 'Relational, geospatial, document, and cache layers.',
    skills: [
      { name: 'PostgreSQL', level: 'professional' },
      { name: 'PostGIS', level: 'professional' },
      { name: 'MySQL', level: 'working' },
      { name: 'MongoDB', level: 'working' },
      { name: 'SQLite', level: 'project' },
      { name: 'Redis', level: 'working' },
    ],
  },
  {
    id: 'ai-cv',
    title: 'AI, ML & Computer Vision',
    blurb: 'Detection pipelines from annotation to evaluation.',
    skills: [
      { name: 'YOLOv8', level: 'professional' },
      { name: 'OpenCV', level: 'working' },
      { name: 'PyTorch', level: 'working' },
      { name: 'TensorFlow', level: 'working' },
      { name: 'Hugging Face', level: 'working' },
      { name: 'Roboflow', level: 'professional' },
      { name: 'Google Colab', level: 'professional' },
    ],
  },
  {
    id: 'geospatial',
    title: 'Geospatial & Interactive 3D',
    blurb: 'Spatial backends and browser visualization.',
    skills: [
      { name: 'GeoDjango', level: 'professional' },
      { name: 'CesiumJS', level: 'professional' },
      { name: 'Three.js', level: 'professional' },
      { name: 'Spatial data processing', level: 'professional' },
      { name: 'Interactive mapping', level: 'professional' },
    ],
  },
  {
    id: 'cloud-tools',
    title: 'Cloud, Infrastructure & Tools',
    blurb: 'Delivery, servers, and AI-assisted development.',
    skills: [
      { name: 'AWS', level: 'working' },
      { name: 'Linux', level: 'working' },
      { name: 'Git', level: 'professional' },
      { name: 'Nginx', level: 'working' },
      { name: 'Cursor AI', level: 'working' },
      { name: 'Claude', level: 'working' },
    ],
  },
  {
    id: 'creative-3d',
    title: 'Game Development & 3D Art',
    blurb: 'Creative technology skills — exploring with clear labeling.',
    skills: [
      { name: 'Unreal Engine', level: 'exploring' },
      { name: 'Autodesk Maya', level: 'exploring' },
      { name: '3D modeling', level: 'exploring' },
      { name: 'Materials & texturing', level: 'exploring' },
      { name: 'Lighting & rendering', level: 'exploring' },
      { name: 'Real-time 3D environments', level: 'exploring' },
      { name: 'Interactive simulations', level: 'working', note: 'Via CesiumJS / Three.js at work' },
    ],
  },
]
