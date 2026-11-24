---
title: Development
---

# Development

## Prerequisites

| Tool                          | Version            | Purpose                                   |
| ----------------------------- | ------------------ | ----------------------------------------- |
| [Bun](https://bun.sh)         | ≥ 1.2              | Runtime, package manager, script runner   |
| [Git](https://git-scm.com)    | any                | Repository operations and sparse checkout |
| [Node.js](https://nodejs.org) | 22.12+, 24 or ≥ 26 | Required by Vitest and jsdom (CI uses 22) |

## Setup

```sh
# Clone the repository
git clone https://github.com/KevinDeBenedetti/kevindebenedetti.github.io.git
cd kevindebenedetti.github.io

# Install dependencies (also installs the prek git hooks)
bun install
```

## Commands

| Command             | Description                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `bun run sync-docs` | Fetch all public repos and copy their `docs/` into `synced/`         |
| `bun run generate`  | Sync, then generate the VitePress config and homepage                |
| `bun run dev`       | Start the local dev server (runs `generate` first)                   |
| `bun run build`     | Production build to `.vitepress/dist/` (runs `generate` first)       |
| `bun run preview`   | Serve the last production build locally                              |
| `bun run typecheck` | Type-check TypeScript and Vue files with `vue-tsc`                   |
| `bun run lint`      | Lint TypeScript and Vue files with `oxlint`                          |
| `bun run test`      | Run unit tests with Vitest                                           |
| `bun run clean`     | Remove `node_modules`, build output, VitePress cache and `synced/`   |

::: warning Network required
`bun run dev` and `bun run build` call `scripts/sync-docs.ts` first, which requires access to the GitHub API and clones remote repositories. Each run makes one API request per public repository; without a token GitHub allows 60 an hour, so a few runs in a row stop with a "rate limit spent" error that says when it resets. Set `GITHUB_TOKEN` to avoid it, for example `export GITHUB_TOKEN=$(gh auth token)`.
:::

## Project structure

```text
kevindebenedetti.github.io/
├── .agents/                   # Agent skill config (issue tracker, labels, domain docs)
├── .github/
│   ├── release/               # release-please config + manifest
│   └── workflows/
│       ├── ci-cd.yml          # CI checks + GitHub Pages deploy + release
│       ├── docs-poll.yml      # Redeploys when a project's docs/ changed
│       └── renovate.yml       # Runs Renovate (dependency update PRs)
├── .vitepress/
│   ├── config.ts              # VitePress config (nav, sidebar, edit links built at load)
│   ├── shiki/                 # Extra Shiki grammars (LogQL)
│   └── theme/
│       ├── index.ts           # Theme entry point (components, page transitions)
│       ├── Layout.vue         # Default layout + slots + appearance-toggle wipe
│       ├── page-transition.ts # View Transitions on client-side navigation
│       ├── custom.css         # Design tokens, motion rules and global styles
│       └── components/        # Vue components + __tests__/
├── docs/
│   ├── index.md               # ⚠️ Generated homepage — do not edit
│   ├── about/                 # About page — committed
│   ├── docs/                  # This hub's own docs — committed
│   └── projects/              # ⚠️ Generated Projects table — do not edit
├── public/                    # Static assets (avatar, favicons, robots.txt)
├── scripts/
│   ├── github.ts              # GitHub API client shared by the scripts
│   ├── docs-sources.ts        # Repositories that publish docs, and the state of their docs/
│   ├── sync-docs.ts           # Fetches + clones project docs
│   ├── site-navigation.ts     # Projects, nav, sidebar, edit links, generated pages
│   ├── generate-config.ts     # Writes the generated index pages and homepage
│   └── check-docs-changes.ts  # Used by docs-poll.yml to detect changes
├── synced/                    # Synced project docs — gitignored, rebuilt on CI
├── CLAUDE.md                  # Agent instructions — excluded from the site
├── GLOSSARY.md                # Domain vocabulary — excluded from the site
├── package.json
├── prek.toml                  # Git hooks (also run in CI)
├── renovate.json              # Renovate rules on top of the shared preset
├── tsconfig.json
└── vitest.config.ts
```

## Testing

Unit tests use [Vitest](https://vitest.dev) with `@vue/test-utils` and the `jsdom` environment. Tests live next to the components they cover in `.vitepress/theme/components/__tests__/`. The site navigation rules (project discovery, sidebar, edit links, generated pages) are tested in `scripts/__tests__/`, against temporary folders of Markdown files. The sync and the change detection are tested there too, with a stand-in for the GitHub API; the sync's git clone runs for real, against a local repository cloned over `file://`, isolated from your git config.

```sh
bun run test   # run once
bunx vitest    # watch mode
```

## Working with synced content

Synced project docs live in `synced/<project>/`, which is gitignored and wiped by every sync. The sync clones what is **pushed** to GitHub, so:

1. Edit and commit the docs in the **source repository** (e.g. `KevinDeBenedetti/dotfiles`), then push.
2. Run `bun run dev` here to preview them.

For a quick unpushed preview, edit `synced/<project>/` while `bun run dev` is running: the dev server hot-reloads, but the next `bun run dev` overwrites those edits.

The scheduled docs poll (every 12 hours) publishes pushed changes; run the **CI/CD** workflow manually to publish sooner.

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes in `.vitepress/`, `scripts/`, or `docs/docs/`.
3. Run `bun run typecheck`, `bun run lint`, and `bun run test` — all must pass.
4. Open a pull request against `main`. CI runs the full check suite automatically.

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org): `feat`, `fix`, `perf`, and `revert` commits open a release (see [Releases](./architecture.md#releases)).

::: tip Hub docs vs. project docs
Changes to **how the site works** (theme, scripts, configuration) belong here.
Changes to **project content** (k3s-lab setup guide, dotfiles reference, etc.) belong in the respective source repository.
:::
