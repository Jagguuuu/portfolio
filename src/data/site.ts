export type SectionId =
  | 'home'
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'ai-lab'
  | 'studio'
  | 'contact'

export interface NavItem {
  id: SectionId
  label: string
}

export const navItems: readonly NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ai-lab', label: 'AI/ML Lab' },
  { id: 'studio', label: '3D Studio' },
  { id: 'contact', label: 'Contact' },
] as const

export const sectionIds: readonly SectionId[] = navItems.map((n) => n.id)

export const personal = {
  name: 'Jagmohan Das',
  initials: 'JD',
  email: 'Jagguuu83@gmail.com',
  phone: '+91 7751077796',
  phoneHref: 'tel:+917751077796',
  location: 'Hyderabad, Telangana, India',
  headline: 'Building Intelligent Systems. Engineering Immersive Experiences.',
  headlineLead: 'Building Intelligent Systems.',
  headlineTail: 'Engineering Immersive Experiences.',
  titles: [
    'Software Engineer',
    'Backend Engineer',
    'AI/ML Developer',
    '3D & Interactive Technology Enthusiast',
  ],
  intro:
    'I build scalable backend systems, intelligent computer vision solutions, full-stack applications, and interactive digital experiences — bringing software engineering and emerging technologies together.',
  resumeUrl: '/resume.pdf',
  resumeFileName: 'Jagmohan-Das-Resume.pdf',
  education: {
    degree: 'B.Tech, Computer Science & Engineering',
    institution: 'Biju Patnaik University of Technology',
    region: 'Odisha, India',
    period: '2020 – 2024',
    cgpa: '8.6',
  },
  availability: {
    open: true,
    label: 'Open to opportunities',
    closedLabel: 'Currently not available',
  },
} as const

export type SocialId = 'github' | 'linkedin' | 'email' | 'phone'

export interface SocialLink {
  id: SocialId
  label: string
  href: string
  external: boolean
}

export const socials: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Jagguuuu',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jagmohandas/',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${personal.email}`,
    external: false,
  },
  {
    id: 'phone',
    label: 'Phone',
    href: personal.phoneHref,
    external: false,
  },
]

/** Verified-only highlights. Every value is traceable to the resume. */
export interface Stat {
  id: string
  value: string
  label: string
  detail?: string
}

export const stats: readonly Stat[] = [
  {
    id: 'faster',
    value: '~90%',
    label: 'Faster mission processing',
    detail: '3–4 hours → 25–30 minutes (geospatial simulation platform)',
  },
  {
    id: 'models',
    value: '25+',
    label: 'Data models designed',
    detail: 'Geospatial defense aviation simulation (sanitized)',
  },
  {
    id: 'streams',
    value: '5',
    label: 'Engineering workstreams',
    detail: 'Backend, geospatial, computer vision, mobile, internal tooling',
  },
  {
    id: 'cgpa',
    value: personal.education.cgpa,
    label: 'B.Tech CGPA',
    detail: 'Computer Science & Engineering, 2020–2024',
  },
]

/** Runtime configuration (env-driven). Nothing here is a secret. */
export const config = {
  formspreeId: (import.meta.env.VITE_FORMSPREE_ID ?? '').trim(),
  contactEmail: (import.meta.env.VITE_CONTACT_EMAIL ?? '').trim() || personal.email,
  /**
   * Live-demo / repo placeholders. Set the env var to override; the default for
   * Blood450 is the Vercel URL listed on the GitHub repository.
   */
  links: {
    blood450Live:
      (import.meta.env.VITE_BLOOD450_LIVE_URL ?? '').trim() || 'https://blood-450-bay.vercel.app',
    blood450Repo: 'https://github.com/Jagguuuu/Blood-450',
    /** Unknown at time of writing — leave empty to hide the GitHub button. */
    promsRepo: (import.meta.env.VITE_PROMS_GITHUB_URL ?? '').trim(),
    ajaDocsRepo: 'https://github.com/Jagguuuu/AjaDocs',
    ajaDocsLive: 'https://aja-docs.vercel.app',
  },
} as const

export const formspreeEndpoint: string | null = config.formspreeId
  ? `https://formspree.io/f/${config.formspreeId}`
  : null
