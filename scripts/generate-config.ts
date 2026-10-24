/**
 * Reads synced/.repos-metadata.json (written by sync-docs.ts) and discovers
 * locally-managed projects from docs/<slug>/index.md frontmatter (`repo:`), then generates:
 *   - .vitepress/config.generated.ts  (nav, sidebar, editLink)
 *   - docs/index.md                   (homepage with feature cards)
 *
 * Run: bun scripts/generate-config.ts
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

// ── Types ──────────────────────────────────────────────────────────────────
interface RepoMetadata {
  slug: string
  title: string
  description: string
  repo: string
}

interface Project extends RepoMetadata {
  hasSourceIndex: boolean
  /** Absolute path to the directory containing this project's docs. */
  dir: string
  icon?: string
  order?: number
}

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

// ── Discovery ──────────────────────────────────────────────────────────────
function getSyncedProjects(): Project[] {
  const metadataPath = join(ROOT, 'synced', '.repos-metadata.json')
  if (!existsSync(metadataPath)) return []

  const repos: RepoMetadata[] = JSON.parse(readFileSync(metadataPath, 'utf-8'))

  return repos
    .map((repo) => {
      const projectDir = join(ROOT, 'synced', repo.slug)
      return {
        ...repo,
        dir: projectDir,
        hasSourceIndex: existsSync(join(projectDir, 'index.md')),
      }
    })
    .filter((p) => existsSync(p.dir))
}

/**
 * Reads project metadata from an index.md frontmatter block.
 * A directory is treated as a local project when its index.md contains a `repo:` field.
 */
