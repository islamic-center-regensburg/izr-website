FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build argument for API URL
ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

ARG VITE_MOSQUE_NAME="Islamisches Zentrum Regensburg"
ENV VITE_MOSQUE_NAME=${VITE_MOSQUE_NAME}

ARG VITE_INSTAGRAM_LINK=""
ENV VITE_INSTAGRAM_LINK=${VITE_INSTAGRAM_LINK}

ARG VITE_FACEBOOK_LINK=""
ENV VITE_FACEBOOK_LINK=${VITE_FACEBOOK_LINK}

ARG VITE_EMAIL_ADDRESS=""
ENV VITE_EMAIL_ADDRESS=${VITE_EMAIL_ADDRESS}

ARG VITE_TIKTOK_LINK=""
ENV VITE_TIKTOK_LINK=${VITE_TIKTOK_LINK}

# Build the application (client + SSR server bundles)
RUN npm run build

# Stage 2: Run the TanStack Start SSR output on a Node server
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production
# Non-privileged port so the server can run as a non-root user.
# NOTE: the previous nginx image listened on 80; the external docker-compose
# port mapping/reverse proxy must now target 3000 instead.
ENV PORT=3000

# Install only production dependencies (includes srvx, the Node server runner)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the built client assets and SSR server bundle
COPY --from=builder /app/dist ./dist
RUN chown -R node:node /app

EXPOSE 3000

USER node

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:'+(process.env.PORT||3000)).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "run", "start"]
