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
    "text": "Dotfiles",
    "link": "/dotfiles/"
  },
  {
    "text": "GitHub Workflows",
    "link": "/github-workflows/"
  },
  {
    "text": "Tools",
    "link": "/tools/"
  }
]

export const generatedSidebar: DefaultTheme.SidebarMulti = {
  "/dotfiles/": [
    {
      "text": "Debian Setup",
      "link": "/dotfiles/debian"
    },
    {
      "text": "macOS Setup",
      "link": "/dotfiles/macos"
    }
  ],
  "/github-workflows/": [
    {
      "text": "CI — Node.js",
      "link": "/github-workflows/workflow-ci-node"
    },
    {
      "text": "CI — Python",
      "link": "/github-workflows/workflow-ci-python"
    },
    {
      "text": "CI — Shell",
      "link": "/github-workflows/workflow-ci-shell"
    },
    {
      "text": "Deploy — Docker",
      "link": "/github-workflows/workflow-deploy-docker"
    },
    {
      "text": "Deploy — GitHub Pages",
      "link": "/github-workflows/workflow-deploy-pages"
    },
    {
      "text": "Deploy — Vercel",
      "link": "/github-workflows/workflow-deploy-vercel"
    },
    {
      "text": "Release",
      "link": "/github-workflows/workflow-release"
    },
    {
      "text": "Security",
      "link": "/github-workflows/workflow-security"
    }
  ],
  "/tools/": [
    {
      "text": "CLI App",
      "link": "/tools/cli"
    },
    {
      "text": "Docker Templates",
      "link": "/tools/docker-templates"
    },
    {
      "text": "Getting Started",
      "link": "/tools/getting-started"
    },
    {
      "text": "Tools Documentation",
      "link": "/tools/"
    },
    {
      "text": "Makefile Fragments",
      "link": "/tools/makefile-fragments"
    },
    {
      "text": "Shell Tools",
      "link": "/tools/shell-tools"
    },
    {
      "text": "Testing and Quality",
      "link": "/tools/testing-and-quality"
    }
  ]
}

export function generatedEditLinkPattern({ filePath }: { filePath: string }): string {
  if (filePath.startsWith('dotfiles/')) {
    return 'https://github.com/KevinDeBenedetti/dotfiles/edit/main/docs/' + filePath.slice(9)
  }
  if (filePath.startsWith('github-workflows/')) {
    return 'https://github.com/KevinDeBenedetti/github-workflows/edit/main/docs/' + filePath.slice(17)
  }
  if (filePath.startsWith('tools/')) {
    return 'https://github.com/KevinDeBenedetti/tools/edit/main/docs/' + filePath.slice(6)
  }
  return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/' + filePath
}
