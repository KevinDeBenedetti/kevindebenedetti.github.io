export const OWNER = process.env.GITHUB_OWNER ?? 'KevinDeBenedetti'
export const API_URL = process.env.GITHUB_API_URL ?? 'https://api.github.com'

export interface GitHubRepo {
  name: string
  full_name: string
  clone_url: string
  description: string | null
  archived: boolean
  disabled: boolean
  fork: boolean
}

/** Repos skipped during sync — their docs are managed locally in docs/. */
export const EXCLUDED_REPOS = new Set(['kevindebenedetti.github.io'])

/**
 * Snapshot of what a sync pulled in, keyed by repo slug. `sha` is the git tree
 * SHA of the repo's docs/ directory on its default branch, so any change under
 * docs/ (and only there) changes it. Published as /sync-state.json with the site
 * so the scheduled poll can tell whether a rebuild is needed.
 */
export type SyncState = Record<string, { sha: string; description: string }>

export function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'kevindebenedetti-docs-sync',
  }

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  return headers
}

/** Public, active, non-fork repos of `owner` (EXCLUDED_REPOS is left to callers). */
export async function fetchPublicRepos(owner: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `${API_URL}/users/${owner}/repos?type=public&sort=updated&per_page=100&page=${page}`,
      { headers: githubHeaders() },
    )

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`)
    }

    const data = (await response.json()) as GitHubRepo[]
    repos.push(...data)

    if (data.length < 100) break
  }

  return repos.filter((repo) => !repo.archived && !repo.disabled && !repo.fork)
}

/** Stable serialization so two states compare equal regardless of key order. */
export function serializeSyncState(state: SyncState): string {
  const sorted = Object.fromEntries(Object.entries(state).sort(([a], [b]) => a.localeCompare(b)))
  return JSON.stringify(sorted, null, 2)
}
