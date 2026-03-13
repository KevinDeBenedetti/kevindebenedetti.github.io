/**
 * Reads docs/<project>/.vitepressrc.json files and generates:
 *   - .vitepress/config.generated.ts  (nav, sidebar, editLink)
 *   - index.md                        (homepage with feature cards)
 *
 * Run: bun scripts/generate-config.ts
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import { join, basename, relative } from 'node:path'
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
      const rc: ProjectRC = JSON.parse(readFileSync(rcPath, 'utf-8'))
      return { slug: d.name, rc }
    })
    .filter((p): p is Project => p !== null)
    .sort((a, b) => a.rc.order - b.rc.order)
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

  const entries = readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  const items: SidebarItem[] = []

  for (const entry of entries) {
    // Skip .vitepressrc.json and hidden files
    if (entry.name.startsWith('.')) continue

    const fullPath = join(dir, entry.name)

    if (entry.isFile() && entry.name.endsWith('.md')) {
      const slug = entry.name === 'index.md' ? '' : basename(entry.name, '.md')
      items.push({
        text: getMdTitle(fullPath),
        link: slug ? `${baseLink}${slug}` : baseLink,
      })
    } else if (entry.isDirectory()) {
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
        `    return 'https://github.com/${p.rc.repo}/edit/main/docs/' + filePath.slice(${p.slug.length + 1})\n` +
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

// ── Write index.md ─────────────────────────────────────────────────────────
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

  writeFileSync(join(ROOT, 'index.md'), md, 'utf-8')
  console.log('✓ index.md written')
}

// ── Main ───────────────────────────────────────────────────────────────────
const projects = getProjects()
console.log(`Found ${projects.length} project(s): ${projects.map((p) => p.slug).join(', ') || '(none)'}`)

writeGeneratedConfig(projects)
writeIndexMd(projects)
