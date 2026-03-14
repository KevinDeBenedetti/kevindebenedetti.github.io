# Copilot Instructions

## Project overview

- This repository is a Bun + VitePress documentation hub for `KevinDeBenedetti/*` public repositories and is deployed to GitHub Pages.
- The main logic lives in `scripts/` and `.vitepress/`. Most content under `docs/` is synced from source repositories, not authored directly here.

## Key files and directories

- `scripts/sync-docs.ts`: fetches public repos from the GitHub API, sparse-clones each `docs/` directory, and repopulates `docs/`.
- `scripts/generate-config.ts`: reads each `docs/<project>/.vitepressrc.json` and generates `.vitepress/config.generated.ts`, `docs/index.md`, and missing project `index.md` files.
- `.vitepress/config.ts`: static VitePress config that imports generated nav, sidebar, and edit-link data.
- `.vitepress/theme/`: custom Vue theme components and tests.
- `.github/workflows/ci-cd.yml`: CI runs actionlint, `bun run typecheck`, and `bun run build`; Pages deploy happens outside pull requests.

## Generated and synced content

- Do not hand-edit `.vitepress/config.generated.ts`, `docs/index.md`, `.vitepress/dist/**`, or `.vitepress/cache/**`. Regenerate them from source.
- Treat `docs/<project>/**` as synced copies from source repositories. Local edits there are overwritten by `bun run sync-docs` and `bun run generate`.
- `docs/public/**` is preserved during sync and is the correct place for repo-local static assets.
- If documentation belongs to a source repository, prefer changing it in that source repository instead of patching the synced copy here.
- Each synced project is discovered from `docs/<project>/.vitepressrc.json`, which must provide `title`, `description`, `icon`, `order`, and `repo`.

## Commands

- Use Bun. `packageManager` is `bun@1.2.21`, and the README expects Bun `>= 1.2`.
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
- Theme component tests use Vitest with `@vue/test-utils` in the `jsdom` environment.
- `prek.toml` runs `oxlint` for `ts` and `vue` files only.

## Working style

- Keep instructions and changes repository-specific. Do not assume frameworks or tools that are not present in this repo.
- Prefer concise, factual guidance drawn from the repo itself. Search only when these instructions do not cover the requested area or the repo has changed.
