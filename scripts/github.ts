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

/**
 * The error for a failed API call about `subject`. When the rate limit is spent
 * (60 requests an hour without a token, a few local runs), it says when it
 * resets and, without a token, how to get a higher one.
 */
export function apiError(response: Response, subject: string): Error {
  const failure = `GitHub API request failed for ${subject}: ${response.status} ${response.statusText}`.trimEnd()
  // 403 with no requests left is the primary limit; with retry-after, the secondary one.
  const limited =
    response.status === 429 ||
    (response.status === 403 &&
      (response.headers.get('x-ratelimit-remaining') === '0' || response.headers.has('retry-after')))
  if (!limited) return new Error(failure)

  const reset = Number(response.headers.get('x-ratelimit-reset'))
  const when = Number.isFinite(reset) && reset > 0 ? ` until ${new Date(reset * 1000).toISOString()}` : ''
  const hint = process.env.GITHUB_TOKEN
    ? ''
    : ' Unauthenticated requests are limited to 60 an hour: set GITHUB_TOKEN, e.g. `export GITHUB_TOKEN=$(gh auth token)`.'
  return new Error(`${failure} (rate limit spent${when}).${hint}`)
}

/** Public, active, non-fork repos of `owner`. */
export async function fetchPublicRepos(owner: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = []

  for (let page = 1; ; page += 1) {
    const response = await fetch(
      `${API_URL}/users/${owner}/repos?type=public&sort=updated&per_page=100&page=${page}`,
      { headers: githubHeaders() },
    )

    if (!response.ok) {
      throw apiError(response, `the repositories of ${owner}`)
    }

    const data = (await response.json()) as GitHubRepo[]
    repos.push(...data)

    if (data.length < 100) break
  }

  return repos.filter((repo) => !repo.archived && !repo.disabled && !repo.fork)
}
