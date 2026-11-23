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
        │  writes docs/index.md
        │  writes docs/projects/index.md
        │  writes synced/<project>/index.md  (if missing)
        ▼
  vitepress build
        │  .vitepress/config.ts builds nav, sidebar and edit links
        │  emits .vitepress/dist/
        ▼
  GitHub Pages
```

## Sync step

**Entry point:** `scripts/sync-docs.ts`

1. Asks `scripts/docs-sources.ts` for the **docs sources**: the public repositories that are not archived, disabled, or forks and have a root `docs/` folder, each with the git tree SHA of that folder (read through the GitHub REST API). This repository itself is skipped.
2. For each source, performs a `git clone --depth=1 --filter=blob:none --sparse`, checks out only the `docs/` directory, and copies it to `synced/<repo-name>/`.
3. Stops with an error if a source cannot be cloned, before writing the files below: the build fails and the previous site stays online, instead of a deploy without that project.
4. Writes `synced/.repos-metadata.json` — a sorted array of `{ slug, title, description, repo }` records for every synced project.
5. Writes `public/sync-state.json` — the git tree SHA of each project's `docs/` plus its description. It ships with the site at `/sync-state.json` and lets the scheduled poll know what the live site was built from.
6. Deletes the temporary clone directory.

The scheduled poll gets the current state from the same `scripts/docs-sources.ts` listing, so the sync and the poll cannot disagree on what a repository's state is.

A sync reset empties `synced/` and the temporary clone folder and removes the previous `public/sync-state.json`. Nothing under `docs/` is touched: it holds content committed directly to this repository.

## Generate step

**Entry point:** `scripts/generate-config.ts`

Both this step and `.vitepress/config.ts` get their data from one module, `scripts/site-navigation.ts`. It reads `synced/.repos-metadata.json` and discovers locally managed projects from `docs/` subdirectories whose `index.md` frontmatter has a `repo:` field (see [Configuration](./configuration.md#local-project-metadata)). It writes nothing itself; its rules are covered by `scripts/__tests__/site-navigation.test.ts`.

### Site navigation

`buildSiteNavigation(root)` returns:

| Value      | Purpose                                                              |
| ---------- | -------------------------------------------------------------------- |
| `projects` | Synced and local projects, sorted by `order` then slug               |
| `nav`      | Top navigation bar items (Home, About)                               |
| `sidebar`  | Per-project sidebar trees, built by walking the Markdown files       |
| `pages`    | The pages to write: missing project index pages, the homepage and the Projects page |

`editLinkPattern(projects)` returns the function behind "Edit this page": a synced project's page links to its file in the source repository, any other page to its file in this repository.

`.vitepress/config.ts` calls both when VitePress loads, so nav, sidebar and edit links are never written to disk. The generate step writes `pages`.

Sidebar items are built recursively: files and directories at the same level with matching names are merged into a collapsible group (e.g. `kubernetes.md` + `kubernetes/` → one entry with nested children).

### `docs/index.md`

The VitePress home page, generated with a `layout: home` frontmatter block, a hero section, and a feature card for every project, synced or local.

### `docs/projects/index.md`

The Projects page, generated as a table with one row per project (title, description, links to its docs and repository), in the same order as the homepage cards.

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

- **On pull requests:** runs `actionlint`, the prek hooks, `bun run lint`, `typecheck`, `test`, and `build`, plus a dependency audit and a secret scan (no Pages deploy).
- **On push to `main`:** same build checks, then deploys `.vitepress/dist/` to GitHub Pages via the `actions/deploy-pages` action and runs release-please. The Pages build and deploy jobs are defined in `ci-cd.yml` itself, not in a shared workflow.

::: warning Pages source must be GitHub Actions
In **Settings → Pages → Build and deployment**, the source must be **GitHub Actions**. With **Deploy from a branch**, GitHub also runs its own *pages build and deployment* on every push: it publishes a Jekyll render of the raw repository, which replaces the site until the VitePress deploy lands — and stays online if that deploy fails.
:::

### Releases

[release-please](https://github.com/googleapis/release-please) (config in `.github/release/`) keeps a release PR open with the next version and its `CHANGELOG.md` entries. Merging it tags `vX.Y.Z` and publishes a GitHub Release. Only commits that land in the changelog (`feat`, `fix`, `perf`, `revert`) open a release PR; `chore`, `docs`, `ci`, and `deps` commits ship with the next one.

release-please runs on `GITHUB_TOKEN` only, so the release PR, its commits, and the tags are authored by `github-actions[bot]`. GitHub does not start CI on a PR opened with that token: click **Approve workflows to run** on the release PR to get its checks.

### Dependency updates

[Renovate](https://docs.renovatebot.com/) runs from `.github/workflows/renovate.yml`, which calls the `renovate.yml` shared workflow of [github-workflows](https://github.com/KevinDeBenedetti/github-workflows) every day at 01:17 UTC. `renovate.json` extends the shared preset [`KevinDeBenedetti/renovate-config`](https://github.com/KevinDeBenedetti/renovate-config): `config:best-practices`, pull requests on Monday before 6am Paris time only, a 3-day release age, and the `prek.toml` hook revs. On top of it, `renovate.json` keeps this repository's own rules:

| Rule                       | Why                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| oxlint manager and group   | oxlint is pinned in `package.json` and in the prek hook: one pull request moves both        |
| bun `rangeStrategy: bump`  | A `package.json` range left at its old floor would make the prek oxlint pin differ          |
| `typescript` below 7       | vue-tsc still needs the `typescript/lib/tsc` subpath that TypeScript 7 dropped              |

The github-workflows pins are left to that repository's `propagate-release` job. `scripts/__tests__/version-pins.test.ts` fails when the workflows or `prek.toml` pin different releases, or when the prek oxlint pin differs from `package.json`. The `renovate-config-validator` prek hook checks `renovate.json` before a commit and in CI.

::: warning App token
The workflow uses the release GitHub App: the `RELEASE_APP_CLIENT_ID` variable and the `RELEASE_APP_PRIVATE_KEY` secret must exist on the repository, and the App needs **Contents**, **Issues**, **Pull requests**, **Workflows** and **Commit statuses** set to *Read and write*. A manual run is a dry run by default: its log lists the updates found.
:::

### Link checks

Source repositories check their links: their docs CI ([github-workflows](https://github.com/KevinDeBenedetti/github-workflows)' `cd-docs.yml`, or `ci-shell.yml` with `run-docs-external-link-check`) runs lychee on the pages a push changes, `github.com` links included, so a link that is already dead when written fails right after the push. An external link that rots later is not re-checked: nothing crawls the live site.

Internal links are checked by every hub build: `vitepress build` fails on a link to a page that does not exist, on a local page or a synced one (`ignoreDeadLinks: 'localhostLinks'` only skips `http://localhost` examples). A page renamed in a source repository therefore fails the next hub build, and the live site stays on the previous deploy until the link is fixed in that repository.

### Picking up upstream changes

Source repositories do not notify the hub. Instead, `.github/workflows/docs-poll.yml` runs every 12 hours (and on demand via **Run workflow**):

1. `scripts/check-docs-changes.ts` lists the docs sources (`scripts/docs-sources.ts`) and compares their state with the live `/sync-state.json`.
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
