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
    "repo": "KevinDeBenedetti/dotfiles"
  }
]
```

| Field         | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `slug`        | Repository name, used as the `synced/<slug>/` directory name and URL prefix.     |
| `title`       | Human-readable title derived from the repository name (kebab-case → Title Case). |
| `description` | GitHub repository description.                                                   |
| `repo`        | Full `owner/name` slug.                                                          |

## Local project metadata

Locally managed projects (under `docs/<slug>/`) are discovered automatically when their `index.md` contains a `repo:` frontmatter field. Additional fields can be set to control display:

| Field         | Type     | Required | Description                                                                                                                     |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `repo`        | `string` | Yes      | Full `owner/name` slug. Presence of this field marks the directory as a local project. Also used to build edit-on-GitHub links. |
| `description` | `string` | No       | One-line summary shown on the homepage feature card.                                                                            |
| `icon`        | `string` | No       | Emoji prepended to the project title in navigation.                                                                             |
| `order`       | `number` | No       | Sort position in the nav dropdown and homepage cards. Lower numbers appear first.                                               |

Example (`docs/docs/index.md` frontmatter):

```yaml
---
title: Overview
description: Documentation for this documentation hub.
repo: KevinDeBenedetti/kevindebenedetti.github.io
icon: "📖"
order: 0
---
```

## `.vitepress/config.ts`

Static VitePress configuration. Imports generated values from `.vitepress/config.generated.ts`.

Key settings:

| Option                 | Value                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `base`                 | `/`                                                                                 |
| `srcDir`               | `.` (repo root)                                                                     |
| `rewrites`             | Maps `synced/:slug/*` and `docs/:slug/*` → `/:slug/*`                               |
| `title`                | Docs                                                                                |
| `themeConfig.nav`      | Imported from `generatedNav`                                                        |
| `themeConfig.sidebar`  | Imported from `generatedSidebar`                                                    |
| `themeConfig.editLink` | Uses `generatedEditLinkPattern` to link each page back to its source file on GitHub |

## `.vitepress/config.generated.ts`

Auto-generated on every build. **Do not edit manually.**

Exports:

| Export                     | Type                        | Description                                         |
| -------------------------- | --------------------------- | --------------------------------------------------- |
| `generatedNav`             | `DefaultTheme.NavItem[]`    | Top navigation items                                |
| `generatedSidebar`         | `DefaultTheme.SidebarMulti` | Sidebar trees keyed by `/<slug>/`                   |
| `generatedEditLinkPattern` | `({ filePath }) => string`  | Maps a page's source path to its edit URL on GitHub |

## Environment variables

Used by `scripts/sync-docs.ts` at sync time:

| Variable         | Default                  | Description                                                                                                     |
| ---------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN`   | _(empty)_                | Personal access token for the GitHub API. Without it, requests are unauthenticated and rate-limited to 60/hour. |
| `GITHUB_OWNER`   | `KevinDeBenedetti`       | GitHub username to fetch repositories for.                                                                      |
| `GITHUB_API_URL` | `https://api.github.com` | GitHub API base URL. Override for GitHub Enterprise.                                                            |
