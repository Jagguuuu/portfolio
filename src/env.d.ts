/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_BLOOD450_LIVE_URL?: string
  readonly VITE_PROMS_GITHUB_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
