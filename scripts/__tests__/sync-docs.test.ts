// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { DocsSource } from '../docs-sources'
import { cloneDocsWithGit, resetSyncDirs, syncDocs, withTempDir, type CloneDocs } from '../sync-docs'

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
      'alpha-kit': { sha: 'sha-of-alpha-kit', description: '', branch: 'develop' },
      tools: { sha: 'sha-of-tools', description: 'About tools', branch: 'main' },
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

describe('git clone of a docs source', () => {
  // Real git, isolated from the developer's global and system config
  // (signing, core.hooksPath, url rewrites).
  beforeEach(() => {
    vi.stubEnv('GIT_CONFIG_GLOBAL', '/dev/null')
    vi.stubEnv('GIT_CONFIG_NOSYSTEM', '1')
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  /** A local repository holding `files`, committed, to clone over file://. */
  function sourceRepo(files: Record<string, string>): string {
    const dir = repo(files)
    for (const args of [
      ['init', '--quiet', '--template=', '--initial-branch=main'],
      ['add', '.'],
      ['-c', 'user.name=test', '-c', 'user.email=test@example.com', 'commit', '--quiet', '-m', 'docs'],
    ]) {
      const { status, stderr } = spawnSync('git', ['-C', dir, ...args], { encoding: 'utf-8' })
      if (status !== 0) throw new Error(`git ${args.join(' ')} failed: ${stderr}`)
    }
    return dir
  }

  /** Clones `src` as the docs source "tools" of a new root; returns that root. */
  function cloneInto(src: string): string {
    const root = repo({})
    cloneDocsWithGit(join(root, 'clones'))({ ...source('tools'), cloneUrl: `file://${src}` }, join(root, 'synced/tools'))
    return root
  }

  it('copies the docs/ folder of the default branch, and only it', () => {
    const src = sourceRepo({ 'docs/page.md': '# Page\n', 'docs/guides/setup.md': '# Setup\n', 'README.md': '# Readme\n' })

    const root = cloneInto(src)

    expect(readFileSync(join(root, 'synced/tools/page.md'), 'utf-8')).toBe('# Page\n')
    expect(readFileSync(join(root, 'synced/tools/guides/setup.md'), 'utf-8')).toBe('# Setup\n')
    expect(existsSync(join(root, 'synced/tools/README.md'))).toBe(false)
    expect(existsSync(join(root, 'clones/tools')), 'the temporary clone is removed').toBe(false)
  })

  it('clones under the system temp folder, never in the repository, and removes the clone', () => {
    const src = sourceRepo({ 'docs/page.md': '# Page\n' })
    const root = repo({})
    // A system temp folder of this test's own, so no other process shares it.
    const systemTemp = repo({})
    vi.stubEnv('TMPDIR', systemTemp)
    const clonedIn: string[] = []
    const cloneWithGit = (dir: string): CloneDocs => (docsSource, dest) => {
      clonedIn.push(dir)
      cloneDocsWithGit(dir)(docsSource, dest)
    }

    withTempDir((dir) => syncDocs(root, [{ ...source('tools'), cloneUrl: `file://${src}` }], cloneWithGit(dir)))

    expect(readFileSync(join(root, 'synced/tools/page.md'), 'utf-8')).toBe('# Page\n')
    expect(readdirSync(root).sort(), 'nothing else written in the repository').toEqual(['public', 'synced'])
    expect(clonedIn).toHaveLength(1)
    expect(dirname(clonedIn[0])).toBe(systemTemp)
    expect(readdirSync(systemTemp), 'the temp folder is removed').toEqual([])
  })

  it('removes its temp folder when the sync fails', () => {
    const systemTemp = repo({})
    vi.stubEnv('TMPDIR', systemTemp)

    expect(() =>
      withTempDir(() => {
        throw new Error('clone failed')
      }),
    ).toThrow('clone failed')
    expect(readdirSync(systemTemp)).toEqual([])
  })

  it("installs nothing from git's template directory", () => {
    // A template (a plain folder, not a repository) whose post-checkout hook
    // leaves a marker: the marker shows whether the clone got the template.
    const template = repo({ 'hooks/post-checkout': '#!/bin/sh\ntouch "$HOOK_MARKER"\n' })
    chmodSync(join(template, 'hooks/post-checkout'), 0o755)
    const marker = join(template, 'hook-ran')
    const src = sourceRepo({ 'docs/page.md': '# Page\n' })
    vi.stubEnv('GIT_TEMPLATE_DIR', template)
    vi.stubEnv('HOOK_MARKER', marker)

    const root = cloneInto(src)

    expect(existsSync(join(root, 'synced/tools/page.md'))).toBe(true)
    expect(existsSync(marker), 'a template hook ran in the clone').toBe(false)
  })
})
