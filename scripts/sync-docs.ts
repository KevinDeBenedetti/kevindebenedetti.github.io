import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DOCS_DIR = join(ROOT, 'docs')
const SYNCED_DIR = join(ROOT, 'synced')
const TMP_DIR = join(ROOT, '.tmp-doc-sync')
const OWNER = process.env.GITHUB_OWNER ?? 'KevinDeBenedetti'
const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com'

interface GitHubRepo {
  name: string
  full_name: string
  clone_url: string
  description: string | null
  archived: boolean
  disabled: boolean
}

export interface RepoMetadata {
  slug: string
  title: string
  description: string
  repo: string
}

/** Repos skipped during sync — their docs are managed locally in docs/. */
const EXCLUDED_REPOS = new Set(['kevindebenedetti.github.io'])

function formatTitle(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

async function fetchPublicRepos(owner: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'kevindebenedetti-docs-sync',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `${API_URL}/users/${owner}/repos?type=public&sort=updated&per_page=100&page=${page}`,
      { headers },
    )

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as GitHubRepo[]
    repos.push(...data)

    if (data.length < 100) break
  }

  return repos.filter((repo) => !repo.archived && !repo.disabled)
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

function syncRepoDocs(repo: GitHubRepo): boolean {
  const cloneDir = join(TMP_DIR, repo.name)
  const sourceDocsDir = join(cloneDir, 'docs')

  runGit(['clone', '--depth=1', '--filter=blob:none', '--sparse', repo.clone_url, cloneDir])
  runGit(['-C', cloneDir, 'sparse-checkout', 'set', 'docs'])

  if (!existsSync(sourceDocsDir)) {
    rmSync(cloneDir, { recursive: true, force: true })
    return false
  }

  // Copy content into synced/<repo>/ (separate from committed docs/)
  cpSync(sourceDocsDir, join(SYNCED_DIR, repo.name), { recursive: true })
  rmSync(cloneDir, { recursive: true, force: true })

  return true
}

async function main(): Promise<void> {
  console.log(`Syncing docs for public repos owned by ${OWNER}`)
  resetDocsDir()

  const repos = await fetchPublicRepos(OWNER)
  const synced: RepoMetadata[] = []

  for (const repo of repos) {
    if (EXCLUDED_REPOS.has(repo.name)) {
      console.log(`· skipped ${repo.name} (locally managed)`)
      continue
    }
    console.log(`-> ${repo.name}`)
    const hasDocs = syncRepoDocs(repo)
    if (hasDocs) {
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

  rmSync(TMP_DIR, { recursive: true, force: true })
  console.log(`Synced ${synced.length} repo(s): ${synced.map((r) => r.slug).join(', ') || '(none)'}`)
}

await main()
