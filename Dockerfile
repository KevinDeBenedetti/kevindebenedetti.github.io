ARG BUN_IMAGE=docker.io/oven/bun:1

FROM ${BUN_IMAGE} AS base

WORKDIR /app

COPY package.json ./
# COPY --chown=node:root . ./

FROM base AS dev
RUN --mount=type=cache,id=bun,target=/root/.bun/install/cache bun install

EXPOSE 5173
CMD ["bun", "run", "docs:dev"]
