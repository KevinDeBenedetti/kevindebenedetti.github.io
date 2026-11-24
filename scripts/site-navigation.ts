/**
 * Site navigation: the projects published on the hub, and the nav, sidebar,
 * edit links and generated pages derived from them.
 *
 * Projects come from two places under `root`:
 *   - synced projects: synced/.repos-metadata.json (written by sync-docs.ts)
 *     and the docs cloned to synced/<slug>/
 *   - local projects: docs/<slug>/index.md carrying a `repo:` frontmatter field
 *
 * Reads the filesystem, writes nothing: callers write `pages` to disk.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { parse as parseYaml } from 'yaml'
import type { RepoMetadata } from './sync-docs'

const HUB_REPO = 'KevinDeBenedetti/kevindebenedetti.github.io'
/** Frontmatter field carried by every index page generated here. */
const GENERATED_MARK = 'generated'

export interface Project {
  slug: string
  title: string
  description: string
  /** `owner/name` of the repository the docs come from. */
  repo: string
  /** Branch the docs are read from: the default branch of a docs source, `main` for a local project. */
  branch: string
  /** Folder holding the project's pages, relative to the repo root. */
  dir: string
  /** False when the index page is generated here instead of written in the source repo. */
  hasSourceIndex: boolean
  icon?: string
  order?: number
}

export interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

export interface NavItem {
  text: string
  link: string
}

/** A page to write, `path` relative to the repo root. */
export interface GeneratedPage {
  path: string
  content: string
}

export interface SiteNavigation {
  projects: Project[]
  nav: NavItem[]
  /** Sidebar per URL prefix (`/<slug>/`, `/projects/`, `/about/`). */
  sidebar: Record<string, SidebarItem[]>
  /** Index page of each project that has none, then the homepage and the Projects page. */
  pages: GeneratedPage[]
}

