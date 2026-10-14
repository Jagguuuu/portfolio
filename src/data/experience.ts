export interface Workstream {
  id: string
  title: string
  category: string
  summary: string
  highlights: readonly string[]
  stack: readonly string[]
  metric?: { value: string; label: string }
  /** Work shown in a public-safe form: no client, program or system names. */
  sanitized: boolean
}

export interface Role {
  id: string
  company: string
  title: string
  location: string
  start: string
  end: string
  current: boolean
  summary: string
  workstreams: readonly Workstream[]
}

export const roles: readonly Role[] = [
  {
    id: 'avsys',
    company: 'AvSys International India Pvt Ltd',
    title: 'Software Engineer',
    location: 'Hyderabad, India',
    start: 'Aug 2024',
    end: 'Present',
    current: true,
    summary:
      'Delivering backend, full-stack, geospatial, computer vision and mobile work across five engineering workstreams.',
    workstreams: [
      {
        id: 'enterprise-fullstack',
        title: 'Enterprise Full-Stack Applications',
        category: 'Full-Stack',
        summary:
          'Design and development of enterprise web applications with a Django REST backend and server-rendered / JavaScript front ends.',
        highlights: [
          'Built REST APIs with Django REST Framework on top of PostgreSQL data models.',
          'Developed responsive interfaces with JavaScript, HTML, CSS and Bootstrap.',
          'Worked across the stack from schema design through to UI delivery.',
        ],
        stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
        sanitized: false,
      },
      {
        id: 'geospatial-simulation',
        title: 'Geospatial Aviation Simulation Platform',
        category: 'Geospatial / 3D',
        summary:
          'Backend and visualization work on a geospatial simulation platform for defense aviation mission planning. Described in a public-safe form — no client, program or system names.',
        highlights: [
          'Designed 25+ data models in a GeoDjango / PostGIS backend.',
          'Built 3D / map-based visualization using CesiumJS and Three.js.',
          'Cut mission processing from roughly 3–4 hours to 25–30 minutes (~90% faster).',
        ],
        stack: ['Python', 'GeoDjango', 'PostGIS', 'CesiumJS', 'Three.js'],
        metric: { value: '~90%', label: 'faster mission processing (3–4h → 25–30 min)' },
        sanitized: true,
      },
      {
        id: 'wildlife-cv',
        title: 'Wildlife Monitoring with Computer Vision',
        category: 'AI / Computer Vision',
        summary:
          'Computer vision detection pipeline for monitoring wildlife from CCTV footage.',
        highlights: [
          'Trained object-detection models with YOLOv8.',
          'Managed dataset annotation and versioning with Roboflow.',
          'Ran training and experimentation on Google Colab; applied to CCTV video feeds.',
        ],
        stack: ['YOLOv8', 'Roboflow', 'Google Colab', 'CCTV', 'Python'],
        sanitized: false,
      },
      {
        id: 'training-mobile',
        title: 'Military Training Mobile Application',
        category: 'Mobile',
        summary:
          'Flutter Android application for a confidential military training platform, synchronizing Android and web workflows. Presented in a public-safe form.',
        highlights: [
          'Built the Flutter Android application with Riverpod state management.',
          'Implemented video playback, viewing history, Watch Later, and a custom mini-player.',
          'Integrated with Django REST APIs and synchronized Android and web workflows.',
        ],
        stack: ['Flutter', 'Dart', 'Riverpod', 'Django REST Framework'],
        sanitized: true,
      },
      {
        id: 'proms-internal',
        title: 'ProMS — Internal Project Management System',
        category: 'Internal Tooling',
        summary:
          'Internal system modelling the delivery lifecycle from Project to Task, QA and Bug, with real-time updates.',
        highlights: [
          'Modelled the Project → Task → QA → Bug workflow.',
          'Added real-time behaviour using Django Channels and WebSockets.',
        ],
        stack: ['Django', 'Django Channels', 'WebSockets', 'Python'],
        sanitized: false,
      },
    ],
  },
]
