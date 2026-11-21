/**
 * Compares the docs/ folder of every published repository with the state the
 * live site was built from (/sync-state.json, written by sync-docs.ts).
 * Prints the differences and sets `changed=true|false` in $GITHUB_OUTPUT.
 *
 * Only reads public data: GITHUB_TOKEN is optional and just raises rate limits.
 */
import { appendFileSync } from 'node:fs'
import { describeChanges, listDocsSources, syncStateOf, type SyncState } from './docs-sources'
import { OWNER } from './github'

const SITE_URL = process.env.SITE_URL ?? 'https://kevindebenedetti.github.io'

async function fetchDeployedState(): Promise<SyncState | null> {
  const response = await fetch(`${SITE_URL}/sync-state.json`, { cache: 'no-store' })
  if (response.status === 404) return null
  if (!response.ok) {
    throw new Error(`Failed to fetch deployed sync state: ${response.status} ${response.statusText}`)
  }
  return (await response.json()) as SyncState
}

async function main(): Promise<void> {
  const [sources, deployed] = await Promise.all([listDocsSources(OWNER), fetchDeployedState()])

  const changes = describeChanges(deployed, syncStateOf(sources))
  console.log(changes.length > 0 ? changes.join('\n') : 'Docs are up to date.')

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `changed=${changes.length > 0}\n`)
  }
}

// Run only as a script: importing this module must not call GitHub.
if (import.meta.main) await main()
