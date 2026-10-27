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

1. Calls the GitHub REST API (`/users/KevinDeBenedetti/repos?type=public`) and keeps the repositories that are not archived, disabled, or forks. This repository itself is skipped.
2. For each repository, performs a `git clone --depth=1 --filter=blob:none --sparse` and checks out only the `docs/` directory (sparse checkout).
3. If a `docs/` directory exists, copies it to `synced/<repo-name>/`.
4. Writes `synced/.repos-metadata.json` — a sorted array of `{ slug, title, description, repo }` records for every successfully synced project.
5. Writes `public/sync-state.json` — the git tree SHA of each project's `docs/` plus its description. It ships with the site at `/sync-state.json` and lets the scheduled poll know what the live site was built from.
6. Deletes the temporary clone directory.

A sync reset empties `synced/` but **never deletes** `docs/about/`, `docs/docs/`, and `docs/projects/` — they hold content committed directly to this repository.

## Generate step

**Entry point:** `scripts/generate-config.ts`

Reads `synced/.repos-metadata.json` and discovers locally managed projects from `docs/` subdirectories whose `index.md` frontmatter has a `repo:` field (see [Configuration](./configuration.md#local-project-metadata)), then produces three outputs:

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

Created **only** if the source repository does not already ship its own `index.md`. The auto-generated stub includes a source card (repository and `docs/` folder on GitHub) and an auto-linked table of contents.

## Theme

Custom VitePress theme lives in `.vitepress/theme/`:

| File | Role |
|------|------|
| `index.ts` | Theme entry point — loads the global CSS, registers the components globally and installs the page transitions on the router |
| `Layout.vue` | Default layout with the `home-hero-image` and `layout-bottom` slots filled, plus the appearance-toggle wipe |
| `page-transition.ts` | View Transitions on client-side navigation (progressive, reduced-motion aware) |
| `custom.css` | Design tokens (`--c-*`, light/dark), VitePress variable mapping, component styles |
| `components/HomeAvatar.vue` | Avatar image shown in the hero section |
| `components/HomeSocial.vue` | GitHub and website links (registered, not used by any page yet) |
| `components/AboutProfile.vue` | Profile rendered by the About page |
| `components/ProjectCard.vue` | Linked project card (registered, not used by any page yet) |
| `components/ProjectLinks.vue` | Docs and GitHub links in the Projects table |
| `components/ScrollTop.vue` | Floating scroll-to-top button |
| `components/SiteFooter.vue` | Footer rendered on every page |

### Motion

Motion is used to orient, never to decorate, and it must cost nothing once a page has settled:

- Only `opacity` and `transform` (plus colors) are animated — never layout properties, and never with `backdrop-filter`.
- Entrances (hero, feature cards, mobile menu) are one-shot CSS keyframes sharing the `--motion-ease-out` token.
- Navigation and the appearance toggle use the [View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions/): one snapshot pair animated on the compositor. Browsers without the API get the previous instant behaviour.
- `prefers-reduced-motion: reduce` disables all of it, in CSS and in the scripts.

## CI/CD

Defined in `.github/workflows/ci-cd.yml`, built on the shared workflows of [github-workflows](https://github.com/KevinDeBenedetti/github-workflows), pinned to a release:

- **On pull requests:** runs `actionlint`, the prek hooks, `bun run lint`, `typecheck`, `test`, and `build`, plus a dependency audit, a secret scan, and a bot-commit guard (no Pages deploy).
- **On push to `main`:** same build checks, then deploys `.vitepress/dist/` to GitHub Pages via the `actions/deploy-pages` action and runs release-please.

::: warning Pages source must be GitHub Actions
In **Settings → Pages → Build and deployment**, the source must be **GitHub Actions**. With **Deploy from a branch**, GitHub also runs its own *pages build and deployment* on every push: it publishes a Jekyll render of the raw repository, which replaces the site until the VitePress deploy lands — and stays online if that deploy fails.
:::

### Releases

[release-please](https://github.com/googleapis/release-please) (config in `.github/release/`) keeps a release PR open with the next version and its `CHANGELOG.md` entries. Merging it tags `vX.Y.Z` and publishes a GitHub Release. Only commits that land in the changelog (`feat`, `fix`, `perf`, `revert`) open a release PR; `chore`, `docs`, `ci`, and `deps` commits ship with the next one.

release-please runs on `GITHUB_TOKEN` only, so the release PR, its commits, and the tags are authored by `github-actions[bot]`. GitHub does not start CI on a PR opened with that token: click **Approve workflows to run** on the release PR to get its checks.

### Site audit

`.github/workflows/site-audit.yml` checks the live site every Monday (and on demand via **Run workflow**): an SEO crawl for broken links and missing or duplicate tags, and a Lighthouse audit of every page. A failing check fails the run, which sends GitHub's failure email.

The link check skips what a crawler cannot judge from a runner: `github.com` (rate-limited), `medium.com` (403 for any non-browser client), and `localhost` dev-server URLs. Every other broken link fails the run; the run summary lists each one with the page it was found on. A dead link in a synced page is fixed in its source repository, and the next sync publishes the fix.

Source repositories check their links earlier: their docs CI ([github-workflows](https://github.com/KevinDeBenedetti/github-workflows)' `cd-docs.yml`, or `ci-shell.yml` with `run-docs-external-link-check`) runs lychee on the pages a push changes, `github.com` links included, so a link that is already dead when written fails right after the push. The weekly audit remains the only check for links that rot later.

### Picking up upstream changes

Source repositories do not notify the hub. Instead, `.github/workflows/docs-poll.yml` runs every 12 hours (and on demand via **Run workflow**):

1. `scripts/check-docs-changes.ts` reads the `docs/` tree SHA of every public repository through the GitHub API and compares it with the live `/sync-state.json`.
2. If anything differs — updated docs, a new or removed project, a changed description — it triggers `ci-cd.yml` with `workflow_dispatch`, which re-syncs and redeploys.

Only public data is read and `GITHUB_TOKEN` is allowed to trigger `workflow_dispatch`, so no GitHub App or secret is needed. Upstream changes show up within 12 hours; run **CI/CD** manually to publish sooner.

GitHub disables scheduled workflows in public repositories after 60 days without activity. If the poll stops running, re-enable it from the Actions tab.

Synced content (`synced/`) is **gitignored** — it is rebuilt from source on every CI run, never committed. The `docs/docs/` directory and `public/` are committed directly to this repository.

## Adding a new project

A repository is automatically included when it:

1. Is public and owned by `@KevinDeBenedetti`.
2. Contains a `docs/` directory at the repository root.

No configuration change is required in this hub: the next scheduled poll (within 12 hours) picks it up. The display title comes from the repository name and the card description from its GitHub description.

The [Projects](../projects/index.md) table is maintained by hand in `docs/projects/index.md`: add a row there for a new project.
