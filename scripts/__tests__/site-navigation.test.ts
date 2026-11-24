// @vitest-environment node
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { parse as parseYaml } from 'yaml'
import { buildSiteNavigation, editLinkPattern, pageDescription } from '../site-navigation'

const roots: string[] = []

/** Creates a throwaway repo root holding `files` (path → content). */
function repo(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'site-navigation-'))
  roots.push(root)
  for (const [path, content] of Object.entries(files)) {
    mkdirSync(dirname(join(root, path)), { recursive: true })
    writeFileSync(join(root, path), content)
  }
  return root
}

/** The synced-projects file sync-docs.ts leaves behind, for the given slugs. */
function synced(...slugs: string[]): Record<string, string> {
  const repos = slugs.map((slug) => ({
    slug,
    title: `Title of ${slug}`,
    description: `About ${slug}`,
    repo: `owner/${slug}`,
    branch: 'main',
  }))
  return { 'synced/.repos-metadata.json': JSON.stringify(repos) }
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true })
})

describe('sidebar of a project', () => {
  it('titles a page from frontmatter, else its first H1, else its filename', () => {
    const root = repo({
      ...synced('tools'),
      'synced/tools/a-front.md': '---\ntitle: "From Frontmatter"\n---\n\n# Ignored H1\n',
      'synced/tools/b-heading.md': '# From Heading\n',
      'synced/tools/c-plain_file.md': 'No title here.\n',
    })

    const { sidebar } = buildSiteNavigation(root)

    const tools = sidebar['/tools/'].find((item) => item.text === 'Title of tools')
    expect(tools?.items).toEqual([
      { text: 'Overview', link: '/tools/' },
      { text: 'From Frontmatter', link: '/tools/a-front' },
      { text: 'From Heading', link: '/tools/b-heading' },
      { text: 'C Plain File', link: '/tools/c-plain_file' },
    ])
  })

  it('reads a title only from a real frontmatter value or a real heading', () => {
    const root = repo({
      ...synced('tools'),
      'synced/tools/a-empty.md': '---\ntitle:\ndescription: Not the title\n---\n\n# Real Heading\n',
      'synced/tools/b-fenced.md': 'Intro.\n\n```sh\n# install deps\n```\n\n# After The Fence\n',
      'synced/tools/c-comment.md': '---\n# a yaml comment\ndescription: x\n---\n\nNo heading.\n',
      'synced/tools/d-quoted.md': '---\ntitle: "Quoted: Title" \n---\n',
    })

    const { sidebar } = buildSiteNavigation(root)

    const tools = sidebar['/tools/'].find((item) => item.text === 'Title of tools')
    expect(tools?.items?.map((item) => item.text)).toEqual([
      'Overview',
      'Real Heading',
      'After The Fence',
      'C Comment',
      'Quoted: Title',
    ])
  })

  it('lists the index first as Overview, then files alphabetically, then folders', () => {
    const root = repo({
      ...synced('tools'),
      'synced/tools/zebra.md': '# Zebra\n',
      'synced/tools/index.md': '# Tools\n',
      'synced/tools/alpha.md': '# Alpha\n',
      'synced/tools/big-guides/setup.md': '# Setup\n',
    })

    const { sidebar } = buildSiteNavigation(root)

    const tools = sidebar['/tools/'].find((item) => item.text === 'Title of tools')
    expect(tools?.items).toEqual([
      { text: 'Overview', link: '/tools/' },
      { text: 'Alpha', link: '/tools/alpha' },
      { text: 'Zebra', link: '/tools/zebra' },
      {
        text: 'Big Guides',
        collapsed: true,
        items: [{ text: 'Setup', link: '/tools/big-guides/setup' }],
      },
    ])
  })

  it('merges topic.md and topic/ into one collapsible entry', () => {
    const root = repo({
      ...synced('tools'),
      'synced/tools/topic.md': '# The Topic\n',
      'synced/tools/topic/detail.md': '# Detail\n',
    })

    const { sidebar } = buildSiteNavigation(root)

    const tools = sidebar['/tools/'].find((item) => item.text === 'Title of tools')
    expect(tools?.items).toEqual([
      { text: 'Overview', link: '/tools/' },
      {
        text: 'The Topic',
        link: '/tools/topic',
        collapsed: true,
        items: [{ text: 'Detail', link: '/tools/topic/detail' }],
      },
    ])
  })

  it('leaves out hidden files, non-Markdown files and folders without Markdown', () => {
    const root = repo({
      ...synced('tools'),
      'synced/tools/page.md': '# Page\n',
      'synced/tools/.hidden.md': '# Hidden\n',
      'synced/tools/diagram.png': 'binary',
      'synced/tools/assets/logo.svg': '<svg/>',
    })

    const { sidebar } = buildSiteNavigation(root)

    const tools = sidebar['/tools/'].find((item) => item.text === 'Title of tools')
    expect(tools?.items).toEqual([
      { text: 'Overview', link: '/tools/' },
      { text: 'Page', link: '/tools/page' },
    ])
  })
})

