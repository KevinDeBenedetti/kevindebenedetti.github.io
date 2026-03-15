---
title: Overview
description: Documentation for this documentation hub — sync, generation, and contribution guides.
repo: KevinDeBenedetti/kevindebenedetti.github.io
icon: "📖"
order: 0
---

# kevindebenedetti.github.io

Centralized VitePress documentation hub for all [`@KevinDeBenedetti`](https://github.com/KevinDeBenedetti) public repositories, deployed automatically to GitHub Pages.

<a href="https://github.com/KevinDeBenedetti/kevindebenedetti.github.io" target="_blank" rel="noopener noreferrer" class="vp-repo-link">View on GitHub →</a>

## What is this?

This site aggregates documentation from every public repository under the `@KevinDeBenedetti` GitHub account into a single, searchable VitePress site. No manual copy-pasting — a CI pipeline fetches each project's `docs/` folder on every push and publishes the result.

## How it works

1. **Sync** — `scripts/sync-docs.ts` fetches the list of public repositories from the GitHub API, sparse-clones each project's `docs/` directory, and writes it to `docs/<project>/`.
2. **Generate** — `scripts/generate-config.ts` reads the collected metadata and emits `.vitepress/config.generated.ts` (nav + sidebar + edit links) and `docs/index.md` (homepage feature cards).
3. **Build** — VitePress compiles everything into a static site under `.vitepress/dist/`.
4. **Deploy** — GitHub Actions publishes the build to GitHub Pages on every push to `main`.

## Projects

| Project | Description |
|---------|-------------|
| [Dotfiles](/dotfiles/) | macOS & Debian developer environment setup scripts |
| [GitHub Workflows](/github-workflows/) | Reusable composite actions and CI/CD workflow templates |
| [k3s-lab](/k3s-lab/) | Production-ready k3s cluster with Traefik, cert-manager, and monitoring |
| [Notes](/notes/) | Personal DevOps, Linux, and web-dev reference notes |
| [Tools](/tools/) | Makefile fragments, Docker templates, Rust CLI, and shell scripts |

## Documentation

- [Architecture](./architecture) — Pipeline deep-dive: sync → generate → build → deploy
- [Configuration](./configuration) — Environment variables and configuration reference
- [Development](./development) — Local setup, available commands, and contributing guide
