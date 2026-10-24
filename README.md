# kevindebenedetti.github.io

[![CI/CD](https://img.shields.io/github/actions/workflow/status/KevinDeBenedetti/kevindebenedetti.github.io/ci-cd.yml?style=for-the-badge&label=CI%2FCD)](https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/actions/workflows/ci-cd.yml) [![Release](https://img.shields.io/github/v/release/KevinDeBenedetti/kevindebenedetti.github.io?style=for-the-badge)](https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/releases)

> Centralized documentation hub for all [@KevinDeBenedetti](https://github.com/KevinDeBenedetti) open-source projects, built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

Live site: **https://kevindebenedetti.github.io**

## Features

- Publishes the `docs/` folder of every public repository of the owner — no registration, having `docs/` is the opt-in
- Generates the nav, sidebars and homepage cards from each project's file tree and GitHub description
- Polls source repos every 12 hours and redeploys only when a project's `docs/` changed — no GitHub App or secret needed
- Custom Vue 3 theme, tested with Vitest; linted with oxlint via prek and type-checked with vue-tsc
- Versioned with [release-please](https://github.com/googleapis/release-please): `CHANGELOG.md`, `vX.Y.Z` tags and GitHub Releases
- Weekly SEO crawl (broken links, missing tags) and Lighthouse audit of the live site

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.2
- `GITHUB_TOKEN` (optional) — any GitHub token; without it the API allows 60 requests per hour

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

→ Full development guide: [docs](https://kevindebenedetti.github.io/docs/development)

## Documentation

Full documentation is available at **https://kevindebenedetti.github.io/docs/**.
It is generated from the `docs/` directory and published automatically on push.
