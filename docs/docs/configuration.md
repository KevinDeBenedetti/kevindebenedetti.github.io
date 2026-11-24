---
title: Configuration
---

# Configuration

## `synced/.repos-metadata.json`

Written by `scripts/sync-docs.ts` after each sync. **Do not edit manually** — it is regenerated on every run.

```json
[
  {
    "slug": "dotfiles",
    "title": "Dotfiles",
    "description": "macOS and Debian dotfiles and setup scripts.",
    "repo": "KevinDeBenedetti/dotfiles",
    "branch": "main"
  }
]
```

| Field         | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `slug`        | Repository name, used as the `synced/<slug>/` directory name and URL prefix.     |
| `title`       | Human-readable title derived from the repository name (kebab-case → Title Case). |
| `description` | GitHub repository description.                                                   |
| `repo`        | Full `owner/name` slug.                                                          |
| `branch`      | Default branch of the repository: the source card and edit links point at it.    |

## Local project metadata

Locally managed projects (under `docs/<slug>/`) are discovered automatically when their `index.md` contains a `repo:` frontmatter field and an H1, which is the project title. The page is then regenerated on every build from these fields, so edit the frontmatter and the H1, not the body:

| Field         | Type     | Required | Description                                                                                                                                 |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `repo`        | `string` | Yes      | Full `owner/name` slug. Presence of this field marks the directory as a local project. Used for the source card and the Projects page link. |
| `description` | `string` | No       | One-line summary shown on the homepage feature card and the Projects page.                                                                  |
| `icon`        | `string` | No       | Emoji or short text shown above the title on the project's homepage feature card.                                                           |
| `order`       | `number` | No       | Sort position in the sidebar, the homepage cards and the Projects page. Lower numbers appear first; projects without one follow, by slug.   |

Example (`docs/docs/index.md` frontmatter):

```yaml
---
title: "Docs Generator"
description: "Documentation for this documentation hub — sync, generation, and contribution guides."
repo: KevinDeBenedetti/kevindebenedetti.github.io
order: 0
generated: true
---
```

`title` and `generated` are written by the generator: `title` repeats the H1, and `generated: true` marks the page as rebuilt on every run.

## `.vitepress/config.ts`

Static VitePress configuration. Builds nav, sidebar and edit links at load time with `scripts/site-navigation.ts`, from the projects found on disk.

Key settings:

| Option                 | Value                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `base`                 | `/`                                                                                 |
| `srcDir`               | `.` (repo root)                                                                     |
| `srcExclude`           | `README.md`, `TODO.md`, `CHANGELOG.md`, `CLAUDE.md`, `GLOSSARY.md`, `docs/adr/**`   |
| `rewrites`             | Maps `synced/:slug/*` and `docs/:slug/*` → `/:slug/*`                               |
| `title`                | `Home`, the nav bar title (pages use the `:title \| Kevin's Docs` template)          |
| `themeConfig.nav`      | `nav` from `buildSiteNavigation`                                                    |
| `themeConfig.sidebar`  | `sidebar` from `buildSiteNavigation`                                                |
| `themeConfig.editLink` | `editLinkPattern(projects)`: links each page back to its source file on GitHub      |
| `markdown`             | `languageAlias` (`env` → `dotenv`), Shiki grammars from `.vitepress/shiki/` (LogQL) |
| `transformPageData`    | Canonical URL, Open Graph, Twitter and JSON-LD tags per page; the homepage title    |

The homepage is titled `Kevin's Docs: developer documentation hub` (`HOME_TITLE`), with no template, in its `<title>`, `og:title` and `twitter:title`.

A page's meta description is its frontmatter `description:`. A project page that sets none gets `<page title>, in the <project> documentation: <project description>` (`pageDescription` in `scripts/site-navigation.ts`), so search results do not repeat the site description for every page.

## Environment variables

Used by `scripts/sync-docs.ts` at sync time and by `scripts/check-docs-changes.ts` in the docs poll:

| Variable         | Default                              | Description                                                                                                     |
| ---------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`   | _(empty)_                            | Personal access token for the GitHub API. Without it, requests are unauthenticated and rate-limited to 60/hour. |
| `GITHUB_OWNER`   | `KevinDeBenedetti`                   | GitHub username to fetch repositories for.                                                                      |
| `GITHUB_API_URL` | `https://api.github.com`             | GitHub API base URL. Override for GitHub Enterprise.                                                            |
| `SITE_URL`       | `https://kevindebenedetti.github.io` | Live site the docs poll reads `/sync-state.json` from (`scripts/check-docs-changes.ts` only).                   |
