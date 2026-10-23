// ⚠️ GENERATED — do not edit manually.
// This file is overwritten on every deploy by scripts/generate-config.ts.
// Run `bun run generate` to regenerate locally (requires synced docs/).

import type { DefaultTheme } from 'vitepress'

export const generatedNav: DefaultTheme.NavItem[] = [
  {
    "text": "Home",
    "link": "/"
  },
  {
    "text": "About",
    "link": "/about/"
  }
]

export const generatedSidebar: DefaultTheme.SidebarMulti = {
  "/docs/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": false,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    }
  ],
  "/projects/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    }
  ],
  "/about/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    }
  ]
}

export function generatedEditLinkPattern({ filePath }: { filePath: string }): string {
  if (filePath.startsWith('ocs/docs/')) {
    if (filePath === 'ocs/docs/index.md') return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/docs/' + filePath.slice(9)
  }
  return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/' + filePath
}
