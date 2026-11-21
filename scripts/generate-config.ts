/**
 * Writes the pages the site navigation generates:
 *   - <project>/index.md for each project whose source has none
 *   - docs/index.md (homepage with feature cards)
 *   - docs/projects/index.md (table of every project)
 *
 * Nav, sidebar and edit links are not written anywhere: .vitepress/config.ts
 * builds them from the same module when VitePress loads.
 *
 * Run: bun scripts/generate-config.ts
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSiteNavigation } from './site-navigation'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

const { projects, pages } = buildSiteNavigation(ROOT)
console.log(`Found ${projects.length} project(s): ${projects.map((p) => p.slug).join(', ') || '(none)'}`)

for (const page of pages) {
  mkdirSync(dirname(join(ROOT, page.path)), { recursive: true })
  writeFileSync(join(ROOT, page.path), page.content, 'utf-8')
  console.log(`✓ ${page.path} written`)
}