// ── Page metadata ──────────────────────────────────────────────────────────
/** A file, folder or repository name as a title: `my-repo_name` → `My Repo Name`. */
export function titleCase(name: string): string {
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const FRONTMATTER = /^---\s*\n([\s\S]*?)\n---/
const FENCED_CODE = /^(```|~~~)[\s\S]*?^\1.*$/gm

type Frontmatter = Record<string, unknown>

/** The page's YAML frontmatter; empty when there is none or it does not parse. */
function frontmatterOf(content: string): Frontmatter {
  const block = content.match(FRONTMATTER)?.[1]
  if (!block) return {}
  try {
    const data: unknown = parseYaml(block)
    return data !== null && typeof data === 'object' && !Array.isArray(data) ? (data as Frontmatter) : {}
  } catch {
    return {}
  }
}

/** A frontmatter value as text; undefined when absent or empty. */
function frontmatterField(frontmatter: Frontmatter, key: string): string | undefined {
  const value = frontmatter[key]
  if (value === undefined || value === null) return undefined
  return String(value).trim() || undefined
}

/** First H1 of the page body: frontmatter and fenced code are not headings. */
function firstHeading(content: string): string | undefined {
  const body = content.replace(FRONTMATTER, '').replace(FENCED_CODE, '')
  return body.match(/^#\s+(.+)$/m)?.[1].trim()
}

/** Frontmatter `title:`, else the first H1, else the filename in Title Case. */
function pageTitle(filePath: string): string {
  const content = readFileSync(filePath, 'utf-8')
  return (
    frontmatterField(frontmatterOf(content), 'title') ||
    firstHeading(content) ||
    titleCase(basename(filePath, '.md'))
  )
}

/** True for a page written in its source repo, false for a missing or generated one. */
function isSourcePage(filePath: string): boolean {
  if (!existsSync(filePath)) return false
  return frontmatterOf(readFileSync(filePath, 'utf-8'))[GENERATED_MARK] !== true
}

// ── Projects ───────────────────────────────────────────────────────────────
function syncedProjects(root: string): Project[] {
  const metadataPath = join(root, 'synced', '.repos-metadata.json')
  if (!existsSync(metadataPath)) return []

  const repos: RepoMetadata[] = JSON.parse(readFileSync(metadataPath, 'utf-8'))

  return repos
    .map((repo) => {
      const dir = `synced/${repo.slug}`
      return { ...repo, dir, hasSourceIndex: isSourcePage(join(root, dir, 'index.md')) }
    })
    .filter((project) => existsSync(join(root, project.dir)))
}

/** A folder of docs/ is a local project when its index.md has a `repo:` field and an H1. */
function localProjects(root: string, syncedSlugs: Set<string>): Project[] {
  const docsDir = join(root, 'docs')
  if (!existsSync(docsDir)) return []

  const projects: Project[] = []

  for (const entry of readdirSync(docsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || syncedSlugs.has(entry.name)) continue

    const indexPath = join(docsDir, entry.name, 'index.md')
    if (!existsSync(indexPath)) continue

    const content = readFileSync(indexPath, 'utf-8')
    const frontmatter = frontmatterOf(content)
    const repo = frontmatterField(frontmatter, 'repo')
    const title = firstHeading(content)
    if (!repo || !title) continue

    const icon = frontmatterField(frontmatter, 'icon')
    // An order that is not a number would make the project sort unpredictable.
    const order = Number(frontmatterField(frontmatter, 'order') ?? NaN)

    projects.push({
      slug: entry.name,
      title,
      description: frontmatterField(frontmatter, 'description') ?? '',
      repo,
      branch: 'main',
      ...(icon !== undefined ? { icon } : {}),
      ...(Number.isFinite(order) ? { order } : {}),
      dir: `docs/${entry.name}`,
      // The index page of a local project is regenerated from its own frontmatter.
      hasSourceIndex: false,
    })
  }

  return projects
}

function discoverProjects(root: string): Project[] {
  const synced = syncedProjects(root)
  const local = localProjects(root, new Set(synced.map((p) => p.slug)))

  return [...synced, ...local].sort((a, b) => {
    const ao = a.order ?? Infinity
    const bo = b.order ?? Infinity
    if (ao !== bo) return ao - bo
    return a.slug.localeCompare(b.slug)
  })
}

// ── Sidebar ────────────────────────────────────────────────────────────────
interface Entry {
  name: string
  isDirectory(): boolean
}

/** index.md first, then files, then folders, each alphabetically. */
function byPageOrder(a: Entry, b: Entry): number {
  if (a.name === 'index.md') return -1
  if (b.name === 'index.md') return 1
  if (a.isDirectory() && !b.isDirectory()) return 1
  if (!a.isDirectory() && b.isDirectory()) return -1
  return a.name.localeCompare(b.name)
}

function pagesIn(dir: string, baseLink: string): SidebarItem[] {
  if (!existsSync(dir)) return []

  const entries = readdirSync(dir, { withFileTypes: true }).sort(byPageOrder)
  const dirNames = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name))
  const mergedDirs = new Set<string>()
  const items: SidebarItem[] = []

  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue

    const fullPath = join(dir, entry.name)

    if (entry.isFile() && entry.name.endsWith('.md')) {
      const slug = entry.name === 'index.md' ? '' : basename(entry.name, '.md')

      if (slug && dirNames.has(slug)) {
        // topic.md next to topic/ → one collapsible entry
        const nested = pagesIn(join(dir, slug), `${baseLink}${slug}/`)
        items.push({
          text: pageTitle(fullPath),
          link: `${baseLink}${slug}`,
          collapsed: true,
          ...(nested.length > 0 ? { items: nested } : {}),
        })
        mergedDirs.add(slug)
      } else {
        items.push({
          text: slug ? pageTitle(fullPath) : 'Overview',
          link: slug ? `${baseLink}${slug}` : baseLink,
        })
      }
    } else if (entry.isDirectory() && !mergedDirs.has(entry.name)) {
      const nested = pagesIn(fullPath, `${baseLink}${entry.name}/`)
      if (nested.length > 0) {
        items.push({ text: titleCase(entry.name), collapsed: true, items: nested })
      }
    }
  }

  return items
}

/**
 * Sidebar entries of a project. Every project has an index page (generated
 * when the source has none), so "Overview" leads even before it is on disk.
 */
function projectPages(root: string, project: Project): SidebarItem[] {
  const base = `/${project.slug}/`
  const items = pagesIn(join(root, project.dir), base)
  return items[0]?.link === base ? items : [{ text: 'Overview', link: base }, ...items]
}

function buildSidebar(
  projects: Project[],
  pagesBySlug: Map<string, SidebarItem[]>,
): Record<string, SidebarItem[]> {
  const allProjects = (current?: string): SidebarItem[] => [
    { text: 'Projects', link: '/projects/' },
    ...projects.map((project) => ({
      text: project.title,
      collapsed: project.slug !== current,
      items: pagesBySlug.get(project.slug) ?? [],
    })),
  ]

  const sidebar: Record<string, SidebarItem[]> = {}
  for (const project of projects) sidebar[`/${project.slug}/`] = allProjects(project.slug)
  sidebar['/projects/'] = allProjects()
  sidebar['/about/'] = allProjects()
  return sidebar
}

// ── Generated pages ────────────────────────────────────────────────────────
const GITHUB_MARK =
  'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'
const FOLDER_ICON = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

/**
 * "Source repository" card: repository + docs/ folder on GitHub.
 * Styled by .vp-source in .vitepress/theme/custom.css. No blank line inside —
 * markdown-it would end the HTML block there.
 */
function sourceCard(repo: string, branch: string): string {
  const url = `https://github.com/${repo}`
  // Git allows `&` and quotes in a branch name: escape it for the text and the href.
  const ref = escapeHtml(branch).replace(/"/g, '&quot;')
  return `<div class="vp-source">
  <a class="vp-source__row" href="${url}" target="_blank" rel="noopener noreferrer">
    <svg class="vp-source__icon" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="${GITHUB_MARK}"/></svg>
    <span class="vp-source__text"><span class="vp-source__label">Repository</span><span class="vp-source__value">${repo}</span></span>
    <span class="vp-source__arrow" aria-hidden="true">→</span>
  </a>
  <a class="vp-source__row" href="${url}/tree/${ref}/docs" target="_blank" rel="noopener noreferrer">
    <svg class="vp-source__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${FOLDER_ICON}"/></svg>
    <span class="vp-source__text"><span class="vp-source__label">Source docs</span><span class="vp-source__value"><code>docs/</code> on <code>${ref}</code></span></span>
    <span class="vp-source__arrow" aria-hidden="true">→</span>
  </a>
</div>`
}

/** Free text with its HTML escaped: `&`, `<` and `>` read as themselves. */
function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/**
 * Free text (a GitHub description) for a Markdown page body. VitePress compiles
 * the body as a Vue template, so `{{ }}` and tags in the text would run or
 * break the build: escape the HTML and switch interpolation off.
 */
function plainText(text: string): string {
  if (!text) return ''
  return `<span v-pre>${escapeHtml(text)}</span>`
}

function linkedPages(items: SidebarItem[]): SidebarItem[] {
  return items.flatMap((item) => [...(item.link ? [item] : []), ...linkedPages(item.items ?? [])])
}

function projectIndexPage(project: Project, pages: SidebarItem[]): GeneratedPage {
  const base = `/${project.slug}/`
  const pageLinks = linkedPages(pages)
    .filter((item) => item.link !== base)
    .map((item) => {
      // A link ending in "/" is a folder's index page.
      const path = item.link!.slice(base.length)
      return `- [${item.text}](./${path.endsWith('/') ? `${path}index` : path}.md)`
    })
    .join('\n')

  const frontmatter = [`title: ${JSON.stringify(project.title)}`]
  if (project.description) frontmatter.push(`description: ${JSON.stringify(project.description)}`)
  frontmatter.push(`repo: ${project.repo}`)
  if (project.icon) frontmatter.push(`icon: "${project.icon}"`)
  if (project.order !== undefined) frontmatter.push(`order: ${project.order}`)
  frontmatter.push(`${GENERATED_MARK}: true`)

  const content = `---
${frontmatter.join('\n')}
---

# ${project.title}

${plainText(project.description)}

## Source repository

${sourceCard(project.repo, project.branch)}

## Documentation

${pageLinks || '- No additional pages found.'}
`

  return { path: `${project.dir}/index.md`, content }
}

function homePage(projects: Project[]): GeneratedPage {
  const features = projects
    .map((p) =>
      [
        // JSON strings are valid YAML: quotes and colons in the text stay text.
        // VitePress renders a feature's title and details with v-html, so their
        // HTML is escaped. Its `icon:` (an emoji or text) shows above the title.
        ...(p.icon
          ? [`  - icon: ${JSON.stringify(p.icon)}`, `    title: ${JSON.stringify(escapeHtml(p.title))}`]
          : [`  - title: ${JSON.stringify(escapeHtml(p.title))}`]),
        `    details: ${JSON.stringify(escapeHtml(p.description))}`,
        `    link: /${p.slug}/`,
        `    linkText: View docs`,
      ].join('\n'),
    )
    .join('\n')

  const firstLink = projects.length > 0 ? `/${projects[0].slug}/` : '/'

  const content = `---
# ⚠️ GENERATED — do not edit manually.
# Overwritten by scripts/generate-config.ts — run \`bun run generate\`.
layout: home

hero:
  name: "Docs"
  text: "Centralized documentation hub"
  tagline: All @KevinDeBenedetti open source project docs in one place.
  image:
    src: /avatar.webp
    alt: Kevin De Benedetti
  actions:
    - theme: brand
      text: Browse projects
      link: ${firstLink}

features:
${features}
---
`

  return { path: 'docs/index.md', content }
}

function projectsPage(projects: Project[]): GeneratedPage {
  const rows = projects
    .map((p) => {
      // A pipe would end the table cell.
      const description = plainText(p.description).replace(/\|/g, '\\|')
      const links = `<ProjectLinks docsLink="/${p.slug}/" githubLink="https://github.com/${p.repo}" />`
      return `| **${p.title}** | ${description} | ${links} |`
    })
    .join('\n')

  const content = `---
# ⚠️ GENERATED — do not edit manually.
# Overwritten by scripts/generate-config.ts — run \`bun run generate\`.
title: Projects
description: Browse all projects in the documentation hub
---

# All Projects

Explore the complete collection of open-source projects and resources.

| Project | Description | Links |
| ------- | ----------- | ----- |
${rows}
`

  return { path: 'docs/projects/index.md', content }
}

// ── Interface ──────────────────────────────────────────────────────────────
/** Builds the site navigation of the repository at `root`. */
export function buildSiteNavigation(root: string): SiteNavigation {
  const projects = discoverProjects(root)
  const pagesBySlug = new Map(projects.map((p) => [p.slug, projectPages(root, p)]))

  return {
    projects,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
    ],
    sidebar: buildSidebar(projects, pagesBySlug),
    pages: [
      ...projects
        .filter((p) => !p.hasSourceIndex)
        .map((p) => projectIndexPage(p, pagesBySlug.get(p.slug) ?? [])),
      homePage(projects),
      projectsPage(projects),
    ],
  }
}

/**
 * Meta description of the page at `relativePath` (its URL path, as in
 * VitePress pageData). A page that sets none, under a project, is described
 * from its title and that project, so search results do not show the same
 * site-wide text for every page. Undefined elsewhere: the site description
 * applies.
 */
export function pageDescription(
  projects: Pick<Project, 'slug' | 'title' | 'description'>[],
  relativePath: string,
  title: string,
  description: string,
): string | undefined {
  if (description) return description
  const project = projects.find((p) => relativePath.startsWith(`${p.slug}/`))
  if (!project) return undefined
  const context = `${title}, in the ${project.title} documentation`
  return project.description ? `${context}: ${project.description}` : `${context}.`
}

/**
 * The edit-link rule. Self-contained on purpose (no outer names): its source
 * text is shipped to the browser by editLinkPattern.
 */
function editLinkFor(
  filePath: string,
  synced: Pick<Project, 'dir' | 'repo' | 'branch' | 'hasSourceIndex'>[],
  hubRepo: string,
): string {
  const project = synced.find((p) => filePath.startsWith(`${p.dir}/`))
  if (!project) return `https://github.com/${hubRepo}/edit/main/${filePath}`

  const page = filePath.slice(project.dir.length + 1)
  // A generated index page has no source file: point at the docs folder.
  if (page === 'index.md' && !project.hasSourceIndex) {
    return `https://github.com/${project.repo}/tree/${project.branch}/docs`
  }
  return `https://github.com/${project.repo}/edit/${project.branch}/docs/${page}`
}

/**
 * Function behind "Edit this page": maps a page's source path relative to the
 * repo root (`synced/my-repo/page.md`, `docs/docs/page.md`) to its GitHub URL.
 *
 * VitePress serializes `themeConfig.editLink.pattern` with toString() and
 * rebuilds it in the browser, where imports and closures are gone. The
 * returned function therefore carries the rule and the project data in its
 * own source.
 */
export function editLinkPattern(projects: Project[]): (page: { filePath: string }) => string {
  // Only synced pages live elsewhere; a local project's pages are files of this repo.
  const sources = projects
    .filter((project) => project.dir.startsWith('synced/'))
    .map(({ dir, repo, branch, hasSourceIndex }) => ({ dir, repo, branch, hasSourceIndex }))
  return new Function(
    'page',
    `return (${editLinkFor.toString()})(page.filePath, ${JSON.stringify(sources)}, ${JSON.stringify(HUB_REPO)})`,
  ) as (page: { filePath: string }) => string
}
