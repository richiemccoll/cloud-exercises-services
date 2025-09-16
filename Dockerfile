# Multi-stage, npm workspaces, no BuildKit
FROM node:22-alpine AS base
WORKDIR /app

# ===== dev deps for build =====
FROM base AS deps
ARG WORKSPACE_DIR=services/api        # <-- set your workspace path
COPY package.json package-lock.json ./
# copy only the workspace manifest so npm can target it
COPY ${WORKSPACE_DIR}/package.json ${WORKSPACE_DIR}/package.json
RUN npm ci -w ${WORKSPACE_DIR}

# ===== build (TS/JS) =====
FROM base AS build
ARG WORKSPACE_DIR=services/api
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm -w ${WORKSPACE_DIR} run build --if-present

# ===== prod deps (workspace only) =====
FROM base AS prod-deps
ARG WORKSPACE_DIR=services/api
COPY package.json package-lock.json ./
COPY ${WORKSPACE_DIR}/package.json ${WORKSPACE_DIR}/package.json
RUN npm ci --omit=dev -w ${WORKSPACE_DIR}

# ===== runtime =====
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ARG WORKSPACE_DIR=services/api
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/${WORKSPACE_DIR}/dist ./${WORKSPACE_DIR}/dist
COPY ${WORKSPACE_DIR}/package.json ${WORKSPACE_DIR}/package.json
USER node
EXPOSE 3000
CMD ["sh","-c","node $WORKSPACE_DIR/dist/server.js"]
