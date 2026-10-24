---
title: Development
---

# Development

## Prerequisites

| Tool                          | Version | Purpose                                   |
| ----------------------------- | ------- | ----------------------------------------- |
| [Bun](https://bun.sh)         | ≥ 1.2   | Runtime, package manager, script runner   |
| [Git](https://git-scm.com)    | any     | Repository operations and sparse checkout |
| [Node.js](https://nodejs.org) | ≥ 18    | Required by VitePress (CI uses 22)        |

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
`bun run dev` and `bun run build` call `scripts/sync-docs.ts` first, which requires access to the GitHub API and clones remote repositories. Pass `GITHUB_TOKEN` to avoid rate limits.
:::

## Project structure

```text
kevindebenedetti.github.io/
├── .github/
│   ├── release/               # release-please config + manifest
│   └── workflows/
│       ├── ci-cd.yml          # CI checks + GitHub Pages deploy + release
│       ├── docs-poll.yml      # Redeploys when a project's docs/ changed
│       └── site-audit.yml     # Weekly SEO crawl + Lighthouse audit
├── .vitepress/
│   ├── config.ts              # Static VitePress config (imports generated values)
│   ├── config.generated.ts    # ⚠️ Generated — do not edit
│   └── theme/
│       ├── index.ts           # Theme entry point
│       ├── custom.css         # Design tokens and global styles
│       └── components/        # Vue components + __tests__/
├── docs/
│   ├── index.md               # ⚠️ Generated homepage — do not edit
│   ├── about/                 # About page — committed
│   ├── docs/                  # This hub's own docs — committed
│   └── projects/              # Projects table — committed
├── public/                    # Static assets (avatar, favicons, robots.txt)
├── scripts/
│   ├── github.ts              # GitHub API client shared by the scripts
│   ├── sync-docs.ts           # Fetches + clones project docs
│   ├── generate-config.ts     # Generates config and index files
│   └── check-docs-changes.ts  # Used by docs-poll.yml to detect changes
├── synced/                    # Synced project docs — gitignored, rebuilt on CI
├── package.json
├── prek.toml                  # Git hooks (also run in CI)
├── tsconfig.json
└── vitest.config.ts
```

## Testing

Unit tests use [Vitest](https://vitest.dev) with `@vue/test-utils` and the `jsdom` environment. Tests live next to the components they cover in `.vitepress/theme/components/__tests__/`.

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
