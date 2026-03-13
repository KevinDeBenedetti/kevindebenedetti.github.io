# Kevin's Docs

This repository builds a VitePress site from all public `KevinDeBenedetti/*` repositories that opt in by shipping both `docs/` and `docs/.vitepressrc.json`.

## How it works

- `bun run sync-docs` discovers public repositories from the GitHub API and sparse-clones only their `docs/` directory.
- `bun run generate` syncs docs, creates missing project overview pages, and regenerates `docs/index.md`, the VitePress nav, sidebar, and edit links.
- `bun run docs:build` and `bun run docs:dev` both use the generated docs tree, so local development matches CI.

## Local commands

- `bun run sync-docs`
- `bun run generate`
- `bun run docs:dev`
- `bun run docs:build`

## Opt-in contract for source repositories

- The repository must be public.
- The repository must contain `docs/` at the root.
- The repository must contain `docs/.vitepressrc.json` with project metadata.
