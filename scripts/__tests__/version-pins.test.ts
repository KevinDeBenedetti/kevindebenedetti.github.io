// @vitest-environment node
/**
 * prek.toml repeats two versions that bump pull requests change elsewhere:
 * oxlint (package.json; Renovate moves both in one PR, see renovate.json) and
 * the github-workflows release (.github/workflows/ci-cd.yml, the release bump
 * PR). These tests fail on a PR that moves one copy only, so the git hook and
 * CI run the same versions.
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const ROOT = fileURLToPath(new URL('../..', import.meta.url))
const read = (path: string) => readFileSync(join(ROOT, path), 'utf-8')

const prek = read('prek.toml')

describe('prek.toml version pins', () => {
  it('runs the oxlint version of package.json', () => {
    const range: string = JSON.parse(read('package.json')).devDependencies.oxlint
    const hookPin = prek.match(/"oxlint@([^"]+)"/)?.[1]

    expect(hookPin, 'oxlint@<version> in prek.toml additional_dependencies').toBe(range.replace(/^[\^~]/, ''))
  })

  it('runs the github-workflows release of ci-cd.yml', () => {
    const workflowPins = new Set(
      [...read('.github/workflows/ci-cd.yml').matchAll(/KevinDeBenedetti\/github-workflows\/\S+@(v[\d.]+)/g)].map(
        (m) => m[1],
      ),
    )
    const hookRev = prek.match(/repo = "https:\/\/github\.com\/KevinDeBenedetti\/github-workflows"\s*\n(?:#.*\n)*rev = "([^"]+)"/)?.[1]

    expect([...workflowPins], 'one github-workflows release across ci-cd.yml').toHaveLength(1)
    expect(hookRev, 'rev of the github-workflows hooks in prek.toml').toBe([...workflowPins][0])
  })
})
