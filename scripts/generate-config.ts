/**
 * Reads synced/.repos-metadata.json (written by sync-docs.ts) and discovers
 * locally-managed projects from docs/<slug>/.vitepressrc.json, then generates:
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

// ── Doc tree builder ──────────────────────────────────────────────────────
function hasMdContent(dir: string): boolean {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') return true
    if (entry.isDirectory() && !entry.name.startsWith('.') && hasMdContent(join(dir, entry.name))) return true
  }
  return false
}

function buildDocTree(dir: string, prefix: string = '', isRoot: boolean = true): string {
  if (!existsSync(dir)) return ''

  const entries = readdirSync(dir, { withFileTypes: true })
    .filter((e) => {
      if (e.name.startsWith('.')) return false
      if (e.name === 'index.md') return false
      if (e.isFile()) return e.name.endsWith('.md')
      if (e.isDirectory()) return hasMdContent(join(dir, e.name))
      return false
    })
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1
      if (!a.isDirectory() && b.isDirectory()) return 1
      return a.name.localeCompare(b.name)
    })

  const lines: string[] = []
  if (isRoot) lines.push('docs/')

  entries.forEach((entry, i) => {
    const last = i === entries.length - 1
    const branch = prefix + (last ? '└── ' : '├── ')
    const childPrefix = prefix + (last ? '    ' : '│   ')

    if (entry.isDirectory()) {
      lines.push(`${branch}${entry.name}/`)
      const sub = buildDocTree(join(dir, entry.name), childPrefix, false)
      if (sub) lines.push(sub)
    } else {
      lines.push(`${branch}${entry.name}`)
    }
  })

  return lines.join('\n')
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

function writeProjectIndex(project: Project): void {
  if (project.hasSourceIndex) return

  const projectDir = project.dir
  const sidebarItems = buildSidebarItems(projectDir, `/${project.slug}/`).filter(
    (item) => item.link !== `/${project.slug}/`,
  )

  const pageLinks = flattenSidebarLinks(sidebarItems)
    .map((item) => `- [${item.text}](${toProjectMarkdownLink(project.slug, item.link ?? '')})`)
    .join('\n')

  const tree = buildDocTree(projectDir)

  const frontmatterLines = ['title: Overview']
  if (project.description) frontmatterLines.push(`description: ${project.description}`)
  frontmatterLines.push(`repo: ${project.repo}`)
  if (project.icon) frontmatterLines.push(`icon: "${project.icon}"`)
  if (project.order !== undefined) frontmatterLines.push(`order: ${project.order}`)

  const md = `---
${frontmatterLines.join('\n')}
---

# ${project.title}

${project.description}

<a href="https://github.com/${project.repo}" target="_blank" rel="noopener noreferrer" class="vp-repo-link">View on GitHub →</a>

## Source repository

| | |
|---|---|
| Repository | [${project.repo}](https://github.com/${project.repo}) |
| Source docs | [\`docs/\`](https://github.com/${project.repo}/tree/main/docs) |

## Repository structure

\`\`\`
${tree}
\`\`\`

## Documentation

${pageLinks || '- No additional pages found.'}
`

  writeFileSync(join(projectDir, 'index.md'), md, 'utf-8')
}

// ── Write config.generated.ts ──────────────────────────────────────────────
function writeGeneratedConfig(projects: Project[]): void {
  const projectItems = projects.map((p) => ({
    text: p.title,
    link: `/${p.slug}/`,
  }))

  const nav = [
    { text: 'Home', link: '/' },
    ...(projectItems.length > 0
      ? [{ text: 'Projects', items: projectItems }]
      : []),
  ]

  const sidebar: Record<string, SidebarItem[]> = {}
  for (const p of projects) {
    const items = buildSidebarItems(p.dir, `/${p.slug}/`)
    if (items.length > 0) {
      sidebar[`/${p.slug}/`] = items
    } else {
      // Fallback: at least one "Overview" item
      sidebar[`/${p.slug}/`] = [{ text: 'Overview', link: `/${p.slug}/` }]
    }
  }

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
  name: "Kevin's Docs"
  text: "Centralized documentation hub"
  tagline: All @KevinDeBenedetti open source project docs in one place.
  image:
    src: /avatar.png
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
