import { config } from './site'

export type ProjectFilterId =
  | 'all'
  | 'backend'
  | 'full-stack'
  | 'ai-ml'
  | 'computer-vision'
  | 'mobile'
  | 'geospatial'
  | '3d-simulation'
  | 'in-progress'

export interface ProjectFilter {
  id: ProjectFilterId
  label: string
}

export const projectFilters: readonly ProjectFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'full-stack', label: 'Full Stack' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'geospatial', label: 'Geospatial' },
  { id: '3d-simulation', label: '3D & Simulation' },
  { id: 'in-progress', label: 'In progress' },
]

export type WorkflowId = 'blood450' | 'proms' | 'cv-pipeline' | 'geospatial' | 'video-platform'

export interface CaseStudy {
  problem: string
  role: string
  approach: readonly string[]
  outcomes: readonly string[]
  learnings?: readonly string[]
}

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  /** false = draft / unpublished until assets are ready */
  published: boolean
  featured: boolean
  origin: 'personal' | 'professional'
  /** Work shown in a public-safe form without confidential names */
  sanitized: boolean
  filters: readonly Exclude<ProjectFilterId, 'all'>[]
  stack: readonly string[]
  links: ProjectLinks
  workflow?: WorkflowId
  caseStudy?: CaseStudy
  /** Short note displayed on drafts / placeholders */
  statusNote?: string
}

