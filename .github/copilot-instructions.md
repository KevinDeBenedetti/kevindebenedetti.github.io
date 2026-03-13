# GitHub Copilot Instructions

## Project

Centralized VitePress documentation site for all @KevinDeBenedetti open source projects.
Deployed to `https://kevindebenedetti.github.io` via GitHub Pages.

Docs content is **synced automatically** from each project's `docs/` folder via GitHub Actions.
Never write documentation content directly in this repo.

## Package manager

Always use `bun`. Never suggest `npm`, `pnpm`, or `yarn`.

```bash
# ✅
bun install
bun run docs:dev
bun run docs:build

# ❌
npm install
pnpm install
```

## Stack

- VitePress ^1.6 with TypeScript config
- Bun as runtime and package manager
- GitHub Actions for CI/CD
- Reusable workflow: `KevinDeBenedetti/github-workflows/.github/workflows/deploy-pages.yml@main`

## Project discovery — opt-in via `docs/.vitepressrc.json`

A public repo is included in the doc site **only if** it contains `docs/.vitepressrc.json`.
This file is the single source of truth for how a project appears in the site.

```json
{
  "title": "Dotfiles",
  "description": "macOS setup scripts for fast developer environment provisioning.",
  "icon": "🍎",
  "order": 1,
  "repo": "KevinDeBenedetti/dotfiles"
}
```

| Field         | Required | Description                                      |
|---------------|----------|--------------------------------------------------|
| `title`       | ✅       | Display name in nav, sidebar and homepage card   |
| `description` | ✅       | Subtitle shown on homepage feature card          |
| `icon`        | ✅       | Emoji shown on homepage feature card             |
| `order`       | ✅       | Sort order in nav and homepage (lower = first)   |
| `repo`        | ✅       | `owner/repo` used for editLink and sync          |

When asked to add a new project, always start by creating `docs/.vitepressrc.json`
in the **source repo** — never add manual entries to this repo's config files.

## How the pipeline works

1. `deploy.yml` reads `docs/.vitepressrc.json` from every public repo that has one
2. Syncs each `docs/` folder into `docs/<project-name>/` in this repo
3. Runs `scripts/generate-config.ts` to produce `.vitepress/config.generated.ts`
4. VitePress builds using the generated config
5. Deploys to GitHub Pages

The generated config is **never edited manually** — it is always overwritten by the pipeline.

## VitePress conventions

Each project gets its own sidebar key — never merge projects into a single sidebar.

```ts
// ✅ one sidebar per project (generated automatically)
sidebar: {
  '/dotfiles/': [...],
  '/github-workflows/': [...],
}

// ❌ single global sidebar
sidebar: [...]
```

The `editLink.pattern` function must map to the **source repo**, not this repo.

## File structure

```
.vitepress/
  config.ts                    # static base config (theme, head, socialLinks)
  config.generated.ts          # ⚠️ generated — never edit manually
  theme/
    custom.css                 # brand colors as CSS variables — change here only
scripts/
  generate-config.ts           # reads .vitepressrc.json files → writes config.generated.ts
docs/<project>/                # git-ignored, populated by deploy workflow
index.md                       # homepage (layout: home, feature cards generated)
.github/workflows/deploy.yml   # discover → sync → generate → build → deploy
```

## CSS / theming

Brand colors are defined in `.vitepress/theme/custom.css` as CSS variables.
Always modify `--vp-c-brand-*` variables — never hardcode color values elsewhere.

## Constraints

- `base` must stay `'/'` — repo is named `kevindebenedetti.github.io`
- Never commit files under `docs/<project>/` — they are generated
- Never edit `config.generated.ts` manually — it is overwritten on every deploy
- Config files must use TypeScript (`.ts`), not JavaScript
- A repo with no `docs/.vitepressrc.json` is never included, even if it has a `docs/` folder