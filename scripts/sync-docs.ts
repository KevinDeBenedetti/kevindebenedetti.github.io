/**
 * Copies the docs/ folder of every docs source into synced/<slug>/ and records
 * what it synced:
 *   - synced/.repos-metadata.json  (read by site-navigation.ts)
 *   - public/sync-state.json       (served with the site, read by check-docs-changes.ts)
 *
 * Run: bun scripts/sync-docs.ts
 */

import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { listDocsSources, serializeSyncState, syncStateOf, type DocsSource } from './docs-sources'
import { OWNER } from './github'
import { titleCase } from './site-navigation'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const TMP_DIR_NAME = '.tmp-doc-sync'

export interface RepoMetadata {
  slug: string
  title: string
  description: string
  repo: string
  /** Default branch of the docs source. */
  branch: string
}

function runGit(args: string[]): void {
  const { status } = spawnSync('git', args, { stdio: 'inherit' })
  if (status !== 0) {
    throw new Error(`git ${args.join(' ')} failed with exit code ${status}`)
  }
}

const CLONE_RETRIES = 3
const CLONE_RETRY_DELAY_MS = 1000

function sleepSync(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

/**
 * Sparse shallow clones occasionally race on directory creation
 * (e.g. "Unable to create '.../.git/shallow.lock': No such file or
 * directory") — a transient filesystem hiccup, not a real failure.
 * Retry a few times with a clean slate before giving up.
 */
function cloneWithRetry(cloneUrl: string, cloneDir: string): void {
  for (let attempt = 1; attempt <= CLONE_RETRIES; attempt += 1) {
    rmSync(cloneDir, { recursive: true, force: true })
    try {
      runGit(['clone', '--depth=1', '--filter=blob:none', '--sparse', cloneUrl, cloneDir])
      return
    } catch (err) {
      if (attempt === CLONE_RETRIES) throw err
      console.log(`  ⚠ clone failed (attempt ${attempt}/${CLONE_RETRIES}), retrying…`)
      sleepSync(CLONE_RETRY_DELAY_MS)
    }
  }
}

/**
 * Empties synced/ and the temporary clone folder under `root`, and drops the
 * state recorded by the previous sync, so a sync that fails leaves nothing a
 * build could deploy from. Synced docs live only there: nothing under docs/
 * is touched.
 */
export function resetSyncDirs(root: string): void {
  for (const dir of [join(root, 'synced'), join(root, TMP_DIR_NAME)]) {
    rmSync(dir, { recursive: true, force: true })
    mkdirSync(dir, { recursive: true })
  }
  rmSync(join(root, 'public', 'sync-state.json'), { force: true })
}

/** Puts the docs/ folder of `source` at `dest`. Throws when it cannot. */
export type CloneDocs = (source: DocsSource, dest: string) => void

function cloneDocsWithGit(tmpDir: string): CloneDocs {
  return (source, dest) => {
    const cloneDir = join(tmpDir, source.slug)
    try {
      cloneWithRetry(source.cloneUrl, cloneDir)
      runGit(['-C', cloneDir, 'sparse-checkout', 'set', 'docs'])
      if (!existsSync(join(cloneDir, 'docs'))) {
        throw new Error(`no docs/ folder in the clone of ${source.repo}`)
      }
      cpSync(join(cloneDir, 'docs'), dest, { recursive: true })
    } finally {
      rmSync(cloneDir, { recursive: true, force: true })
    }
  }
}

/**
 * Syncs the docs of `sources` into `root`/synced/ and records the result
 * (synced/.repos-metadata.json, public/sync-state.json).
 *
 * Throws when a source cannot be cloned, before recording anything: a build
 * that went on would deploy the site without that project.
 */
export function syncDocs(
  root: string,
  sources: DocsSource[],
  cloneDocs: CloneDocs = cloneDocsWithGit(join(root, TMP_DIR_NAME)),
): RepoMetadata[] {
  const failed: string[] = []

  for (const source of sources) {
    console.log(`-> ${source.slug}`)
    try {
      cloneDocs(source, join(root, 'synced', source.slug))
      console.log(`✓ synced ${source.slug}`)
    } catch (err) {
      console.log(`  ✗ ${source.slug} failed: ${(err as Error).message}`)
      failed.push(source.slug)
    }
  }

  if (failed.length > 0) {
    throw new Error(`Could not sync ${failed.join(', ')}: stopping so the site is not deployed without them.`)
  }

  const synced = sources
    .map((source) => ({
      slug: source.slug,
      title: titleCase(source.slug),
      description: source.description,
      repo: source.repo,
      branch: source.branch,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug))

  mkdirSync(join(root, 'synced'), { recursive: true })
  mkdirSync(join(root, 'public'), { recursive: true })
  writeFileSync(join(root, 'synced', '.repos-metadata.json'), JSON.stringify(synced, null, 2), 'utf-8')
  writeFileSync(join(root, 'public', 'sync-state.json'), serializeSyncState(syncStateOf(sources)), 'utf-8')

  return synced
}

async function main(): Promise<void> {
  console.log(`Syncing docs for public repos owned by ${OWNER}`)
  resetSyncDirs(ROOT)

  let synced: RepoMetadata[]
  try {
    synced = syncDocs(ROOT, await listDocsSources(OWNER))
  } finally {
    rmSync(join(ROOT, TMP_DIR_NAME), { recursive: true, force: true })
  }
  console.log(`Synced ${synced.length} repo(s): ${synced.map((r) => r.slug).join(', ') || '(none)'}`)
}

// Run only as a script: importing this module must not start a sync.
if (import.meta.main) await main()