describe('projects', () => {
  it('finds a local project from the repo: field and H1 of its index page', () => {
    const root = repo({
      'docs/hub/index.md':
        '---\ndescription: The hub itself.\nrepo: owner/hub\nicon: "📖"\norder: 0\n---\n\n# Hub Docs\n',
      'docs/no-repo/index.md': '---\ntitle: About\n---\n\n# About\n',
      'docs/no-heading/index.md': '---\nrepo: owner/x\n---\n\nNo heading.\n',
    })

    const { projects } = buildSiteNavigation(root)

    expect(projects).toEqual([
      {
        slug: 'hub',
        title: 'Hub Docs',
        description: 'The hub itself.',
        repo: 'owner/hub',
        branch: 'main',
        icon: '📖',
        order: 0,
        dir: 'docs/hub',
        hasSourceIndex: false,
      },
    ])
  })

  it('reads only real values from a local project index: no borrowed line, no unusable order', () => {
    const root = repo({
      'docs/hub/index.md': '---\ndescription:\nrepo: owner/hub\norder: soon\n---\n\n# Hub Docs\n',
    })

    expect(buildSiteNavigation(root).projects).toEqual([
      { slug: 'hub', title: 'Hub Docs', description: '', repo: 'owner/hub', branch: 'main', dir: 'docs/hub', hasSourceIndex: false },
    ])
  })

  it('sorts by order then slug, and prefers a synced project over a local one of the same slug', () => {
    const root = repo({
      ...synced('beta', 'alpha'),
      'synced/alpha/page.md': '# Page\n',
      'synced/beta/index.md': '# Beta\n',
      'docs/first/index.md': '---\nrepo: owner/first\norder: 0\n---\n\n# First\n',
      'docs/alpha/index.md': '---\nrepo: owner/local-alpha\n---\n\n# Local Alpha\n',
    })

    const { projects } = buildSiteNavigation(root)

    expect(projects.map((p) => [p.slug, p.repo, p.dir, p.hasSourceIndex])).toEqual([
      ['first', 'owner/first', 'docs/first', false],
      ['alpha', 'owner/alpha', 'synced/alpha', false],
      ['beta', 'owner/beta', 'synced/beta', true],
    ])
  })

  it('ignores a synced project whose folder is missing', () => {
    const root = repo({ ...synced('gone', 'here'), 'synced/here/page.md': '# Page\n' })

    expect(buildSiteNavigation(root).projects.map((p) => p.slug)).toEqual(['here'])
  })
})

