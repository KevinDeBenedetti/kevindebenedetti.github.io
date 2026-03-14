# Kevin's Docs

[![CI/CD](https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/actions/workflows/ci-cd.yml)

Centralized developer documentation hub for all [@KevinDeBenedetti](https://github.com/KevinDeBenedetti) open-source projects. Built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

Live site: **https://kevindebenedetti.github.io**

## How it works

1. `bun run sync-docs` calls the GitHub API to discover all public `KevinDeBenedetti/*` repositories, then sparse-clones only their `docs/` directory into this repo.
2. `bun scripts/generate-config.ts` reads each project's `docs/.vitepressrc.json` and regenerates:
   - `.vitepress/config.generated.ts` — nav, sidebar, and edit-link pattern
   - `docs/index.md` — homepage with feature cards
3. `bun run dev` and `bun run build` both call `generate` first, so local development always matches CI.

The CI/CD workflow also listens for `repository_dispatch` events (`docs-updated` type), so any opted-in source repo can trigger an automatic re-sync and redeploy on push.

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.2
- A GitHub personal access token with `public_repo` scope (optional, increases API rate limits)

## Local development

```sh
# Install dependencies
bun install

# Start dev server (syncs docs + generates config first)
bun run dev

# Type-check Vue/TS sources
bun run typecheck

# Lint all files
bun run lint

# Run unit tests
bun run test

# Preview the production build
bun run build && bun run preview
```

## Available scripts

| Script              | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `bun run sync-docs` | Fetch & sparse-clone `docs/` from all opted-in repos   |
| `bun run generate`  | `sync-docs` + regenerate VitePress config and homepage |
| `bun run dev`       | `generate` then start VitePress dev server             |
| `bun run build`     | `generate` then build the static site                  |
| `bun run preview`   | Serve the last build locally                           |
| `bun run lint`      | Run oxlint via prek                                    |
| `bun run typecheck` | Type-check with vue-tsc                                |
| `bun run test`      | Run Vitest unit tests                                  |

## Environment variables

| Variable         | Default                  | Description                                                |
| ---------------- | ------------------------ | ---------------------------------------------------------- |
| `GITHUB_TOKEN`   | _(none)_                 | GitHub PAT — optional but recommended to avoid rate limits |
| `GITHUB_OWNER`   | `KevinDeBenedetti`       | GitHub user/org whose repos are indexed                    |
| `GITHUB_API_URL` | `https://api.github.com` | Allows pointing at a GitHub Enterprise instance            |

## Opt-in contract for source repositories

To have your project's docs indexed and published here:

1. The repository must be **public**.
2. The repository must contain a `docs/` directory at the root.
3. The repository must contain `docs/.vitepressrc.json` with the following fields:

```json
{
  "title": "My Project",
  "description": "A short description shown on the homepage card.",
  "icon": "🚀",
  "order": 10,
  "repo": "KevinDeBenedetti/my-project"
}
```

| Field         | Type     | Description                                     |
| ------------- | -------- | ----------------------------------------------- |
| `title`       | `string` | Project name displayed in nav and sidebar       |
| `description` | `string` | Short description for the homepage feature card |
| `icon`        | `string` | Emoji icon for the homepage card                |
| `order`       | `number` | Sort order in nav and homepage (lower = first)  |
| `repo`        | `string` | `owner/repo` used to generate edit links        |

## Triggering a re-sync from a source repo

Add this step to your source repo's workflow to rebuild the docs site whenever you push to `docs/`:

```yaml
- name: Trigger docs rebuild
  uses: peter-evans/repository-dispatch@v3
  with:
    token: ${{ secrets.DOCS_DISPATCH_TOKEN }}
    repository: KevinDeBenedetti/kevindebenedetti.github.io
    event-type: docs-updated
```

`DOCS_DISPATCH_TOKEN` must be a GitHub PAT with `repo` scope stored as a repository secret.

## Tech stack

- **[VitePress](https://vitepress.dev)** — static site generator
- **[Bun](https://bun.sh)** — runtime, package manager, and test runner
- **[Vue 3](https://vuejs.org)** — custom theme components
- **[TypeScript](https://www.typescriptlang.org)** — scripts and theme
- **[Vitest](https://vitest.dev)** — unit tests for theme components
- **[oxlint](https://oxc.rs/docs/guide/usage/linter)** — fast linter
