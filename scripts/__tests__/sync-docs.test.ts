// @vitest-environment node
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import type { DocsSource } from '../docs-sources'
import { resetSyncDirs, syncDocs, type CloneDocs } from '../sync-docs'

const roots: string[] = []

/** Creates a throwaway repo root holding `files` (path → content). */
function repo(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'sync-docs-'))
  roots.push(root)
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    writeFileSync(join(root, path), content)
  }
  return root
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true })
})

describe('sync reset', () => {
  it('empties synced/, drops the recorded state and leaves everything under docs/ alone', () => {
    const root = repo({
      'docs/adr/0001-example.md': '# Decision\n',
      'docs/docs/index.md': '# Hub\n',
      'docs/index.md': '# Home\n',
      'synced/old-project/page.md': '# Old\n',
      'public/sync-state.json': '{}',
      'public/robots.txt': '',
    })

    resetSyncDirs(root)

    expect(existsSync(join(root, 'docs/adr/0001-example.md'))).toBe(true)
    expect(existsSync(join(root, 'docs/docs/index.md'))).toBe(true)
    expect(existsSync(join(root, 'docs/index.md'))).toBe(true)
    expect(existsSync(join(root, 'synced/old-project'))).toBe(false)
    expect(existsSync(join(root, 'synced'))).toBe(true)
    // A stale state must not survive a sync that fails later.
    expect(existsSync(join(root, 'public/sync-state.json'))).toBe(false)
    expect(existsSync(join(root, 'public/robots.txt'))).toBe(true)
  })
})

function source(slug: string, description = `About ${slug}`, branch = 'main'): DocsSource {
  return {
    slug,
    repo: `owner/${slug}`,
    cloneUrl: `https://example.com/owner/${slug}.git`,
    description,
    branch,
    sha: `sha-of-${slug}`,
  }
}

/** Stands in for the git clone: writes one page, or fails as the test says. */
const cloneOnePage: CloneDocs = (docsSource, dest) => {
  if (docsSource.slug.startsWith('broken')) throw new Error('clone failed')
  mkdirSync(dest, { recursive: true })
  writeFileSync(join(dest, 'page.md'), `# ${docsSource.slug}\n`)
}

describe('sync', () => {
  it('copies the docs of each source and records what it synced', () => {
    const root = repo({ 'public/robots.txt': '' })

    syncDocs(root, [source('tools'), source('alpha-kit', '', 'develop')], cloneOnePage)

    expect(readFileSync(join(root, 'synced/tools/page.md'), 'utf-8')).toBe('# tools\n')
    expect(JSON.parse(readFileSync(join(root, 'synced/.repos-metadata.json'), 'utf-8'))).toEqual([
      { slug: 'alpha-kit', title: 'Alpha Kit', description: '', repo: 'owner/alpha-kit', branch: 'develop' },
      { slug: 'tools', title: 'Tools', description: 'About tools', repo: 'owner/tools', branch: 'main' },
    ])
    expect(JSON.parse(readFileSync(join(root, 'public/sync-state.json'), 'utf-8'))).toEqual({
      'alpha-kit': { sha: 'sha-of-alpha-kit', description: '' },
      tools: { sha: 'sha-of-tools', description: 'About tools' },
    })
  })

  it('fails, naming the source, when one cannot be cloned', () => {
    const root = repo({ 'public/robots.txt': '' })

    expect(() => syncDocs(root, [source('tools'), source('broken-one')], cloneOnePage)).toThrow(/broken-one/)
    // Nothing a build could deploy from: the previous site stays online.
    expect(existsSync(join(root, 'synced/.repos-metadata.json'))).toBe(false)
    expect(existsSync(join(root, 'public/sync-state.json'))).toBe(false)
  })
})
