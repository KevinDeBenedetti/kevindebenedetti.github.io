import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { buildSiteNavigation, editLinkPattern, pageDescription } from '../scripts/site-navigation'
import { logql } from './shiki/logql'

const SITE_URL = 'https://kevindebenedetti.github.io'
// Site title, shown in the nav bar; every page but the homepage is titled
// "<page> | <SITE_NAME>".
const SITE_TITLE = "Home"
const SITE_NAME = "Kevin's Docs"
// The homepage's <title>, og:title and twitter:title: one descriptive title
// for search results and link previews.
const HOME_TITLE = `${SITE_NAME}: developer documentation hub`
const SITE_DESCRIPTION = 'Centralized developer documentation hub for all @KevinDeBenedetti open source projects.'
const OG_IMAGE = `${SITE_URL}/og-image.png`

// Root of the repository (parent of .vitepress/)
const ROOT = fileURLToPath(new URL('..', import.meta.url))

// Nav, sidebar and edit links come from the projects found on disk: run
// `bun run generate` first so synced/ is populated.
const { projects, nav, sidebar } = buildSiteNavigation(ROOT)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: '.',
  // CLAUDE.md, GLOSSARY.md and docs/adr/ are agent material for this repo,
  // not hub pages (see .agents/domain.md); CHANGELOG.md is release-please's.
  srcExclude: ['README.md', 'TODO.md', 'CHANGELOG.md', 'CLAUDE.md', 'GLOSSARY.md', 'docs/adr/**'],
  rewrites: {
    'docs/index.md': 'index.md',
    'docs/:slug/:rest*': ':slug/:rest*',
    'synced/:slug/:rest*': ':slug/:rest*',
  },
  cleanUrls: true,
  // Off: synced pages have no git history here, and the shallow CI checkout
  // would date every local page from the latest commit.
  lastUpdated: false,
  lang: 'en',
  // A link to a missing page fails the build, synced pages included: a page
  // renamed in a source repo would otherwise leave dead links here. The live
  // site stays on the previous deploy until the link is fixed. Links to a
  // local dev server (http://localhost:…) are examples, not pages.
  ignoreDeadLinks: 'localhostLinks',

  markdown: {
    // 'env' fences use Shiki's 'dotenv' grammar under a different name.
    languageAlias: {
      env: 'dotenv',
    },
    // Grammars Shiki does not ship. A fence language with no grammar falls
    // back to plain text and logs "The language 'x' is not loaded" at build.
    languages: [logql],
  },

  title: SITE_TITLE,
  titleTemplate: `:title | ${SITE_NAME}`,

  description: SITE_DESCRIPTION,

  base: '/',

  // Sitemap — helps search engines discover all pages
  // lastmodDateOnly: false emits full ISO-8601 timestamps (better for crawlers)
  sitemap: {
    hostname: SITE_URL,
    lastmodDateOnly: false,
    transformItems(items) {
      return items.map(item => ({
        ...item,
        // Home page is updated most frequently; project roots monthly; leaf docs yearly
        changefreq: item.url === '' || item.url === '/'
          ? 'weekly'
          : item.url.split('/').filter(Boolean).length === 1
            ? 'monthly'
            : 'yearly',
        priority: item.url === '' || item.url === '/'
          ? 1.0
          : item.url.split('/').filter(Boolean).length === 1
            ? 0.8
            : 0.6,
      }))
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    // Browser UI color — matches --c-bg in custom.css
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f8fa' }],
    ['meta', { name: 'theme-color', media: '(prefers-color-scheme: dark)',  content: '#0f141a' }],
    ['meta', { name: 'author', content: 'Kevin De Benedetti' }],
    // Open Graph (site-level defaults; overridden per-page in transformPageData)
    ['meta', { property: 'og:type',        content: 'website' }],
    ['meta', { property: 'og:site_name',   content: SITE_NAME }],
    ['meta', { property: 'og:image',       content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height',content: '630' }],
    ['meta', { property: 'og:image:alt',   content: `${SITE_NAME} social preview` }],
    // Twitter Card
    ['meta', { name: 'twitter:card',       content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image',      content: OG_IMAGE }],
    ['meta', { name: 'twitter:creator',    content: '@KevinDeBenedetti' }],
    ['meta', { name: 'twitter:site',       content: '@KevinDeBenedetti' }],
  ],

  // Inject per-page head tags: canonical, og:*, twitter:*, og:type, JSON-LD
  transformPageData(pageData) {
    const canonicalUrl = `${SITE_URL}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '')

    const isHome = pageData.frontmatter.layout === 'home'
    if (isHome) {
      // The home layout has no H1, so VitePress would title it SITE_TITLE
      // through titleTemplate ("Home | Kevin's Docs").
      pageData.title = HOME_TITLE
      pageData.titleTemplate = false
    }
    const pageTitle = isHome
      ? HOME_TITLE
      : pageData.title ? `${pageData.title} | ${SITE_NAME}` : SITE_NAME
    const description =
      pageDescription(projects, pageData.relativePath, pageData.title, pageData.description) ?? SITE_DESCRIPTION
    // VitePress writes <meta name="description"> from pageData.description.
    pageData.description = description

    pageData.frontmatter.head ??= []

    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      // og:type — "website" for home, "article" for documentation pages
      ['meta', { property: 'og:type',        content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:url',         content: canonicalUrl }],
      ['meta', { property: 'og:title',       content: pageTitle }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title',      content: pageTitle }],
      ['meta', { name: 'twitter:description',content: description }],
    )

    // JSON-LD structured data
    const jsonLd = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_URL,
          author: {
            '@type': 'Person',
            name: 'Kevin De Benedetti',
            url: SITE_URL,
            sameAs: ['https://github.com/KevinDeBenedetti'],
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          headline: pageData.title || SITE_NAME,
          description,
          url: canonicalUrl,
          author: {
            '@type': 'Person',
            name: 'Kevin De Benedetti',
            url: SITE_URL,
          },
          isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        }

    pageData.frontmatter.head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(jsonLd),
    ])
  },

  themeConfig: {
    nav,

    sidebar,

    editLink: {
      pattern: editLinkPattern(projects),
      text: 'Edit this page on GitHub',
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KevinDeBenedetti' },
    ],
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 5173,
    },
  },
})
