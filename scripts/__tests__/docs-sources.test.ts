// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  describeChanges,
  listDocsSources,
  serializeSyncState,
  syncStateOf,
  type DocsSource,
} from '../docs-sources'

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

function apiRepo(name: string, overrides: Record<string, unknown> = {}) {
  return {
    name,
    full_name: `owner/${name}`,
    clone_url: `https://example.com/owner/${name}.git`,
    description: `About ${name}`,
    archived: false,
    disabled: false,
    fork: false,
    ...overrides,
  }
}

/** Answers GitHub API calls from `routes` (URL path → JSON body, or a status). */
function stubGitHub(routes: Record<string, unknown>): void {
  vi.stubGlobal('fetch', async (input: string | URL) => {
    const { pathname } = new URL(String(input))
    const body = routes[pathname]
    if (typeof body === 'number') return new Response('', { status: body })
    if (body === undefined) return new Response('', { status: 500, statusText: `unexpected ${pathname}` })
    return Response.json(body)
  })
}

describe('docs sources', () => {
  it('lists the repositories that publish docs, with the state of their docs/ folder', async () => {
    stubGitHub({
      '/users/owner/repos': [
        apiRepo('tools'),
        apiRepo('no-docs'),
        apiRepo('empty'),
        apiRepo('old', { archived: true }),
        apiRepo('copy', { fork: true }),
        apiRepo('off', { disabled: true }),
        apiRepo('quiet', { description: null }),
        apiRepo('kevindebenedetti.github.io'),
      ],
      '/repos/owner/tools/contents': [
        { name: 'docs', type: 'dir', sha: 'sha-tools' },
        { name: 'README.md', type: 'file', sha: 'x' },
      ],
      '/repos/owner/no-docs/contents': [{ name: 'docs', type: 'file', sha: 'a-file-named-docs' }],
      '/repos/owner/empty/contents': 404,
      '/repos/owner/quiet/contents': [{ name: 'docs', type: 'dir', sha: 'sha-quiet' }],
    })

    expect(await listDocsSources('owner')).toEqual<DocsSource[]>([
      {
        slug: 'tools',
        repo: 'owner/tools',
        cloneUrl: 'https://example.com/owner/tools.git',
        description: 'About tools',
        sha: 'sha-tools',
      },
      {
        slug: 'quiet',
        repo: 'owner/quiet',
        cloneUrl: 'https://example.com/owner/quiet.git',
        description: '',
        sha: 'sha-quiet',
      },
    ])
  })

  it('fails when GitHub does not answer for a repository', async () => {
    stubGitHub({ '/users/owner/repos': [apiRepo('tools')], '/repos/owner/tools/contents': 503 })

    await expect(listDocsSources('owner')).rejects.toThrow(/owner\/tools.*503/)
  })

  describe('when the rate limit is spent', () => {
    /** The repository list answers; the per-repo call hits the limit. */
    function stubRateLimited(status: number, headers: Record<string, string> = {}): void {
      const reset = Date.UTC(2026, 0, 1, 12, 30) / 1000
      vi.stubGlobal('fetch', async (input: string | URL) => {
        if (new URL(String(input)).pathname === '/users/owner/repos') return Response.json([apiRepo('tools')])
        return new Response('', {
          status,
          headers: { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(reset), ...headers },
        })
      })
    }

    it.each([403, 429])('says when it resets and to set GITHUB_TOKEN (%i)', async (status) => {
      vi.stubEnv('GITHUB_TOKEN', '')
      stubRateLimited(status)

      const error = listDocsSources('owner')
      await expect(error).rejects.toThrow(/owner\/tools.*rate limit.*2026-01-01T12:30:00/)
      await expect(error).rejects.toThrow(/set GITHUB_TOKEN/)
    })

    it('does not suggest a token when one is already set', async () => {
      vi.stubEnv('GITHUB_TOKEN', 'test-token')
      stubRateLimited(403)

      const error = listDocsSources('owner')
      await expect(error).rejects.toThrow(/rate limit/)
      await expect(error).rejects.not.toThrow(/set GITHUB_TOKEN/)
    })

    it('recognizes the secondary limit, a 403 with retry-after', async () => {
      vi.stubEnv('GITHUB_TOKEN', '')
      stubRateLimited(403, { 'x-ratelimit-remaining': '42', 'retry-after': '60' })

      await expect(listDocsSources('owner')).rejects.toThrow(/rate limit spent.*set GITHUB_TOKEN/)
    })
  })
})

describe('sync state', () => {
  const source = (slug: string, sha: string, description = ''): DocsSource => ({
    slug,
    repo: `owner/${slug}`,
    cloneUrl: '',
    description,
    sha,
  })

  it('keeps the sha and description of each source, keyed by slug', () => {
    expect(syncStateOf([source('tools', 'abc', 'Tools'), source('notes', 'def')])).toEqual({
      tools: { sha: 'abc', description: 'Tools' },
      notes: { sha: 'def', description: '' },
    })
  })

  it('reports new, removed and updated docs and a changed description', () => {
    const deployed = {
      gone: { sha: '1', description: '' },
      moved: { sha: '1', description: '' },
      renamed: { sha: '1', description: 'Old words' },
      same: { sha: '1', description: 'Same' },
    }
    const current = {
      added: { sha: '9', description: '' },
      moved: { sha: '2', description: '' },
      renamed: { sha: '1', description: 'New words' },
      same: { sha: '1', description: 'Same' },
    }

    expect(describeChanges(deployed, current)).toEqual([
      '+ added (new docs)',
      '- gone (docs removed)',
      '~ moved (docs updated)',
      '~ renamed (description updated)',
    ])
  })

  it('reports nothing for identical states', () => {
    const state = { x: { sha: '1', description: '' }, y: { sha: '2', description: '' } }

    expect(describeChanges(state, structuredClone(state))).toEqual([])
  })

  it('serializes a state sorted by slug, so the published file does not depend on listing order', () => {
    const serialized = serializeSyncState({ zeta: { sha: '2', description: '' }, alpha: { sha: '1', description: '' } })

    expect(Object.keys(JSON.parse(serialized))).toEqual(['alpha', 'zeta'])
    expect(serialized.indexOf('alpha')).toBeLessThan(serialized.indexOf('zeta'))
  })

  it('asks for a rebuild when the live site has no state yet', () => {
    expect(describeChanges(null, { x: { sha: '1', description: '' } })).toEqual([
      'No sync-state.json on the live site (rebuild needed)',
    ])
  })
})
