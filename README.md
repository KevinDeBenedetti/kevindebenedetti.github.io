# kevindebenedetti.github.io

[![CI/CD](https://img.shields.io/github/actions/workflow/status/KevinDeBenedetti/kevindebenedetti.github.io/ci-cd.yml?style=for-the-badge&label=CI%2FCD)](https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/actions/workflows/ci-cd.yml)

> Centralized documentation hub for all [@KevinDeBenedetti](https://github.com/KevinDeBenedetti) open-source projects, built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

Live site: **https://kevindebenedetti.github.io**

## Features

- Auto-discovers opted-in repos via the GitHub API and sparse-clones their `docs/` directory
- Regenerates VitePress nav, sidebar, and homepage cards from each project's `docs/.vitepressrc.json`
- Listens for `repository_dispatch` (`docs-updated`) — source repos trigger a re-sync automatically on push
- Custom Vue 3 theme with TypeScript scripts, tested with Vitest
- Fast linting with oxlint via prek; type-checked with vue-tsc
- Built with [Bun](https://bun.sh) as runtime, package manager, and test runner

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.2
- `GITHUB_TOKEN` — GitHub PAT with `public_repo` scope (optional, increases API rate limits)

## Installation

```sh
bun install
```

## Usage

```sh
bun run dev       # sync docs + generate config + start dev server
bun run build     # sync docs + generate config + build static site
bun run test      # run Vitest unit tests
bun run lint      # run oxlint
bun run typecheck # type-check with vue-tsc
```

→ Opt-in contract and dispatch setup: [docs](https://kevindebenedetti.github.io/getting-started)
