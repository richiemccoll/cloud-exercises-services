############################
# Base
############################
FROM node:22-alpine AS base
WORKDIR /app

############################
# Deps (dev + prod)
############################
FROM base AS deps
COPY package*.json ./
RUN npm ci

############################
# Build (TS/JS)
############################
FROM base AS build
ENV NODE_ENV=development
# Use cached deps from previous stage (no BuildKit needed)
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build --if-present

############################
# Prod deps only
############################
FROM base AS prod-deps
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev

# Runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

USER node
EXPOSE 8080
CMD ["node","dist/server.js"]
