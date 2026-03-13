import { defineConfig } from 'vitepress'
import { generatedNav, generatedSidebar, generatedEditLinkPattern } from './config.generated'

// https://vitepress.dev/reference/site-config
// Static base config — nav/sidebar/editLink are in config.generated.ts (auto-generated)
export default defineConfig({
  srcDir: 'docs',
  cleanUrls: true,
  lastUpdated: true,

  title: "Kevin's Docs",

  description: 'Centralized developer documentation hub for all @KevinDeBenedetti open source projects.',

  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

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