describe('sidebar across the site', () => {
  it('shows every project on each project path, /projects/ and /about/, expanding only the current one', () => {
    const root = repo({
      ...synced('alpha', 'beta'),
      'synced/alpha/page.md': '# Page\n',
      'synced/beta/index.md': '# Beta\n',
    })

    const { sidebar, nav } = buildSiteNavigation(root)

    const collapsedBy = (path: string) =>
      sidebar[path].map((item) => [item.text, item.link ?? item.collapsed])
    expect(Object.keys(sidebar)).toEqual(['/alpha/', '/beta/', '/projects/', '/about/'])
    expect(collapsedBy('/alpha/')).toEqual([
      ['Projects', '/projects/'],
      ['Title of alpha', false],
      ['Title of beta', true],
    ])
    expect(collapsedBy('/beta/')).toEqual([
      ['Projects', '/projects/'],
      ['Title of alpha', true],
      ['Title of beta', false],
    ])
    expect(collapsedBy('/projects/')).toEqual(collapsedBy('/about/'))
    expect(collapsedBy('/about/')).toEqual([
      ['Projects', '/projects/'],
      ['Title of alpha', true],
      ['Title of beta', true],
    ])
    expect(nav).toEqual([
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
    ])
  })
})

describe('generated pages', () => {
  it('writes an index page listing every page of a project that has none', () => {
    const root = repo({
      ...synced('alpha', 'beta'),
      'synced/alpha/page.md': '# Page\n',
      'synced/alpha/guides/deep.md': '# Deep\n',
      'synced/beta/index.md': '# Beta\n',
    })

    const { pages } = buildSiteNavigation(root)

    expect(pages.map((page) => page.path)).toEqual(['synced/alpha/index.md', 'docs/index.md', 'docs/projects/index.md'])
    const index = pages[0].content
    expect(index).toContain('---\ntitle: "Title of alpha"\ndescription: "About alpha"\nrepo: owner/alpha\ngenerated: true\n---\n\n# Title of alpha\n')
    expect(index).toContain('href="https://github.com/owner/alpha/tree/main/docs"')
    expect(index).toContain('## Documentation\n\n- [Page](./page.md)\n- [Deep](./guides/deep.md)\n')
  })

  it("links the source card to the docs source's default branch", () => {
    const root = repo({
      'synced/.repos-metadata.json': JSON.stringify([
        { slug: 'alpha', title: 'Alpha', description: '', repo: 'owner/alpha', branch: 'develop' },
      ]),
      'synced/alpha/page.md': '# Page\n',
    })

    const index = buildSiteNavigation(root).pages[0].content

    expect(index).toContain('href="https://github.com/owner/alpha/tree/develop/docs"')
    expect(index).toContain('<code>docs/</code> on <code>develop</code>')
  })

  it('escapes a branch name in the source card', () => {
    const root = repo({
      'synced/.repos-metadata.json': JSON.stringify([
        { slug: 'alpha', title: 'Alpha', description: '', repo: 'owner/alpha', branch: 'a&"b"' },
      ]),
      'synced/alpha/page.md': '# Page\n',
    })

    const index = buildSiteNavigation(root).pages[0].content

    expect(index).toContain('href="https://github.com/owner/alpha/tree/a&amp;&quot;b&quot;/docs"')
    expect(index).toContain('<code>a&amp;&quot;b&quot;</code>')
  })

  it('links a nested index page by its file name', () => {
    const root = repo({
      ...synced('alpha'),
      'synced/alpha/guides/index.md': '# Guides\n',
      'synced/alpha/guides/deep.md': '# Deep\n',
    })

    const index = buildSiteNavigation(root).pages[0].content

    expect(index).toContain('## Documentation\n\n- [Overview](./guides/index.md)\n- [Deep](./guides/deep.md)\n')
  })

  it('writes a homepage that stays valid YAML whatever the title and description hold', () => {
    const root = repo({
      'synced/.repos-metadata.json': JSON.stringify([
        { slug: 'alpha', title: 'Say "hi"', description: 'CLI: sync tools # fast', repo: 'owner/alpha', branch: 'main' },
      ]),
      'synced/alpha/page.md': '# Page\n',
    })

    const home = buildSiteNavigation(root).pages.find((page) => page.path === 'docs/index.md')!
    const frontmatter = parseYaml(home.content.split('---')[1])

    expect(frontmatter.features).toEqual([
      { title: 'Say "hi"', details: 'CLI: sync tools # fast', link: '/alpha/', linkText: 'View docs' },
    ])
  })

  it('shows the icon of a local project on its homepage card', () => {
    const root = repo({
      'docs/hub/index.md': '---\nrepo: owner/hub\nicon: "📚"\n---\n\n# Hub Docs\n',
      'docs/plain/index.md': '---\nrepo: owner/plain\n---\n\n# Plain\n',
    })

    const home = buildSiteNavigation(root).pages.find((page) => page.path === 'docs/index.md')!
    const features = parseYaml(home.content.split('---')[1]).features

    expect(features.find((f: { title: string }) => f.title === 'Hub Docs').icon).toBe('📚')
    expect(features.find((f: { title: string }) => f.title === 'Plain')).not.toHaveProperty('icon')
  })

  it('writes a Projects page with one table row per project, in project order', () => {
    const root = repo({
      'synced/.repos-metadata.json': JSON.stringify([
        { slug: 'beta', title: 'Beta', description: 'Pipes | and more', repo: 'owner/beta', branch: 'main' },
      ]),
      'synced/beta/page.md': '# Page\n',
      'docs/hub/index.md': '---\ndescription: The hub.\nrepo: owner/hub\norder: 0\n---\n\n# Hub Docs\n',
    })

    const page = buildSiteNavigation(root).pages.find((p) => p.path === 'docs/projects/index.md')!

    expect(page.content).toContain('# All Projects\n')
    expect(page.content).toContain(
      '| Project | Description | Links |\n' +
        '| ------- | ----------- | ----- |\n' +
        '| **Hub Docs** | <span v-pre>The hub.</span> | <ProjectLinks docsLink="/hub/" githubLink="https://github.com/owner/hub" /> |\n' +
        '| **Beta** | <span v-pre>Pipes \\| and more</span> | <ProjectLinks docsLink="/beta/" githubLink="https://github.com/owner/beta" /> |\n',
    )
  })

  it('keeps Vue syntax and HTML in a description as plain text on generated pages', () => {
    const root = repo({
      'synced/.repos-metadata.json': JSON.stringify([
        { slug: 'alpha', title: 'Alpha', description: 'Render {{ name }} in <slot> & more', repo: 'owner/alpha', branch: 'main' },
      ]),
      'synced/alpha/page.md': '# Page\n',
    })

    const { pages } = buildSiteNavigation(root)
    const safe = '<span v-pre>Render {{ name }} in &lt;slot&gt; &amp; more</span>'

    expect(pages.find((p) => p.path === 'docs/projects/index.md')!.content).toContain(`| **Alpha** | ${safe} |`)
    expect(pages.find((p) => p.path === 'synced/alpha/index.md')!.content).toContain(`# Alpha\n\n${safe}\n`)
  })

  it('keeps HTML in a title or description as plain text on the homepage cards', () => {
    // VitePress renders a feature's title and details with v-html.
    const root = repo({
      'synced/.repos-metadata.json': JSON.stringify([
        { slug: 'alpha', title: 'A <b> & B', description: 'Parse <input> files & more', repo: 'owner/alpha', branch: 'main' },
      ]),
      'synced/alpha/page.md': '# Page\n',
    })

    const home = buildSiteNavigation(root).pages.find((page) => page.path === 'docs/index.md')!
    const [feature] = parseYaml(home.content.split('---')[1]).features

    expect(feature.title).toBe('A &lt;b&gt; &amp; B')
    expect(feature.details).toBe('Parse &lt;input&gt; files &amp; more')
  })

  it('gives the same result once its own pages are on disk', () => {
    const root = repo({
      ...synced('alpha'),
      'synced/alpha/page.md': '# Page\n',
      'docs/hub/index.md': '---\nrepo: owner/hub\n---\n\n# Hub Docs\n',
    })
    const first = buildSiteNavigation(root)

    for (const page of first.pages) {
      mkdirSync(dirname(join(root, page.path)), { recursive: true })
      writeFileSync(join(root, page.path), page.content)
    }

    expect(buildSiteNavigation(root)).toEqual(first)
  })

  it('writes a homepage with one feature card per project, in project order', () => {
    const root = repo({
      ...synced('alpha', 'beta'),
      'synced/alpha/page.md': '# Page\n',
      'synced/beta/index.md': '# Beta\n',
    })

    const home = buildSiteNavigation(root).pages.find((page) => page.path === 'docs/index.md')

    expect(home?.content).toContain('      link: /alpha/\n')
    expect(home?.content).toContain(
      'features:\n' +
        '  - title: "Title of alpha"\n    details: "About alpha"\n    link: /alpha/\n    linkText: View docs\n' +
        '  - title: "Title of beta"\n    details: "About beta"\n    link: /beta/\n    linkText: View docs\n',
    )
  })
})

