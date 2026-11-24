/**
 * Docs sources: the repositories whose docs/ folder the hub publishes, and
 * the state of that folder. The sync (sync-docs.ts) clones what this lists;
 * the scheduled poll (check-docs-changes.ts) compares what this lists with
 * what the live site was built from. Both get the state from here, so they
 * cannot disagree on it.
 *
 * No dependency outside this folder: the poll runs it without `bun install`.
 */

import { API_URL, apiError, fetchPublicRepos, githubHeaders } from './github'

/** Repositories never synced: their docs are written in this repository. */
const EXCLUDED_REPOS = new Set(['kevindebenedetti.github.io'])

export interface DocsSource {
  /** Repository name, used as synced/<slug>/ and as URL prefix. */
  slug: string
  /** `owner/name`. */
  repo: string
  cloneUrl: string
  description: string
  /** Default branch: what the sync clones, and what the edit links point at. */
  branch: string
  /** Git tree SHA of docs/ on the default branch: changes with any change under docs/, and only then. */
  sha: string
}

/**
 * What a sync pulled in, keyed by slug. Published as /sync-state.json with the
 * site, so the poll can tell whether a rebuild is needed. `branch` is absent
 * from a state deployed before it was recorded.
 */
export type SyncState = Record<string, { sha: string; description: string; branch?: string }>

interface ContentEntry {
  name: string
  type: string
  sha: string
}

/** Public, active, non-fork repositories of `owner` that have a docs/ folder. */
export async function listDocsSources(owner: string): Promise<DocsSource[]> {
  const repos = (await fetchPublicRepos(owner)).filter((repo) => !EXCLUDED_REPOS.has(repo.name))
  const sources: DocsSource[] = []

  for (const repo of repos) {
    const response = await fetch(`${API_URL}/repos/${repo.full_name}/contents`, { headers: githubHeaders() })

    // 404: empty repository, nothing to publish.
    if (response.status === 404) continue
    if (!response.ok) {
      throw apiError(response, repo.full_name)
    }

    const entries = (await response.json()) as ContentEntry[]
    const docs = entries.find((entry) => entry.name === 'docs' && entry.type === 'dir')
    if (!docs) continue

    sources.push({
      slug: repo.name,
      repo: repo.full_name,
      cloneUrl: repo.clone_url,
      description: repo.description ?? '',
      branch: repo.default_branch,
      sha: docs.sha,
    })
  }

  return sources
}

export function syncStateOf(sources: DocsSource[]): SyncState {
  return Object.fromEntries(
    sources.map(({ slug, sha, description, branch }) => [slug, { sha, description, branch }]),
  )
}

/** Stable serialization: sorted by slug, whatever the order sources came in. */
export function serializeSyncState(state: SyncState): string {
  const sorted = Object.fromEntries(Object.entries(state).sort(([a], [b]) => a.localeCompare(b)))
  return JSON.stringify(sorted, null, 2)
}

/**
 * One line per difference between the state the live site was built from
 * (`deployed`, null when the site has none) and the `current` one. Empty when
 * the site is up to date: any line means a rebuild is needed.
 */
export function describeChanges(deployed: SyncState | null, current: SyncState): string[] {
  if (!deployed) return ['No sync-state.json on the live site (rebuild needed)']

  const slugs = new Set([...Object.keys(deployed), ...Object.keys(current)])
  const changes: string[] = []

  for (const slug of [...slugs].sort()) {
    const before = deployed[slug]
    const after = current[slug]
    if (!before) changes.push(`+ ${slug} (new docs)`)
    else if (!after) changes.push(`- ${slug} (docs removed)`)
    else if (before.sha !== after.sha) changes.push(`~ ${slug} (docs updated)`)
    else if (before.description !== after.description) changes.push(`~ ${slug} (description updated)`)
    // The edit links and source cards point at the default branch.
    else if (before.branch !== undefined && before.branch !== after.branch) {
      changes.push(`~ ${slug} (default branch changed)`)
    }
  }

  return changes
}