export const projects: readonly Project[] = [
  {
    id: 'blood450',
    title: 'Blood450 — Intelligent Blood Donation Platform',
    tagline: 'Emergency donor matching with progressive radius search',
    description:
      'Independently designed and developed an end-to-end blood donation and emergency donor matching platform: 25+ database models, 32 REST APIs, and a 16-screen Flutter app with JWT auth, notifications, and real-time communication. Designed for future AI-assisted emergency response.',
    published: true,
    featured: true,
    origin: 'personal',
    sanitized: false,
    filters: ['full-stack', 'backend', 'mobile'],
    stack: ['Django', 'Django REST Framework', 'Flutter', 'PostgreSQL', 'JWT', 'WebSockets'],
    links: {
      github: config.links.blood450Repo,
      live: config.links.blood450Live,
    },
    workflow: 'blood450',
    caseStudy: {
      problem:
        'During emergencies, locating compatible blood donors quickly is a coordination problem — search has to expand intelligently when nearby donors are unavailable.',
      role: 'Independent full-stack developer — architecture, backend, Flutter app, and deployment.',
      approach: [
        'Architected 25+ database models and 32 REST APIs with Django REST Framework and PostgreSQL.',
        'Built a 16-screen Flutter application with JWT authentication and Google Sign-In (web).',
        'Implemented an emergency donor matching algorithm that expands search radius from 5 km → 7 km → 9 km → 11 km.',
        'Added donor registration, profile management, emergency request workflows, notifications, and WebSocket real-time communication.',
        'Designed the platform for future LLM, RAG, and AI-assisted emergency response capabilities.',
      ],
      outcomes: [
        'Complete end-to-end platform: schema, APIs, Flutter client, and deployment pipeline.',
        'Progressive-radius matching that maximizes donor availability during emergencies.',
      ],
      learnings: [
        'Radius expansion needs clear UX feedback so requesters understand why search is widening.',
        'Mobile-to-backend contracts must stay stable while auth, notifications, and realtime evolve together.',
      ],
    },
  },
  {
    id: 'proms',
    title: 'ProMS — Enterprise Project Management System',
    tagline: 'Project → Task → QA → Bug with real-time collaboration',
    description:
      'Full-stack project management platform with role-based access for Project Managers, Developers, and QA teams. Supports defect tracking, verification, and retesting with live updates via Django Channels and WebSockets.',
    published: true,
    featured: true,
    origin: 'professional',
    sanitized: false,
    filters: ['full-stack', 'backend'],
    stack: ['Django', 'Django REST Framework', 'PostgreSQL', 'Django Channels', 'Bootstrap'],
    links: {
      github: config.links.promsRepo || undefined,
    },
    workflow: 'proms',
    caseStudy: {
      problem:
        'Delivery work moves through planning, implementation, QA, and defect fixing. Teams need one system where ownership and state changes are visible immediately.',
      role: 'Core developer — lifecycle modeling, RBAC, and real-time collaboration.',
      approach: [
        'Modeled Project → Task → QA Verification → Bug as an explicit enterprise SDLC lifecycle.',
        'Implemented role-based access for Project Managers, Developers, and QA teams.',
        'Built real-time collaboration with Django Channels and WebSockets.',
        'Added defect tracking, QA assignment, verification ownership, and retesting workflows.',
      ],
      outcomes: [
        'Internal system supporting the full delivery lifecycle with live collaboration.',
        'Clear hand-offs between development and QA without manual refresh.',
      ],
    },
    statusNote: 'Internal / professional product. Public repository link can be configured via VITE_PROMS_GITHUB_URL.',
  },
  {
    id: 'geospatial-simulation',
    title: 'Geospatial Simulation Platform',
    tagline: 'Public-safe case study — aviation mission simulation',
    description:
      'Backend architecture and geospatial visualization for a defense aviation simulation platform. 25+ Django models with GeoDjango, PostGIS, CesiumJS, and Three.js. Mission processing reduced from ~3–4 hours to 25–30 minutes (~90% improvement).',
    published: true,
    featured: true,
    origin: 'professional',
    sanitized: true,
    filters: ['geospatial', 'backend', '3d-simulation'],
    stack: ['Django', 'GeoDjango', 'PostGIS', 'CesiumJS', 'Three.js'],
    links: {},
    workflow: 'geospatial',
    caseStudy: {
      problem:
        'Mission processing for geospatial simulation took approximately 3–4 hours, slowing iteration and analytical workflows.',
      role: 'Software Engineer — backend architecture, spatial processing, and visualization integration.',
      approach: [
        'Designed backend architecture involving 25+ Django models with geospatial workflows.',
        'Used GeoDjango and PostGIS for spatial data and analytical processing.',
        'Integrated CesiumJS and Three.js for interactive geospatial visualization.',
        'Optimized spatial queries and computational logic for mission processing.',
      ],
      outcomes: [
        'Mission processing reduced from approximately 3–4 hours to 25–30 minutes (~90% faster).',
        'Production-oriented geospatial backend suitable for analytical visualization.',
      ],
    },
    statusNote:
      'Sanitized professional case study. No confidential program names, operational details, or restricted screenshots.',
  },
  {
    id: 'wildlife-monitoring',
    title: 'Wildlife Monitoring AI',
    tagline: 'YOLOv8 computer vision for live CCTV detection',
    description:
      'Independently developed the ML component of a wildlife monitoring system: data collection, annotation, and YOLOv8 training with Roboflow and Google Colab for live CCTV detection under varied lighting, viewpoints, and night-vision conditions.',
    published: true,
    featured: true,
    origin: 'professional',
    sanitized: false,
    filters: ['ai-ml', 'computer-vision'],
    stack: ['YOLOv8', 'OpenCV', 'Roboflow', 'Google Colab', 'Python'],
    links: {},
    workflow: 'cv-pipeline',
    caseStudy: {
      problem:
        'Manual review of CCTV wildlife footage is slow and inconsistent across lighting changes, camera angles, and night-vision feeds.',
      role: 'Independent developer of the machine learning component — data, training, and evaluation.',
      approach: [
        'Collected and annotated training data for wildlife detection.',
        'Managed dataset workflows with Roboflow and trained YOLOv8 models on Google Colab.',
        'Evaluated robustness across lighting variation, viewpoints, and night-vision scenarios.',
        'Prepared models for live CCTV wildlife detection.',
      ],
      outcomes: [
        'Working computer vision pipeline from video input to detection output.',
        'Improved robustness under challenging real-world camera conditions.',
      ],
      learnings: [
        'Night-vision and viewpoint shifts require deliberate dataset coverage — accuracy claims without measured metrics are omitted here.',
      ],
    },
    statusNote: 'Professional work. Quantitative model metrics are omitted unless verified evaluation data is provided.',
  },
  {
    id: 'flutter-video-platform',
    title: 'Flutter Video Training Platform',
    tagline: 'Mobile video playback with custom mini-player',
    description:
      'Flutter Android application for a training platform: Riverpod state management, video playback, viewing history, Watch Later, and a custom mini-player integrated with Django REST APIs. Presented as a public-safe case study.',
    published: true,
    featured: false,
    origin: 'professional',
    sanitized: true,
    filters: ['mobile', 'full-stack'],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Django REST Framework'],
    links: {},
    workflow: 'video-platform',
    caseStudy: {
      problem:
        'Training content needs a polished mobile experience — playback continuity, history, and Watch Later — while staying synchronized with web workflows.',
      role: 'Software Engineer — Flutter Android client and Django REST API integration.',
      approach: [
        'Built the Flutter Android application with Riverpod state management.',
        'Implemented video playback, viewing history, Watch Later, and a custom mini-player.',
        'Synchronized Android and web workflows through Django REST APIs.',
      ],
      outcomes: [
        'Production mobile training experience with continuous playback via mini-player.',
        'API-driven content workflows shared with the web application.',
      ],
    },
    statusNote:
      'Public-safe description of professional work. Confidential program names and restricted screenshots are excluded.',
  },
  {
    id: 'ajadocs',
    title: 'AjaDocs',
    tagline: 'Collaborative document workspace',
    description:
      'A collaborative document workspace: rich-text editing with TipTap, sharing by email with view or edit access, server-enforced permissions, import / export, and an activity history.',
    published: true,
    featured: false,
    origin: 'personal',
    sanitized: false,
    filters: ['full-stack', 'backend'],
    stack: ['React', 'Vite', 'TipTap', 'Django', 'DRF', 'SimpleJWT', 'PostgreSQL'],
    links: {
      github: config.links.ajaDocsRepo,
      live: config.links.ajaDocsLive,
    },
    caseStudy: {
      problem:
        'Built for a full-stack developer assessment: a document editor with sharing, permissions and persistence.',
      role: 'Solo project — frontend and backend.',
      approach: [
        'React 19 + Vite frontend with TipTap editor, debounced autosave and Ctrl+K search.',
        'Django REST Framework API with SimpleJWT access / refresh authentication.',
        'Share by email with view or edit access; permissions enforced on the server.',
        'Import .txt / .md, export Markdown, activity history modal, light / dark theme.',
      ],
      outcomes: [
        'Published repository with setup docs and automated tests for the accounts and documents apps.',
        'SQLite locally; PostgreSQL as the production target.',
      ],
    },
  },
  {
    id: 'aleenas-chat',
    title: "Aleena's Chat",
    tagline: 'In development',
    description: 'Details will be published once project assets are ready.',
    published: false,
    featured: false,
    origin: 'personal',
    sanitized: false,
    filters: ['in-progress'],
    stack: [],
    links: {},
    statusNote: 'Draft — unpublished until assets are ready.',
  },
  {
    id: 'avatar-studio',
    title: 'Avatar Studio',
    tagline: 'In development',
    description: 'Details will be published once project assets are ready.',
    published: false,
    featured: false,
    origin: 'personal',
    sanitized: false,
    filters: ['in-progress'],
    stack: [],
    links: {},
    statusNote: 'Draft — unpublished until assets are ready.',
  },
  {
    id: 'flightdeck',
    title: 'FlightDeck',
    tagline: 'In development',
    description: 'Details will be published once project assets are ready.',
    published: false,
    featured: false,
    origin: 'personal',
    sanitized: false,
    filters: ['in-progress'],
    stack: [],
    links: {},
    statusNote: 'Draft — unpublished until assets are ready.',
  },
  {
    id: 'unreal-maya',
    title: 'Unreal / Maya Experiments',
    tagline: 'Creative exploration',
    description: 'Real-time 3D and modelling experiments. Details will be published once assets are ready.',
    published: false,
    featured: false,
    origin: 'personal',
    sanitized: false,
    filters: ['in-progress'],
    stack: ['Unreal Engine', 'Autodesk Maya'],
    links: {},
    statusNote: 'Draft — unpublished until assets are ready. Exploring, not professional experience.',
  },
]