describe('edit link', () => {
  const projects = [
    { slug: 'alpha', title: 'Alpha', description: '', repo: 'owner/alpha', branch: 'main', dir: 'synced/alpha', hasSourceIndex: false },
    { slug: 'beta', title: 'Beta', description: '', repo: 'owner/beta', branch: 'main', dir: 'synced/beta', hasSourceIndex: true },
    { slug: 'gamma', title: 'Gamma', description: '', repo: 'owner/gamma', branch: 'develop', dir: 'synced/gamma', hasSourceIndex: false },
    { slug: 'hub', title: 'Hub', description: '', repo: 'owner/hub', branch: 'main', dir: 'docs/hub', hasSourceIndex: false },
  ]

  const editLink = (filePath: string) => editLinkPattern(projects)({ filePath })

  it('points a page of a synced project at its file in the source repository', () => {
    expect(editLink('synced/alpha/guides/setup.md')).toBe(
      'https://github.com/owner/alpha/edit/main/docs/guides/setup.md',
    )
  })

  it('points a generated index page at the docs folder, and a source index page at its file', () => {
    expect(editLink('synced/alpha/index.md')).toBe('https://github.com/owner/alpha/tree/main/docs')
    expect(editLink('synced/beta/index.md')).toBe('https://github.com/owner/beta/edit/main/docs/index.md')
  })

  it("points at the docs source's default branch", () => {
    expect(editLink('synced/gamma/guides/setup.md')).toBe(
      'https://github.com/owner/gamma/edit/develop/docs/guides/setup.md',
    )
    expect(editLink('synced/gamma/index.md')).toBe('https://github.com/owner/gamma/tree/develop/docs')
  })

  it('points a page of a local project, and any other page, at its file in this repository', () => {
    expect(editLink('docs/hub/architecture.md')).toBe(
      'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/docs/hub/architecture.md',
    )
    expect(editLink('docs/hub/index.md')).toBe(
      'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/docs/hub/index.md',
    )
    expect(editLink('docs/about/index.md')).toBe(
      'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/docs/about/index.md',
    )
  })

  it('still works once rebuilt from its source text, as VitePress does in the browser', () => {
    const rebuilt = new Function(`return ${editLinkPattern(projects).toString()}`)()

    expect(rebuilt({ filePath: 'synced/alpha/guides/setup.md' })).toBe(
      'https://github.com/owner/alpha/edit/main/docs/guides/setup.md',
    )
  })
})

describe('page description', () => {
  const projects = () =>
    buildSiteNavigation(repo({ ...synced('tools'), 'synced/tools/setup.md': '# Setup\n' })).projects

  it('keeps the description a page sets', () => {
    expect(pageDescription(projects(), 'tools/setup.md', 'Setup', 'Install it.')).toBe('Install it.')
  })

  it('describes a project page that sets none from its title and its project', () => {
    expect(pageDescription(projects(), 'tools/setup.md', 'Setup', '')).toBe(
      'Setup, in the Title of tools documentation: About tools',
    )
  })

  it('returns undefined outside a project, so the site description applies', () => {
    expect(pageDescription(projects(), 'about/index.md', 'About', '')).toBeUndefined()
  })
})
