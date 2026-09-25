/**
 * Compares the docs/ tree SHA of every opted-in repo against the state the
 * live site was built from (/sync-state.json, written by sync-docs.ts).
 * Prints the differences and sets `changed=true|false` in $GITHUB_OUTPUT.
 *
 * Only reads public data: GITHUB_TOKEN is optional and just raises rate limits.
 */
import { appendFileSync } from 'node:fs'
import {
  API_URL,
  EXCLUDED_REPOS,
  OWNER,
  fetchPublicRepos,
  githubHeaders,
  serializeSyncState,
  type SyncState,
} from './github'

const SITE_URL = process.env.SITE_URL ?? 'https://kevindebenedetti.github.io'

interface ContentEntry {
  name: string
  type: string
  sha: string
}

async function fetchCurrentState(): Promise<SyncState> {
  const repos = (await fetchPublicRepos(OWNER)).filter((repo) => !EXCLUDED_REPOS.has(repo.name))
  const state: SyncState = {}

  for (const repo of repos) {
    const response = await fetch(`${API_URL}/repos/${repo.full_name}/contents`, {
      headers: githubHeaders(),
    })

    // 404: empty repository — nothing to sync, same as sync-docs.ts.
    if (response.status === 404) continue
    if (!response.ok) {
      throw new Error(`GitHub API request failed for ${repo.full_name}: ${response.status} ${response.statusText}`)
    }

    const entries = (await response.json()) as ContentEntry[]
    const docs = entries.find((entry) => entry.name === 'docs' && entry.type === 'dir')
    if (docs) {
      state[repo.name] = { sha: docs.sha, description: repo.description ?? '' }
    }
  }

  return state
}

async function fetchDeployedState(): Promise<SyncState | null> {
  const response = await fetch(`${SITE_URL}/sync-state.json`, { cache: 'no-store' })
  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`Failed to fetch deployed sync state: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as SyncState
}

function describeChanges(previous: SyncState, current: SyncState): string[] {
  const slugs = new Set([...Object.keys(previous), ...Object.keys(current)])
  const changes: string[] = []

  for (const slug of [...slugs].sort()) {
    const before = previous[slug]
    const after = current[slug]
    if (!before) changes.push(`+ ${slug} (new docs)`)
    else if (!after) changes.push(`- ${slug} (docs removed)`)
    else if (before.sha !== after.sha) changes.push(`~ ${slug} (docs updated)`)
    else if (before.description !== after.description) changes.push(`~ ${slug} (description updated)`)
  }

  return changes
}

async function main(): Promise<void> {
  const [current, deployed] = await Promise.all([fetchCurrentState(), fetchDeployedState()])

  let changed: boolean
  if (!deployed) {
    console.log('No sync-state.json on the live site — rebuild needed.')
    changed = true
  } else {
    changed = serializeSyncState(current) !== serializeSyncState(deployed)
    const changes = describeChanges(deployed, current)
    console.log(changes.length > 0 ? changes.join('\n') : 'Docs are up to date.')
  }

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changed}\n`)
  }
}

await main()
