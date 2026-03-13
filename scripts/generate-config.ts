/**
 * Reads docs/<project>/.vitepressrc.json files and generates:
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
interface ProjectRC {
  title: string
  description: string
  icon: string
  order: number
  repo: string
}

interface Project {
  slug: string
  rc: ProjectRC
  hasSourceIndex: boolean
}

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

// ── Discovery ──────────────────────────────────────────────────────────────
function getProjects(): Project[] {
  const docsDir = join(ROOT, 'docs')
  if (!existsSync(docsDir)) return []

  return readdirSync(docsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const rcPath = join(docsDir, d.name, '.vitepressrc.json')
      if (!existsSync(rcPath)) return null
      const projectDir = join(docsDir, d.name)
      const rc: ProjectRC = JSON.parse(readFileSync(rcPath, 'utf-8'))
      return {
        slug: d.name,
        rc,
        hasSourceIndex: existsSync(join(projectDir, 'index.md')),
      }
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.rc.order - b.rc.order)
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

  const projectDir = join(ROOT, 'docs', project.slug)
  const sidebarItems = buildSidebarItems(projectDir, `/${project.slug}/`).filter(
    (item) => item.link !== `/${project.slug}/`,
  )

  const pageLinks = flattenSidebarLinks(sidebarItems)
    .map((item) => `- [${item.text}](${toProjectMarkdownLink(project.slug, item.link ?? '')})`)
    .join('\n')

  const tree = buildDocTree(projectDir)

  const md = `---
title: Overview
---

# ${project.rc.icon} ${project.rc.title}

${project.rc.description}

<a href="https://github.com/${project.rc.repo}" target="_blank" rel="noopener noreferrer" class="vp-repo-link">View on GitHub →</a>

## Source repository

| | |
|---|---|
| Repository | [${project.rc.repo}](https://github.com/${project.rc.repo}) |
| Source docs | [\`docs/\`](https://github.com/${project.rc.repo}/tree/main/docs) |

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
  const nav = [
    { text: 'Home', link: '/' },
    ...projects.map((p) => ({
      text: p.rc.title,
      link: `/${p.slug}/`,
    })),
  ]

  const sidebar: Record<string, SidebarItem[]> = {}
  for (const p of projects) {
    const projectDocsDir = join(ROOT, 'docs', p.slug)
    const items = buildSidebarItems(projectDocsDir, `/${p.slug}/`)
    if (items.length > 0) {
      sidebar[`/${p.slug}/`] = items
    } else {
      // Fallback: at least one "Overview" item
      sidebar[`/${p.slug}/`] = [{ text: 'Overview', link: `/${p.slug}/` }]
    }
  }

  // Build editLink function body using string concatenation
  // to avoid template-literal escaping issues in generated code
  const editLinkCases = projects
    .map(
      (p) =>
        `  if (filePath.startsWith('${p.slug}/')) {\n` +
        (p.hasSourceIndex
          ? `    return 'https://github.com/${p.rc.repo}/edit/main/docs/' + filePath.slice(${p.slug.length + 1})\n`
          : `    if (filePath === '${p.slug}/index.md') return 'https://github.com/${p.rc.repo}/tree/main/docs'\n` +
            `    return 'https://github.com/${p.rc.repo}/edit/main/docs/' + filePath.slice(${p.slug.length + 1})\n`) +
        `  }`,
    )
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
    .map(
      (p) =>
        `  - title: "${p.rc.icon} ${p.rc.title}"\n` +
        `    details: ${p.rc.description}\n` +
        `    link: /${p.slug}/\n` +
        `    linkText: View docs`,
    )
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
