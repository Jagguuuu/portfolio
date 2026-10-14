export interface ArchLayer {
  name: string
  items: readonly string[]
}

export interface EngineeringTopic {
  id: string
  title: string
  kicker: string
  summary: string
  principles: readonly string[]
  layers: readonly ArchLayer[]
  /** Grounded reference to where this was applied */
  appliedIn: string
}

export const engineeringIntro =
  'How I think about building systems — illustrated with the architecture behind work I have shipped. Diagrams are high-level and public-safe.'

export const engineeringTopics: readonly EngineeringTopic[] = [
  {
    id: 'geospatial-modelling',
    title: 'Geospatial data modelling',
    kicker: 'GeoDjango · PostGIS',
    summary:
      'Treat location as first-class data. A well-modelled spatial schema turns slow, manual processing into queries the database can answer.',
    principles: [
      'Model the domain explicitly — 25+ data models with clear relationships.',
      'Let PostGIS do spatial work instead of application loops.',
      'Keep the visualization layer thin and fed by the API.',
    ],
    layers: [
      { name: 'Visualization', items: ['CesiumJS', 'Three.js'] },
      { name: 'API', items: ['Django views', 'Serializers'] },
      { name: 'Domain', items: ['GeoDjango models', 'Mission processing'] },
      { name: 'Data', items: ['PostgreSQL', 'PostGIS'] },
    ],
    appliedIn: 'Geospatial aviation simulation (public-safe) — mission processing 3–4h → 25–30 min.',
  },
  {
    id: 'realtime',
    title: 'Real-time updates',
    kicker: 'Django Channels · WebSockets',
    summary:
      'Push state changes to users as they happen, built on an explicit workflow model so each transition is easy to reason about.',
    principles: [
      'Model state transitions first, transport second.',
      'Broadcast changes over WebSockets rather than polling.',
      'Keep HTTP APIs and real-time channels sharing the same domain logic.',
    ],
    layers: [
      { name: 'Client', items: ['Browser', 'WebSocket connection'] },
      { name: 'Transport', items: ['Django Channels', 'Channel layer'] },
      { name: 'Domain', items: ['Project', 'Task', 'QA', 'Bug'] },
      { name: 'Data', items: ['PostgreSQL'] },
    ],
    appliedIn: 'ProMS — Project → Task → QA → Bug workflow.',
  },
  {
    id: 'cv-pipeline',
    title: 'Computer vision pipelines',
    kicker: 'YOLOv8 · Roboflow',
    summary:
      'Treat detection as a repeatable pipeline: versioned data in, trained model out, results reviewed and fed back.',
    principles: [
      'Version datasets so every training run is reproducible.',
      'Separate experimentation (Colab) from the application that consumes detections.',
      'Close the loop — review output and improve the dataset.',
    ],
    layers: [
      { name: 'Source', items: ['CCTV footage'] },
      { name: 'Data', items: ['Roboflow annotation', 'Dataset versions'] },
      { name: 'Model', items: ['YOLOv8', 'Google Colab training'] },
      { name: 'Output', items: ['Detections', 'Review'] },
    ],
    appliedIn: 'Wildlife monitoring on CCTV footage.',
  },
  {
    id: 'mobile-state',
    title: 'Predictable mobile state',
    kicker: 'Flutter · Riverpod',
    summary:
      'Keep UI declarative and state in one place, so features like a persistent mini-player stay maintainable.',
    principles: [
      'Providers own state; widgets only render it.',
      'Isolate API access behind a repository layer.',
      'Design cross-screen features (mini-player) as shared state, not widget plumbing.',
    ],
    layers: [
      { name: 'UI', items: ['Flutter widgets', 'Mini-player'] },
      { name: 'State', items: ['Riverpod providers'] },
      { name: 'Data', items: ['API client', 'Django APIs'] },
    ],
    appliedIn: 'Training mobile app (public-safe) and Flutter Video Platform.',
  },
  {
    id: 'secure-apis',
    title: 'Secure, server-enforced APIs',
    kicker: 'DRF · JWT',
    summary:
      'Never trust the client with authorization. Access control lives on the server and the UI simply reflects it.',
    principles: [
      'JWT access and refresh tokens for authentication.',
      'Permissions (owner / editor / viewer) checked server-side on every request.',
      'Tests around accounts and documents to protect those rules.',
    ],
    layers: [
      { name: 'Client', items: ['React', 'TipTap editor'] },
      { name: 'API', items: ['Django REST Framework', 'SimpleJWT'] },
      { name: 'Permissions', items: ['Owner', 'Editor', 'Viewer'] },
      { name: 'Data', items: ['SQLite (dev)', 'PostgreSQL (prod target)'] },
    ],
    appliedIn: 'AjaDocs — collaborative document workspace.',
  },
]
