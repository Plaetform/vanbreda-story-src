import { ApplicationInsights } from '@microsoft/applicationinsights-web'

// The connection string is baked into the bundle at build time from the
// VITE_APPLICATIONINSIGHTS_CONNECTION_STRING build arg, which the deploy
// workflow sets from the APPLICATIONINSIGHTS_CONNECTION_STRING repo secret the
// kiosk pushes when the "app-insights" component is enabled. When it is absent
// (component opted out, or local dev) telemetry stays off — no errors, no-op.
const connectionString = import.meta.env.VITE_APPLICATIONINSIGHTS_CONNECTION_STRING

if (connectionString) {
  const appInsights = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: true,
    },
  })
  appInsights.loadAppInsights()
  // First page view powers the dashboard's uptime + page-load p95 (the
  // `pageViews` table the kiosk health query reads for SPA apps).
  appInsights.trackPageView()
}
