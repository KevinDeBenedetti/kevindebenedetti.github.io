import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kevin's Docs",

  description: "Centralized developer documentation hub.",

  base: '/documentation/',

  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['link', { rel: 'icon', href: '/documentation/favicon.ico' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'DevOps', link: '/devops/' },
      { text: 'JavaScript', link: '/javascript/' },
      { text: 'Linux', link: '/linux/' },
      { text: 'Python', link: '/python/' },
    ],

    sidebar: [
      {
        text: 'DevOps',
        collapsed: false,
        items: [
          { text: 'Docker', link: '/devops/docker' },
          { text: 'Firewall', link: '/devops/firewall' },
          { text: 'Git', link: '/devops/git' },
          { text: 'GitHub', link: '/devops/github' },
          { text: 'Hosting', link: '/devops/hosting' },
          { text: 'Kubernetes', link: '/devops/kubernetes' },
        ]
      },
      {
        text: 'JavaScript',
        collapsed: false,
        items: [
          { text: 'Next.js', link: '/javascript/nextjs' },
          { text: 'Nuxt', link: '/javascript/nuxt' },
          { text: 'Vue', link: '/javascript/vue' },
        ]
      },
      {
        text: 'Linux',
        collapsed: false,
        items: [
          { text: 'Caddy', link: '/linux/caddy' },
          { text: 'Debian', link: '/linux/debian' },
          { text: 'Fail2ban', link: '/linux/fail2ban' },
          { text: 'SSH', link: '/linux/ssh' },
          { text: 'Tree', link: '/linux/tree' },
          { text: 'Ubuntu', link: '/linux/ubuntu' },
          { text: 'UFW', link: '/linux/ufw' },
        ]
      },
      {
        text: 'Python',
        collapsed: false,
        items: [
          { text: 'FastAPI', link: '/python/fastapi' },
          { text: 'Ruff', link: '/python/ruff' },
          { text: 'uv', link: '/python/uv' },
        ]
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KevinDeBenedetti' }
    ]
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 5173
    },
  },
})
