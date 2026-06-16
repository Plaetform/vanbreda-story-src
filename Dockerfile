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
EXPOSE 80
