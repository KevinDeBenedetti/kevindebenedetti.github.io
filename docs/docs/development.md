---
title: Development
---

# Development

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Bun](https://bun.sh) | ≥ 1.2 | Runtime, package manager, test runner |
| [Git](https://git-scm.com) | any | Repository operations and sparse checkout |
| [Node.js](https://nodejs.org) | ≥ 18 | Required by VitePress internally |

## Setup

```bash
# Clone the repository
git clone https://github.com/KevinDeBenedetti/kevindebenedetti.github.io.git
cd kevindebenedetti.github.io

# Install dependencies
bun install
```

## Commands

| Command | Description |
|---------|-------------|
| `bun run sync-docs` | Fetch all public repos and populate `docs/` |
| `bun run generate` | Generate config and homepage from synced metadata |
| `bun run dev` | Start local dev server (runs sync + generate first) |
| `bun run build` | Production build to `.vitepress/dist/` (runs sync + generate first) |
| `bun run preview` | Serve the last production build locally |
| `bun run typecheck` | Type-check TypeScript and Vue files with `tsc` |
| `bun run lint` | Lint TypeScript and Vue files with `oxlint` |
| `bun run test` | Run unit tests with Vitest |

::: warning Network required
`bun run dev` and `bun run build` call `scripts/sync-docs.ts` first, which requires access to the GitHub API and clones remote repositories. Pass `GITHUB_TOKEN` to avoid rate limits.
:::

## Project structure

```
kevindebenedetti.github.io/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # CI checks + GitHub Pages deploy
├── .vitepress/
│   ├── config.ts              # Static VitePress config (imports generated values)
│   ├── config.generated.ts    # ⚠️ Generated — do not edit
│   └── theme/
│       ├── index.ts           # Theme entry point
│       ├── custom.css         # Design tokens and global styles
│       └── components/        # Vue components (cursor, earth, footer…)
├── docs/
│   ├── public/                # Static assets (avatar, favicons) — committed
│   ├── index.md               # ⚠️ Generated homepage — do not edit
│   ├── kevindebenedetti.github.io/  # Hub docs — committed and tracked
│   └── <project>/             # Synced content — gitignored, rebuilt on CI
├── scripts/
│   ├── sync-docs.ts           # Fetches + clones project docs
│   └── generate-config.ts     # Generates config and index files
├── package.json
├── tsconfig.json
└── vitest.config.ts
```

## Testing

Unit tests use [Vitest](https://vitest.dev) with `@vue/test-utils` and the `jsdom` environment. Tests live next to the components they cover in `.vitepress/theme/components/__tests__/`.

```bash
bun run test          # run once
bun run test --watch  # watch mode
```

## Working with synced content

Synced project directories (`docs/<project>/`) are gitignored. To preview documentation changes for a specific project:

1. Edit the markdown files inside `docs/<project>/` locally.
2. Run `bun run dev` — the dev server hot-reloads on save.
3. Commit the changes in the **source repository** (e.g. `KevinDeBenedetti/dotfiles`), not here.

The next CI run on `main` will re-sync and pick up the upstream changes.

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes in `.vitepress/`, `scripts/`, or `docs/kevindebenedetti.github.io/`.
3. Run `bun run typecheck`, `bun run lint`, and `bun run test` — all must pass.
4. Open a pull request against `main`. CI will run the full check suite automatically.

::: tip Hub docs vs. project docs
Changes to **how the site works** (theme, scripts, configuration) belong here.  
Changes to **project content** (k3s-lab setup guide, dotfiles reference, etc.) belong in the respective source repository.
:::
