---
title: Architecture
---

# Architecture

This page describes how the documentation hub is built and deployed — from raw source repositories to the published GitHub Pages site.

## Pipeline overview

```
GitHub repos (public)
        │
        │  GitHub API + sparse-clone
        ▼
  scripts/sync-docs.ts
        │  writes synced/<project>/**
        │  writes synced/.repos-metadata.json
        ▼
  scripts/generate-config.ts
        │  writes .vitepress/config.generated.ts
        │  writes docs/index.md
        │  writes synced/<project>/index.md  (if missing)
        ▼
  vitepress build
        │  emits .vitepress/dist/
        ▼
  GitHub Pages
```

## Sync step

**Entry point:** `scripts/sync-docs.ts`

1. Calls the GitHub REST API (`/users/KevinDeBenedetti/repos`) to list all non-archived public repositories.
2. For each repository, performs a `git clone --depth=1 --filter=blob:none --sparse` and checks out only the `docs/` directory (sparse checkout).
3. If a `docs/` directory exists, copies it to `synced/<repo-name>/`.
4. Writes `synced/.repos-metadata.json` — a sorted array of `{ slug, title, description, repo }` records for every successfully synced project.
5. Deletes the temporary clone directory.

The `public/` directory and `docs/docs/` are **never deleted** during a sync reset — they hold content committed directly to this repository.

## Generate step

**Entry point:** `scripts/generate-config.ts`

Reads `synced/.repos-metadata.json` and discovers locally managed projects from `docs/` subdirectories, then produces three outputs:

### `.vitepress/config.generated.ts`

Exports three values consumed by `.vitepress/config.ts`:

| Export | Purpose |
|--------|---------|
| `generatedNav` | Top navigation bar items (Home + Projects dropdown) |
| `generatedSidebar` | Per-project sidebar trees, built by walking the Markdown files |
| `generatedEditLinkPattern` | Maps each page path back to its source file on GitHub |

Sidebar items are built recursively: files and directories at the same level with matching names are merged into a collapsible group (e.g. `kubernetes.md` + `kubernetes/` → one entry with nested children).

### `docs/index.md`

The VitePress home page, generated with a `layout: home` frontmatter block, a hero section, and a feature card for every synced project.

### `synced/<project>/index.md`

Created **only** if the source repository does not already ship its own `index.md`. The auto-generated stub includes a link to GitHub, a file tree, and an auto-linked table of contents.

## Theme

Custom VitePress theme lives in `.vitepress/theme/`:

| File | Role |
|------|------|
| `index.ts` | Theme entry point — registers components and global CSS |
| `custom.css` | Design tokens, layout overrides, component styles |
| `components/CustomCursor.vue` | Gold dot + glass ring cursor for pointer devices |
| `components/Earth.vue` | Animated starfield background on the home page |
| `components/HomeAvatar.vue` | Avatar image shown in the hero section |
| `components/LoaderInvader.vue` | Space-invader loading animation |
| `components/ScrollTop.vue` | Floating scroll-to-top button |
| `components/SiteFooter.vue` | Footer rendered on every page |

## CI/CD

Defined in `.github/workflows/ci-cd.yml`:

- **On pull requests:** runs `actionlint`, `bun run typecheck`, and `bun run build` (no Pages deploy).
- **On push to `main`:** same checks, then deploys `.vitepress/dist/` to GitHub Pages via the `actions/deploy-pages` action.

Synced content (`synced/`) is **gitignored** — it is rebuilt from source on every CI run, never committed. The `docs/docs/` directory and `public/` are committed directly to this repository.

## Adding a new project

A repository is automatically included when it:

1. Is public and owned by `@KevinDeBenedetti`.
2. Contains a `docs/` directory at the repository root.

No configuration change is required in this hub. The next CI run picks it up automatically.

To customise the display title or description, those values are derived from the repository name and GitHub API description automatically. No configuration change is required in this hub.