export const publishedProjects: readonly Project[] = projects.filter((p) => p.published)
export const draftProjects: readonly Project[] = projects.filter((p) => !p.published)

export interface WorkflowNode {
  label: string
  sub?: string
}

export interface Workflow {
  id: WorkflowId
  title: string
  caption: string
  nodes: readonly WorkflowNode[]
  /** Optional feedback loop annotation shown under the flow */
  loop?: { label: string }
  /** Cross-cutting layer, e.g. a real-time channel */
  layer?: { label: string; sub?: string }
}

export const workflows: Record<WorkflowId, Workflow> = {
  blood450: {
    id: 'blood450',
    title: 'Blood450 — emergency donor matching',
    caption: 'User → Blood Request → Donor Matching → Radius Expansion → Notifications → Response.',
    nodes: [
      { label: 'User', sub: 'Requester / donor' },
      { label: 'Blood Request', sub: 'Emergency need' },
      { label: 'Donor Matching', sub: 'Compatible donors' },
      { label: 'Radius Expansion', sub: '5 → 7 → 9 → 11 km' },
      { label: 'Notifications', sub: 'Realtime alerts' },
      { label: 'Response', sub: 'Donor confirms' },
    ],
    layer: {
      label: 'Designed for future AI-assisted emergency response',
      sub: 'LLM / RAG capabilities planned — not claimed as implemented',
    },
  },
  proms: {
    id: 'proms',
    title: 'ProMS — delivery lifecycle',
    caption: 'Project → Task → QA Verification → Bug, with role-based access and real-time updates.',
    nodes: [
      { label: 'Project', sub: 'Scope & planning' },
      { label: 'Task', sub: 'Implementation' },
      { label: 'QA Verification', sub: 'Quality checks' },
      { label: 'Bug', sub: 'Defect tracking' },
    ],
    loop: { label: 'Bugs return for fix and retesting until QA passes' },
    layer: {
      label: 'Django Channels · WebSockets',
      sub: 'Real-time collaboration for PM, Developer, and QA roles',
    },
  },
  'cv-pipeline': {
    id: 'cv-pipeline',
    title: 'Wildlife Monitoring — CV pipeline',
    caption: 'Video/CCTV → Collection → Annotation → YOLOv8 Training → Evaluation → Detection.',
    nodes: [
      { label: 'CCTV Input', sub: 'Live / recorded video' },
      { label: 'Collection', sub: 'Image samples' },
      { label: 'Annotation', sub: 'Roboflow' },
      { label: 'YOLOv8 Training', sub: 'Google Colab' },
      { label: 'Evaluation', sub: 'Lighting / night-vision' },
      { label: 'Detection', sub: 'Live output' },
    ],
    loop: { label: 'Hard cases feed back into annotation and retraining' },
  },
  geospatial: {
    id: 'geospatial',
    title: 'Geospatial platform — data to visualization',
    caption: 'Public-safe, high-level view.',
    nodes: [
      { label: 'Mission data', sub: '25+ data models' },
      { label: 'GeoDjango · PostGIS', sub: 'Spatial processing' },
      { label: 'API', sub: 'Serves results' },
      { label: 'CesiumJS · Three.js', sub: '3D visualization' },
    ],
  },
  'video-platform': {
    id: 'video-platform',
    title: 'Flutter video platform — app flow',
    caption: 'Public-safe, high-level view.',
    nodes: [
      { label: 'Django APIs', sub: 'Content & data' },
      { label: 'Riverpod', sub: 'App state' },
      { label: 'Flutter UI', sub: 'Screens' },
      { label: 'Mini-player', sub: 'Persistent playback' },
    ],
  },
}
