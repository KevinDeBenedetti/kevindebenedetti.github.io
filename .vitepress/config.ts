import { defineConfig } from 'vitepress'
import { generatedNav, generatedSidebar, generatedEditLinkPattern } from './config.generated'

const SITE_URL = 'https://kevindebenedetti.github.io'
const SITE_TITLE = "Docs"
const SITE_DESCRIPTION = 'Centralized developer documentation hub for all @KevinDeBenedetti open source projects.'
const OG_IMAGE = `${SITE_URL}/og-image.png`

// https://vitepress.dev/reference/site-config
// Static base config — nav/sidebar/editLink are in config.generated.ts (auto-generated)
export default defineConfig({
  srcDir: '.',
  srcExclude: ['README.md', 'TODO.md'],
  rewrites: {
    'docs/index.md': 'index.md',
    'docs/:slug/:rest*': ':slug/:rest*',
    'synced/:slug/:rest*': ':slug/:rest*',
  },
  cleanUrls: true,
  lastUpdated: true,
  lang: 'en',

  title: SITE_TITLE,
  titleTemplate: ':title | Kevin\'s Docs',

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
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: 'Kevin De Benedetti' }],
    // Open Graph (site-level defaults; overridden per-page in transformPageData)
    ['meta', { property: 'og:type',        content: 'website' }],
    ['meta', { property: 'og:site_name',   content: SITE_TITLE }],
    ['meta', { property: 'og:image',       content: OG_IMAGE }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height',content: '630' }],
    ['meta', { property: 'og:image:alt',   content: `${SITE_TITLE} social preview` }],
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
    const pageTitle = pageData.title ? `${pageData.title} | ${SITE_TITLE}` : SITE_TITLE
    const pageDescription = pageData.description || SITE_DESCRIPTION

    pageData.frontmatter.head ??= []

    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      // og:type — "website" for home, "article" for documentation pages
      ['meta', { property: 'og:type',        content: isHome ? 'website' : 'article' }],
      ['meta', { property: 'og:url',         content: canonicalUrl }],
      ['meta', { property: 'og:title',       content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDescription }],
      ['meta', { name: 'twitter:title',      content: pageTitle }],
      ['meta', { name: 'twitter:description',content: pageDescription }],
    )

    // JSON-LD structured data
    const jsonLd = isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_TITLE,
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
          headline: pageData.title || SITE_TITLE,
          description: pageDescription,
          url: canonicalUrl,
          author: {
            '@type': 'Person',
            name: 'Kevin De Benedetti',
            url: SITE_URL,
          },
          isPartOf: { '@type': 'WebSite', name: SITE_TITLE, url: SITE_URL },
        }

    pageData.frontmatter.head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(jsonLd),
    ])
  },

  themeConfig: {
    nav: generatedNav,

    sidebar: generatedSidebar,

    editLink: {
      pattern: generatedEditLinkPattern,
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
