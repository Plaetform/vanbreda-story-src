# syntax=docker/dockerfile:1.7
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline --no-audit --fund=false
COPY . .
# Browser App Insights connection string, baked into the bundle at build time.
# Supplied by the deploy workflow from the repo secret the kiosk pushes; empty
# (telemetry off) when the "app-insights" component is opted out.
ARG VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=""
ENV VITE_APPLICATIONINSIGHTS_CONNECTION_STRING=$VITE_APPLICATIONINSIGHTS_CONNECTION_STRING
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Shared access key for the customer share link, baked into the nginx config at
# build time. Supplied by the deploy workflow from a repo secret (same pattern as
# the App Insights string above). When empty, the placeholder is swapped for an
# unguessable sentinel so the access-key path stays closed (AE SSO still works).
ARG ACCESS_KEY=""
RUN if [ -n "$ACCESS_KEY" ]; then \
        sed -i "s|__ACCESS_KEY__|$ACCESS_KEY|g" /etc/nginx/conf.d/default.conf; \
    else \
        sed -i "s|__ACCESS_KEY__|__ACCESS_KEY_NOT_SET__|g" /etc/nginx/conf.d/default.conf; \
    fi

EXPOSE 80
