import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  EXCLUDED_REPOS,
  OWNER,
  fetchPublicRepos,
  serializeSyncState,
  type GitHubRepo,
  type SyncState,
} from './github'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DOCS_DIR = join(ROOT, 'docs')
const SYNCED_DIR = join(ROOT, 'synced')
const TMP_DIR = join(ROOT, '.tmp-doc-sync')
// Served at /sync-state.json — read back by scripts/check-docs-changes.ts.
const SYNC_STATE_PATH = join(ROOT, 'public', 'sync-state.json')

export interface RepoMetadata {
  slug: string
  title: string
  description: string
  repo: string
}

function formatTitle(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function runGit(args: string[]): void {
  const proc = Bun.spawnSync(['git', ...args], {
    cwd: ROOT,
    stdout: 'inherit',
    stderr: 'inherit',
  })

  if (proc.exitCode !== 0) {
    throw new Error(`git ${args.join(' ')} failed with exit code ${proc.exitCode}`)
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

/** Folders inside docs/ that must never be deleted during a sync reset. */
const PRESERVED_DIRS = new Set(['docs', 'about', 'projects'])

function resetDocsDir(): void {
  // Remove only synced symlinks and generated files from docs/ — leave committed dirs intact.
  if (existsSync(DOCS_DIR)) {
    for (const entry of readdirSync(DOCS_DIR)) {
      if (PRESERVED_DIRS.has(entry)) continue
      rmSync(join(DOCS_DIR, entry), { recursive: true, force: true })
    }
  }
  // Clear and recreate synced/ and tmp/
  rmSync(SYNCED_DIR, { recursive: true, force: true })
  rmSync(TMP_DIR, { recursive: true, force: true })
  mkdirSync(DOCS_DIR, { recursive: true })
  mkdirSync(SYNCED_DIR, { recursive: true })
  mkdirSync(TMP_DIR, { recursive: true })
}

/** Returns the docs/ tree SHA, or null when the repo has no docs/ folder. */
function syncRepoDocs(repo: GitHubRepo): string | null {
  const cloneDir = join(TMP_DIR, repo.name)
  const sourceDocsDir = join(cloneDir, 'docs')

  cloneWithRetry(repo.clone_url, cloneDir)
  runGit(['-C', cloneDir, 'sparse-checkout', 'set', 'docs'])

  if (!existsSync(sourceDocsDir)) {
    rmSync(cloneDir, { recursive: true, force: true })
    return null
  }

  const treeSha = Bun.spawnSync(['git', '-C', cloneDir, 'rev-parse', 'HEAD:docs'])
  if (treeSha.exitCode !== 0) {
    throw new Error(`git rev-parse HEAD:docs failed for ${repo.name}`)
  }

  // Copy content into synced/<repo>/ (separate from committed docs/)
  cpSync(sourceDocsDir, join(SYNCED_DIR, repo.name), { recursive: true })
  rmSync(cloneDir, { recursive: true, force: true })

  return treeSha.stdout.toString().trim()
}

async function main(): Promise<void> {
  console.log(`Syncing docs for public repos owned by ${OWNER}`)
  resetDocsDir()

  const repos = await fetchPublicRepos(OWNER)
  const synced: RepoMetadata[] = []
  const state: SyncState = {}

  for (const repo of repos) {
    if (EXCLUDED_REPOS.has(repo.name)) {
      console.log(`· skipped ${repo.name} (locally managed)`)
      continue
    }
    console.log(`-> ${repo.name}`)
    let docsSha: string | null
    try {
      docsSha = syncRepoDocs(repo)
    } catch (err) {
      console.log(`  ⚠ ${repo.name} failed after ${CLONE_RETRIES} attempts, skipping: ${(err as Error).message}`)
      continue
    }
    if (docsSha) {
      state[repo.name] = { sha: docsSha, description: repo.description ?? '' }
      synced.push({
        slug: repo.name,
        title: formatTitle(repo.name),
        description: repo.description ?? '',
        repo: repo.full_name,
      })
      console.log(`✓ synced ${repo.name}`)
    } else {
      console.log(`· skipped ${repo.name} (no docs/ folder)`)
    }
  }

  // Sort alphabetically by slug
  synced.sort((a, b) => a.slug.localeCompare(b.slug))

  writeFileSync(
    join(SYNCED_DIR, '.repos-metadata.json'),
    JSON.stringify(synced, null, 2),
    'utf-8',
  )

  writeFileSync(SYNC_STATE_PATH, serializeSyncState(state), 'utf-8')

  rmSync(TMP_DIR, { recursive: true, force: true })
  console.log(`Synced ${synced.length} repo(s): ${synced.map((r) => r.slug).join(', ') || '(none)'}`)
}

await main()