function readLocalProjectMeta(
  indexPath: string,
): { title: string; description: string; repo: string; icon?: string; order?: number } | null {
  if (!existsSync(indexPath)) return null
  const content = readFileSync(indexPath, 'utf-8')

  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (!fmMatch) return null
  const fm = fmMatch[1]

  const getField = (key: string): string | undefined => {
    const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
    return m ? m[1].replace(/^["']|["']$/g, '').trim() : undefined
  }

  const repo = getField('repo')
  if (!repo) return null

  // Title comes from the first h1 heading
  const h1Match = content.match(/^#\s+(.+)$/m)
  const title = h1Match ? h1Match[1].trim() : ''
  if (!title) return null

  const orderStr = getField('order')
  return {
    repo,
    title,
    description: getField('description') ?? '',
    icon: getField('icon'),
    order: orderStr !== undefined ? Number(orderStr) : undefined,
  }
}

function getLocalProjects(syncedSlugs: Set<string>): Project[] {
  const docsDir = join(ROOT, 'docs')
  if (!existsSync(docsDir)) return []

  const projects: Project[] = []

  for (const entry of readdirSync(docsDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || syncedSlugs.has(entry.name)) continue

    const projectDir = join(docsDir, entry.name)
    const meta = readLocalProjectMeta(join(projectDir, 'index.md'))
    if (!meta) continue

    projects.push({
      slug: entry.name,
      title: meta.title,
      description: meta.description,
      repo: meta.repo,
      icon: meta.icon,
      order: meta.order,
      dir: projectDir,
      hasSourceIndex: false,  // always regenerate via writeProjectIndex
    })
  }

  return projects
}

function getProjects(): Project[] {
  const synced = getSyncedProjects()
  const syncedSlugs = new Set(synced.map((p) => p.slug))
  const local = getLocalProjects(syncedSlugs)

  return [...synced, ...local].sort((a, b) => {
    const ao = a.order ?? Infinity
    const bo = b.order ?? Infinity
    if (ao !== bo) return ao - bo
    return a.slug.localeCompare(b.slug)
  })
}

function sortEntries(a: { name: string; isDirectory(): boolean }, b: { name: string; isDirectory(): boolean }): number {
  if (a.name === 'index.md') return -1
  if (b.name === 'index.md') return 1
  if (a.isDirectory() && !b.isDirectory()) return 1
  if (!a.isDirectory() && b.isDirectory()) return -1
  return a.name.localeCompare(b.name)
}

// ── Sidebar builder ────────────────────────────────────────────────────────
function getMdTitle(filePath: string): string {
  const content = readFileSync(filePath, 'utf-8')

  // Try frontmatter title
  const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
  if (fmMatch) {
    const titleMatch = fmMatch[1].match(/^title:\s*(.+)$/m)
    if (titleMatch) return titleMatch[1].replace(/^["']|["']$/g, '').trim()
  }

  // Try first h1
  const h1Match = content.match(/^#\s+(.+)$/m)
  if (h1Match) return h1Match[1].trim()

  // Fallback to filename
  return basename(filePath, '.md')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c: string) => c.toUpperCase())
}

function buildSidebarItems(dir: string, baseLink: string): SidebarItem[] {
  if (!existsSync(dir)) return []

  const entries = readdirSync(dir, { withFileTypes: true }).sort(sortEntries)

  // Detect directories so file+directory pairs with the same name can be merged
  const dirNames = new Set(entries.filter((e) => e.isDirectory()).map((e) => e.name))
  const mergedDirs = new Set<string>()

  const items: SidebarItem[] = []

  for (const entry of entries) {
    // Skip hidden files / config files
    if (entry.name.startsWith('.')) continue

    const fullPath = join(dir, entry.name)

    if (entry.isFile() && entry.name.endsWith('.md')) {
      const slug = entry.name === 'index.md' ? '' : basename(entry.name, '.md')

      if (slug && dirNames.has(slug)) {
        // file.md + file/ at same level → merge into one collapsible group
        const nested = buildSidebarItems(join(dir, slug), `${baseLink}${slug}/`)
        items.push({
          text: getMdTitle(fullPath),
          link: `${baseLink}${slug}`,
          collapsed: true,
          ...(nested.length > 0 ? { items: nested } : {}),
        })
        mergedDirs.add(slug)
      } else {
        items.push({
          text: entry.name === 'index.md' ? 'Overview' : getMdTitle(fullPath),
          link: slug ? `${baseLink}${slug}` : baseLink,
        })
      }
    } else if (entry.isDirectory() && !mergedDirs.has(entry.name)) {
      const nested = buildSidebarItems(fullPath, `${baseLink}${entry.name}/`)
      if (nested.length > 0) {
        items.push({
          text: entry.name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
          collapsed: true,
          items: nested,
        })
      }
    }
  }

  return items
}

function flattenSidebarLinks(items: SidebarItem[]): SidebarItem[] {
  const links: SidebarItem[] = []

  for (const item of items) {
    if (item.link) links.push(item)
    if (item.items) links.push(...flattenSidebarLinks(item.items))
  }

  return links
}

function toProjectMarkdownLink(slug: string, link: string): string {
  const prefix = `/${slug}/`
  if (!link.startsWith(prefix)) return link

  const path = link.slice(prefix.length)
  return path ? `./${path}.md` : './index.md'
}

const GITHUB_MARK =
  'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z'
const FOLDER_ICON = 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'

/**
 * "Source repository" card: repository + docs/ folder on GitHub.
 * Styled by .vp-source in .vitepress/theme/custom.css; docs/docs/index.md
 * carries the same markup by hand. No blank line inside — markdown-it would
 * end the HTML block there.
 */
function sourceCard(repo: string): string {
  const url = `https://github.com/${repo}`
  return `<div class="vp-source">
  <a class="vp-source__row" href="${url}" target="_blank" rel="noopener noreferrer">
    <svg class="vp-source__icon" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="${GITHUB_MARK}"/></svg>
    <span class="vp-source__text"><span class="vp-source__label">Repository</span><span class="vp-source__value">${repo}</span></span>
    <span class="vp-source__arrow" aria-hidden="true">→</span>
  </a>
  <a class="vp-source__row" href="${url}/tree/main/docs" target="_blank" rel="noopener noreferrer">
    <svg class="vp-source__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${FOLDER_ICON}"/></svg>
    <span class="vp-source__text"><span class="vp-source__label">Source docs</span><span class="vp-source__value"><code>docs/</code> on <code>main</code></span></span>
    <span class="vp-source__arrow" aria-hidden="true">→</span>
  </a>
</div>`
}

function writeProjectIndex(project: Project): void {
  if (project.hasSourceIndex) return

  const projectDir = project.dir
  const sidebarItems = buildSidebarItems(projectDir, `/${project.slug}/`).filter(
    (item) => item.link !== `/${project.slug}/`,
  )

  const pageLinks = flattenSidebarLinks(sidebarItems)
    .map((item) => `- [${item.text}](${toProjectMarkdownLink(project.slug, item.link ?? '')})`)
    .join('\n')

  const frontmatterLines = [`title: ${JSON.stringify(project.title)}`]
  if (project.description) frontmatterLines.push(`description: ${JSON.stringify(project.description)}`)
  frontmatterLines.push(`repo: ${project.repo}`)
  if (project.icon) frontmatterLines.push(`icon: "${project.icon}"`)
  if (project.order !== undefined) frontmatterLines.push(`order: ${project.order}`)

  const md = `---
${frontmatterLines.join('\n')}
---

# ${project.title}

${project.description}

## Source repository

${sourceCard(project.repo)}

## Documentation

${pageLinks || '- No additional pages found.'}
`

  writeFileSync(join(projectDir, 'index.md'), md, 'utf-8')
}

// ── Write config.generated.ts ──────────────────────────────────────────────
function writeGeneratedConfig(projects: Project[]): void {
  // Simplified nav: only Home and About
  const nav = [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about/' },
  ]

  const sidebar: Record<string, SidebarItem[]> = {}

  // Build sidebar for all project paths
  // Each project path gets: Projects link + all other projects as collapsible groups + current project's pages
  for (const p of projects) {
    // Start with Projects link
    const sidebarItems: SidebarItem[] = [
      { text: 'Projects', link: '/projects/' },
    ]

    // Add each project as a collapsible section
    for (const proj of projects) {
      const projectPages = buildSidebarItems(proj.dir, `/${proj.slug}/`)
      const pageItems = projectPages.length > 0
        ? projectPages
        : [{ text: 'Overview', link: `/${proj.slug}/` }]

      // Use collapsed: false for current project, true for others
      const isCurrentProject = proj.slug === p.slug
      sidebarItems.push({
        text: proj.title,
        collapsed: !isCurrentProject,
        items: pageItems,
      })
    }

    sidebar[`/${p.slug}/`] = sidebarItems
  }

  // Also create sidebar for /projects/ page showing all projects at top level
  const projectsSidebar: SidebarItem[] = [
    { text: 'Projects', link: '/projects/' },
  ]
  for (const p of projects) {
    const projectPages = buildSidebarItems(p.dir, `/${p.slug}/`)
    const pageItems = projectPages.length > 0
      ? projectPages
      : [{ text: 'Overview', link: `/${p.slug}/` }]

    projectsSidebar.push({
      text: p.title,
      collapsed: true,
      items: pageItems,
    })
  }
  sidebar['/projects/'] = projectsSidebar

  // Create sidebar for /about/ page showing all projects
  const aboutSidebar: SidebarItem[] = [
    { text: 'Projects', link: '/projects/' },
  ]
  for (const p of projects) {
    const projectPages = buildSidebarItems(p.dir, `/${p.slug}/`)
    const pageItems = projectPages.length > 0
      ? projectPages
      : [{ text: 'Overview', link: `/${p.slug}/` }]

    aboutSidebar.push({
      text: p.title,
      collapsed: true,
      items: pageItems,
    })
  }
  sidebar['/about/'] = aboutSidebar

  // Build editLink function body.
  // filePath is the pre-rewrite source path relative to srcDir (repo root),
  // e.g. 'synced/my-repo/page.md' or 'docs/docs/page.md'.
  const editLinkCases = projects
    .map((p) => {
      const prefix = p.dir.slice(ROOT.length + 1)  // e.g. 'synced/my-repo' or 'docs/docs'
      const prefixSliceLen = prefix.length + 1      // +1 for trailing slash
      return (
        `  if (filePath.startsWith('${prefix}/')) {\n` +
        (p.hasSourceIndex
          ? `    return 'https://github.com/${p.repo}/edit/main/docs/' + filePath.slice(${prefixSliceLen})\n`
          : `    if (filePath === '${prefix}/index.md') return 'https://github.com/${p.repo}/tree/main/docs'\n` +
            `    return 'https://github.com/${p.repo}/edit/main/docs/' + filePath.slice(${prefixSliceLen})\n`) +
        `  }`
      )
    })
    .join('\n')

  const code = `// ⚠️ GENERATED — do not edit manually.
// This file is overwritten on every deploy by scripts/generate-config.ts.
// Run \`bun run generate\` to regenerate locally (requires synced docs/).

import type { DefaultTheme } from 'vitepress'

export const generatedNav: DefaultTheme.NavItem[] = ${JSON.stringify(nav, null, 2)}

export const generatedSidebar: DefaultTheme.SidebarMulti = ${JSON.stringify(sidebar, null, 2)}

export function generatedEditLinkPattern({ filePath }: { filePath: string }): string {
${editLinkCases}
  return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/' + filePath
}
`

  writeFileSync(join(ROOT, '.vitepress', 'config.generated.ts'), code, 'utf-8')
  console.log('✓ .vitepress/config.generated.ts written')
}

// ── Write docs/index.md ────────────────────────────────────────────────────
function writeIndexMd(projects: Project[]): void {
  const features = projects
    .map((p) => {
      const lines = [`  - title: "${p.title}"`]
      lines.push(`    details: ${p.description}`)
      lines.push(`    link: /${p.slug}/`)
      lines.push(`    linkText: View docs`)
      return lines.join('\n')
    })
    .join('\n')

  const firstLink = projects.length > 0 ? `/${projects[0].slug}/` : '/'

  const md = `---
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

  writeFileSync(join(ROOT, 'docs', 'index.md'), md, 'utf-8')
  console.log('✓ docs/index.md written')
}

// ── Main ───────────────────────────────────────────────────────────────────
const projects = getProjects()
console.log(`Found ${projects.length} project(s): ${projects.map((p) => p.slug).join(', ') || '(none)'}`)

projects.forEach(writeProjectIndex)
writeGeneratedConfig(projects)
writeIndexMd(projects)
