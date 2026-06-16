/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** App Insights connection string, baked in at build time by the deploy
   *  workflow. Empty when the "app-insights" component is opted out. */
  readonly VITE_APPLICATIONINSIGHTS_CONNECTION_STRING?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
