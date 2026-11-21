# Copilot Instructions

## Project overview

- This repository is a Bun + VitePress documentation hub for `KevinDeBenedetti/*` public repositories and is deployed to GitHub Pages.
- The main logic lives in `scripts/` and `.vitepress/`. Docs of other repositories are synced into `synced/` (gitignored) at build time; `docs/` holds what is written in this repository.

## Key files and directories

- `scripts/docs-sources.ts`: lists the public repositories that have a `docs/` folder, with the state of that folder, from the GitHub API.
- `scripts/sync-docs.ts`: sparse-clones the `docs/` folder of each listed repository into `synced/<repo>/`.
- `scripts/check-docs-changes.ts`: used by `.github/workflows/docs-poll.yml` to decide whether the site must be rebuilt.
- `scripts/site-navigation.ts`: finds the synced and local projects and builds nav, sidebar, edit links and the generated pages. Tested in `scripts/__tests__/`.
- `scripts/generate-config.ts`: writes the pages that module generates: `docs/index.md`, `docs/projects/index.md` and missing project `index.md` files.
- `.vitepress/config.ts`: VitePress config; builds nav, sidebar, and edit links from `scripts/site-navigation.ts` at load time.
- `.vitepress/theme/`: custom Vue theme components and tests.
- `.github/workflows/ci-cd.yml`: CI runs actionlint, the prek hooks, `bun run lint`, `typecheck`, `test`, and `build`; Pages deploy happens outside pull requests, and release-please (config in `.github/release/`) cuts releases on push to `main`.

## Generated and synced content

- Do not hand-edit `docs/index.md`, `docs/projects/index.md`, `.vitepress/dist/**`, or `.vitepress/cache/**`. Regenerate them from source.
- Treat `synced/<project>/**` as copies from source repositories: the folder is gitignored and emptied by every `bun run sync-docs`.
- If documentation belongs to a source repository, change it in that repository, never in the synced copy here.
- `public/**` holds this repository's static assets; `public/sync-state.json` is generated.
- A synced project is any public repository of the owner with a root `docs/` folder (`synced/.repos-metadata.json` lists them). A local project is a `docs/<slug>/index.md` with a `repo:` frontmatter field and an H1; its index page is regenerated from that frontmatter.

## Commands

- Use Bun. `packageManager` in `package.json` gives the version, and the README expects Bun `>= 1.2`.
- Install dependencies: `bun install`
- Sync docs only: `bun run sync-docs`
- Regenerate synced docs metadata and homepage: `bun run generate`
- Start local site: `bun run dev`
- Build production site: `bun run build`
- Preview the last build: `bun run preview`
- Lint TypeScript and Vue files: `bun run lint`
- Type-check: `bun run typecheck`
- Run unit tests: `bun run test`

## Editing guidance

- Prefer editing source files in `scripts/**`, `.vitepress/config.ts`, `.vitepress/theme/**`, workflow files, and top-level config/docs over editing generated artifacts.
- `bun run generate`, `bun run dev`, and `bun run build` all run `scripts/sync-docs.ts`, so they require network access and may overwrite synced docs content.
- When changing sync or generation behavior, validate with `bun run typecheck`, `bun run test`, and `bun run build` when network access is available.
- Keep TypeScript consistent with the existing codebase: ESM modules, explicit interfaces for structured data, small helper functions, and direct Node/Bun APIs instead of extra abstractions.
- Theme component tests use Vitest with `@vue/test-utils` in the `jsdom` environment; script tests in `scripts/__tests__/` run in the `node` environment.
- `prek.toml` runs `oxlint` for `ts` and `vue` files only.

## Working style

- Keep instructions and changes repository-specific. Do not assume frameworks or tools that are not present in this repo.
- Prefer concise, factual guidance drawn from the repo itself. Search only when these instructions do not cover the requested area or the repo has changed.
