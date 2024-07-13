FROM node:lts-slim AS base
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json pnpm-lock.yaml ./
COPY public/ ./public
COPY src/ ./src
COPY tsconfig.json ./
COPY tailwind.config.mjs ./
COPY astro.config.mjs ./
COPY .env ./

FROM base AS build
RUN corepack enable
RUN pnpm install --prod
RUN pnpm run build

FROM base AS runtime
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs